import React from "react";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getProgress } from "@/actions/getProgress";
import CourseSidebar from "@/components/CourseSidebar";
import CourseNavBar from "@/components/CourseNavBar";

export default async function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    redirect("/");
  }

  const progressCount = await getProgress(userId, course.id);

  return (
    <>
      <div className="h-full">
        <div className="h-[80px] md:pl-[80px] fixed inset-y-0 w-full z-50 ">
          <CourseNavBar course={course} progressCount={progressCount} />
        </div>
        <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
          <CourseSidebar course={course} progressCount={progressCount} />
        </div>
        <main className="md:pl-[320px] pt-[80px] h-full">{children}</main>
      </div>
    </>
  );
}
