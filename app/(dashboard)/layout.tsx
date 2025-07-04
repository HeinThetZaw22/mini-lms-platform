import React, { Suspense } from "react";
import Sidebar from "./_components/sidebar";
import Navbar from "./_components/navbar";
import Loader from "@/components/loader";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<Loader />}>
      <div className=" h-full">
        <div className=" h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
          <Navbar />
        </div>
        <div className=" hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
          <Sidebar />
        </div>
        <main className=" md:pl-56 pt-[80px] h-full">{children}</main>
      </div>
    </Suspense>
  );
};

export default DashboardLayout;
