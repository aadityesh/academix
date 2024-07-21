import { Category, Course } from "@prisma/client";
import React from "react";
import CourseCard from "./CourseCard";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface CourseListProps {
  items: CourseWithProgressWithCategory[];
}

function CoursesList({ items = [] }: CourseListProps) {
  return (
    <>
      <div>
        <div
          className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3
        xl:grid-cols-4 2xl:grid-cols-4 gap-4"
        >
          {items.map((item) => (
            <CourseCard
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl!}
              chaptersLength={item.chapters.length}
              price={item.price!}
              progress={item.progress}
              category={item?.category?.name!}
              title={item.title}
            />
          ))}
        </div>
        {items.length === 0 && (
          <div className="mt-5 text-center text-sm text-muted-foreground">
            Status 404: No courses found
          </div>
        )}
      </div>
      ;
    </>
  );
}

export default CoursesList;
