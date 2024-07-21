"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { Progress } from "./ui/progress";
import CourseProgress from "./CourseProgress";

interface CourseCardProps {
  title: string;
  id: string;
  imageUrl: string;
  category: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
}

function CourseCard({
  title,
  id,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}: CourseCardProps) {
  return (
    <>
      <Link href={`/courses/${id}`}>
        <div className="group hover:shadow-sm transition overflow-hidden border-[2px] rounded-lg h-full p-3">
          <div className="relative w-full aspect-video rounded-md overflow-hidden">
            <Image fill alt={title} src={imageUrl} />
          </div>
          <div className="flex flex-col pt-2">
            <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition ">
              {title}
            </div>
            <p className="text-xs text-muted-foreground">{category}</p>
            <div className="my-1 flex items-center gap-x-3 text-sm md:text-xs">
              <div className="flex items-center gap-x-1 text-slate-500">
                <IconBadge size="sm" icon={BookOpen} />
                <span>
                  {chaptersLength}
                  {chaptersLength > 1 ? " Chapters" : " Chapter"}
                </span>
              </div>
            </div>
            {progress !== null ? (
              <div>
                <CourseProgress
                  size="sm"
                  variant={progress === 100 ? "success" : "default"}
                  value={progress}
                />
              </div>
            ) : (
              <p className="text-md md:text-sm font-medium">
                {formatPrice(price)}
              </p>
            )}
          </div>
        </div>
      </Link>
    </>
  );
}

export default CourseCard;
