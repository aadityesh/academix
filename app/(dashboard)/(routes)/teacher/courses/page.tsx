import { DataTable } from "@/components/data-table";
import { columns } from "@/components/columns";

import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const CoursePage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <DataTable columns={columns} data={courses} />
    </>
  );
};

export default CoursePage;
