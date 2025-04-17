import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.log("Webhook signature verification failed", error);
    return new NextResponse("Webhook Error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const courseId = session.metadata?.courseId;
    const userId = session.metadata?.userId;

    if (!userId || !courseId) {
      return new NextResponse(`Webhook Error: missing metadata`, {
        status: 400,
      });
    }

    await db.purchase.create({
      data: {
        courseId,
        userId,
      },
    });
  } else {
    //we dont throw 500 error for uncontrolled
    //not to break
    return new NextResponse("Webhook unhanlded event type", { status: 200 });
  }
  return new NextResponse(null, { status: 200 });
}
