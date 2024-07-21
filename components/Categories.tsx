"use server";
import { Category } from "@prisma/client";
import React from "react";

interface CategoriesProps {
  items: Category[];
}

import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc";
import { IconType } from "react-icons/lib";
import CategoryItem from "./CategoryItem";

const iconMap: Record<string, string> = {
  Music: "FcMusic",
  Fitness: "FcSportsMode",
  Photography: "FcOldTimeCamera",
  Accounting: "FcSalesPerformance",
  Engineering: "FcMultipleDevices",
  Filming: "FcFilmReel",
  "Computer Science": "FcEngineering",
};

const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          value={item.id}
          label={item.name}
          icon={iconMap[item.name]}
        />
      ))}
    </div>
  );
};

export default Categories;
