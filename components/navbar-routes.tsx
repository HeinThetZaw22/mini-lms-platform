"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { isTeacher } from "@/lib/teacher";

const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  const { userId } = useAuth();

  return (
    <>
      {isSearchPage && (
        <div className=" hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className=" flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href={"/"}>
            <Button>
              <LogOut className=" h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href={"/teacher/courses"}>
            <Button size={"sm"} variant={"outline"}>
              Create Own Course
            </Button>
          </Link>
        ) : null}
        <UserButton afterSwitchSessionUrl="/" />
      </div>
    </>
  );
};

export default NavbarRoutes;
