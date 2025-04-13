import { PrismaClient } from "@prisma/client";

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Accounting" },
        { name: "Engineering" },
        { name: "Filming" },
        { name: "Fitness" },
        { name: "Music" },
        { name: "Photography" },
      ],
    });
    console.log("Success");
  } catch (error) {
    console.log("Error seeding the db categories", error);
  } finally {
    database.$disconnect();
  }
}

main();
