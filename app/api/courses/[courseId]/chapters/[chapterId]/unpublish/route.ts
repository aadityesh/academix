import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { isUploadable } from "@mux/mux-node/uploads.mjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Not Authorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Not Authorized", { status: 401 });
    }

    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });

    if (!chapter) {
      return new NextResponse("Chapter does not exist", { status: 404 });
    }

    const unpublishedChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: false,
      },
    });

    const courseStatusAfterUnpublish = await db.chapter.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      },
    });

    if (!courseStatusAfterUnpublish.length) {
      await db.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }
    return new NextResponse("Chapter Unpublished " + unpublishedChapter, {
      status: 200,
    });
  } catch (error) {
    console.log("CHAP_UN_PUBLISH", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
