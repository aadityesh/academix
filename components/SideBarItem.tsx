"use client";
import { cn } from "@/lib/utils";
import { Compass, LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SideBarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SideBarItem = ({ icon: Icon, href, label }: SideBarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const onClick = () => {
    router.push(href); // Navigate to different pages
  };

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  return (
    <>
      <button
        onClick={onClick}
        className={cn(
          "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-500 hover:bg-slate-300/20",
          isActive && "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20"
        )}
      >
        <div className="flex items-center gap-x-2 py-4">
          <Icon
            size={22}
            className={cn("text-slate-500", isActive && "text-sky-700")}
          />
          {label}
        </div>
        {/* This creates a thin line to show the Active State */}
        <div
          className={cn(
            "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",
            isActive && "opacity-100"
          )}
        />
      </button>
    </>
  );
};

export default SideBarItem;
