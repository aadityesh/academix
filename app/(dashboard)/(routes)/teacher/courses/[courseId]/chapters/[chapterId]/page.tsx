import Banner from "@/components/Banner";
import ChapterAccessForm from "@/components/ChapterAccess";
import ChapterActions from "@/components/ChapterActions";
import ChapterDescriptionForm from "@/components/ChapterDescription";
import ChapterLectureForm from "@/components/ChapterLectureForm";
import ChapterTitle from "@/components/ChapterTitle";
import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, Eye, LayoutDashboard, Settings, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const EditChapter = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) {
    return redirect("/");
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `${completedFields}/${totalFields}`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This course is not published. It is not be visible to the users. "
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              className="mb-6 flex items-center text-sm transition hover:opacity-75"
              href={`/teacher/courses/${params.courseId}`}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Course Setup
            </Link>

            <div className="flex items-center w-full justify-between">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Create Chapter</h1>
                <span>Fields Completed: {completionText}</span>
              </div>
              <ChapterActions
                disabled={!isComplete}
                isPublished={chapter.isPublished}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge variant="default" icon={LayoutDashboard} />
                <h2 className="text-[20px]">
                  Customize your chapter: "{chapter.title}"
                </h2>
              </div>
              <ChapterTitle
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
              <ChapterDescriptionForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Settings} variant="default" />
                <h2 className="text-[20px]">Access Settings</h2>
              </div>
              <ChapterAccessForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Video} variant="default" />
                <h2 className="text-[20px]">Lectures</h2>
              </div>
              <ChapterLectureForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

//localhost:3000/teacher/courses/5f2876b0-6117-4f91-93e8-669ab4814436
// /chapters/caed360f - 24f3 - 44e9 - 9c48 - a3ba9bc1473e

export default EditChapter;
