"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
const NavBarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/chapter");

  return (
    <div className="flex gap-x-2 ml-auto">
      {isPlayerPage || isTeacherPage ? (
        <Link href="/">
          <Button className="mr-2 text-white font-semibold bg-sky-600 hover:bg-sky-400">
            <LogOut className="h-4 w-4 mr-2" />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href="/teacher/courses">
          <Button className="mr-2 font-semibold  text-white bg-sky-600 hover:bg-sky-400">
            Switch to Teacher
          </Button>
        </Link>
      )}

      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default NavBarRoutes;
