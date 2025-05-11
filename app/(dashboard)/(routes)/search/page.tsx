import { db } from "@/lib/db";
import React, { Suspense } from "react";
import Categories from "./_components/categories";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CoursesList } from "@/components/courses-list";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "desc",
    },
  });

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  return (
    <>
      <div className=" px-6 pt-6 md:hidden block">
        {/* Wrap the entire content, including SearchInput, in Suspense */}
        <Suspense fallback={<div>Loading...</div>}>
          <SearchInput />
        </Suspense>
      </div>
      <div className=" p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

// Wrap the entire SearchPage in Suspense as well
const SuspendedSearchPage = (props: SearchPageProps) => (
  <Suspense fallback={<div>Loading...</div>}>
    <SearchPage {...props} />
  </Suspense>
);

export default SuspendedSearchPage;
