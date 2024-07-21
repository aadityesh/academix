import { Chapter, Course, UserProgress } from "@prisma/client";
import React from "react";
import NavBarRoutes from "./NavBarRoutes";
import CourseMobileSidebar from "./CourseMobileSidebar";

interface CourseNavBarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

function CourseNavBar({ course, progressCount }: CourseNavBarProps) {
  return (
    <>
      <div className="p-4 border-b h-full flex items-center bg-white">
        <CourseMobileSidebar course={course} progressCount={progressCount} />
        <NavBarRoutes />
      </div>
    </>
  );
}

export default CourseNavBar;
