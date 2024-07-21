import React from "react";
import { auth } from "@clerk/nextjs/server";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import CourseSidebarItem from "./CourseSidebarItem";
import { db } from "@/lib/db";
import CourseProgress from "./CourseProgress";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

async function CourseSidebar({ course, progressCount }: CourseSidebarProps) {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });

  return (
    <>
      <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
        <div className="p-8 flex flex-col border-b">
          <h1 className="text-center font-bold text-xl">{course.title}</h1>
          {purchase && (
            <div className="mt-10">
              <CourseProgress variant="success" value={progressCount} />
            </div>
          )}
        </div>
        {/* check purchase & progress */}

        <div className="flex flex-col w-full">
          {course.chapters!.map((chapter) => (
            <CourseSidebarItem
              key={chapter.id}
              id={chapter.id}
              courseId={course.id}
              label={chapter.title}
              isLocked={!chapter.isFree && !purchase}
              isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default CourseSidebar;
