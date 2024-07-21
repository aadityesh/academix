"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import ConfirmModal from "./modals/ConfirmModal";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ChapterActionsProps {
  disabled: boolean;
  isPublished: boolean;
  courseId: string;
  chapterId: string;
}

function fn() {
  console.log("object");
}

const ChapterActions = ({
  disabled,
  isPublished,
  courseId,
  chapterId,
}: ChapterActionsProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
      toast.success("Chapter deleted");
      router.refresh();
      router.push(`/teacher/courses/${courseId}`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onClick = async () => {
    try {
      setLoading(true);
      if (isPublished) {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/unpublish`
        );
      } else {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/publish`
        );
      }
      toast.success("Chapter published successfully");
      router.refresh();
      router.push(`/teacher/courses/${courseId}`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-x-2">
        <Button
          className={cn(
            "text-white",
            isPublished ? " hover:bg-yellow-500" : " hover:bg-green-500"
          )}
          disabled={disabled || loading}
          onClick={onClick}
          size="sm"
        >
          {isPublished ? "Unpublish" : "Publish"}
        </Button>
        <ConfirmModal onConfirm={onDelete}>
          <Button className="bg-red-500 hover:bg-red-400" size="sm">
            <Trash className="text-white-500 font-bold h-4 w-4" />
          </Button>
        </ConfirmModal>
      </div>
      ;
    </>
  );
};

export default ChapterActions;
