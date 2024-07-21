"use client";

import { formatPrice } from "@/lib/format";
import { Button } from "./ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

interface CourseEnrollProps {
  courseId: string;
  price: number;
}

async function CourseEnrollButton({ courseId, price }: CourseEnrollProps) {
  const [isLoading, setisLoading] = useState(false);

  const onClick = async () => {
    try {
      setisLoading(true);
      const response = await axios.post(`/api/courses/${courseId}/checkout`);
      window.location.assign(response.data.url);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setisLoading(false);
    }
  };

  return (
    <Button disabled={isLoading} onClick={onClick} className="w-full md:w-auto">
      Enroll for {formatPrice(price)}
    </Button>
  );
}

export default CourseEnrollButton;
