import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    console.log(req);
    const { title } = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    // let title = "fadf";
    const course = await db.course.create({
      data: { userId, title },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("ERROR: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
