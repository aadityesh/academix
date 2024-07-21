"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  Database,
  File,
  ImageIcon,
  Loader2,
  Pencil,
  PlusCircle,
  Trash,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "./FileUpload";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  console.log(initialData);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: initialData?.attachments[0].url || "",
    },
  });

  const { isValid, isSubmitting } = form.formState;
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setdeletingId] = useState<string | null>(null);

  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(
        `http://localhost:3000/api/courses/${courseId}/attachments`,
        values
      );
      toast.success("Course is updated successfully");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setdeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment deleted");
      router.refresh();
    } catch (error) {
      console.log("error:", error);
    }
  };

  const toggleEdit = () => setIsEditing((curr) => !curr);

  return (
    <div
      className="mt-6 border bg-slate-100 rounded-md 
  p-4"
    >
      <div className="flex font-medium items-center justify-center">
        Course attachments
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an file
            </>
          )}
        </Button>
      </div>
      {!isEditing && initialData.attachments.length === 0 && (
        <p className="text-sm mt-2 text-slate-500 italic">No attachments yet</p>
      )}
      {!isEditing && initialData.attachments.length > 0 && (
        <div className="text-sm mt-2 text-slate-500 italic">
          {initialData.attachments.map((data) => (
            <div
              className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
              key={data.id}
            >
              <File className="h-4 w-4 mr-2 flex-shrink-0" />
              <p className="text-xs line-clamp-1">{data.name}</p>
              {deletingId === data.id && (
                <div>
                  <Loader2 className="h-4 w-4 ml-3 animate-spin" />
                </div>
              )}
              {deletingId !== data.id && (
                <button
                  onClick={() => {
                    onDelete(data.id);
                  }}
                  className="ml-auto hover:opacity-75 hover:text-red-600 transition"
                >
                  <Trash className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      {!isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Upload resources related to the course
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
