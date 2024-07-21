"use client";
import { Compass, Layout } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
import SideBarRoutes from "./SideBarRoutes";

const SideBar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-8">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="flex flex-col w-full">
        <SideBarRoutes />
      </div>
    </div>
  );
};

export default SideBar;
