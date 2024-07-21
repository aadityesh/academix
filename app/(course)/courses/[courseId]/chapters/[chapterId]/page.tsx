import { getChapter } from "@/actions/getChapter";
import Banner from "@/components/Banner";
import ChapterProgressButton from "@/components/ChapterProgressButton";
import CourseEnrollButton from "@/components/CourseEnrollButton";
import { Preview } from "@/components/Preview";
import { Separator } from "@/components/ui/separator";
import VideoPlayer from "@/components/VideoPlayer";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { FileIcon } from "lucide-react";
import { redirect } from "next/navigation";

async function ChapterIdPage({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <>
      <div>
        {userProgress?.isCompleted && (
          <Banner variant="success" label="Course is already completed" />
        )}
        {isLocked && (
          <Banner
            variant="warning"
            label="You need to purchase the course in order to watch this chapter"
          />
        )}
      </div>
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            courseId={params.courseId}
            title={chapter.title}
            nextChapterId={nextChapter?.id!!}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked!}
            completeOnEnd={completeOnEnd!}
          />
        </div>
        <div className="p-4 pb-6 flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-2xl font-semibold mb-2">{chapter.title}</h1>
          {purchase ? (
            <ChapterProgressButton
              courseId={params.courseId}
              chapterId={params.chapterId}
              nextChapterId={nextChapter?.id}
              isCompleted={!!userProgress?.isCompleted}
            />
          ) : (
            <CourseEnrollButton
              courseId={params.courseId}
              price={course.price!}
            />
          )}
        </div>
        <Separator />
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-2">Description</h2>
          <Separator className="mb-2" />
          <Preview value={chapter.description!} />
        </div>

        {!!attachments?.length && (
          <div className="p-4">
            <h3 className="text-xl font-semibold">Attachments</h3>
            <Separator className="mb-2" />
            <div>
              {attachments?.map((file) => (
                <a
                  className="flex items-center bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  key={file.id}
                  target="_blank"
                  href={file.url}
                >
                  <FileIcon />
                  <p className="line-clamp-1">{file.name}</p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ChapterIdPage;
