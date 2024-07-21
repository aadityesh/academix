import { CheckCircle, Clock } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getDashboardCourses } from "@/actions/get-dashboard-course";
import CoursesList from "@/components/CoursesList";
import InfoCard from "@/components/InfoCard";

export default async function Dashboard() {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );

  const items = [...coursesInProgress, ...completedCourses];
  console.log(items);
  return (
    <>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoCard
            icon={Clock}
            label="In Progress"
            numberOfItems={coursesInProgress.length}
          />
          <InfoCard
            icon={CheckCircle}
            label="Completed"
            numberOfItems={completedCourses.length}
          />
        </div>
        <CoursesList items={items} />
      </div>
    </>
  );
}
