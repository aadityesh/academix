"use client";
import React from "react";
import { Button } from "./ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

interface ProgressProps {
  chapterId: string;
  courseId: string;
  nextChapterId?: string;
  isCompleted?: boolean;
}
const ChapterProgressButton = ({
  courseId,
  chapterId,
  nextChapterId,
  isCompleted,
}: ProgressProps) => {
  const [loading, setLoading] = useState(false);

  const Icon = isCompleted ? XCircle : CheckCircle;
  const router = useRouter();

  const onClick = async () => {
    try {
      setLoading(true);
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          isCompleted: !isCompleted,
        }
      );
      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }
      toast.success("Chapter marked as completed");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={onClick}
        disabled={loading}
        variant={isCompleted ? "outline" : "success"}
        type="button"
      >
        {isCompleted ? "Not Completed" : "Mark as completed"}
        <Icon className="h-4 w-4 ml-2" />
      </Button>
    </>
  );
};

export default ChapterProgressButton;
