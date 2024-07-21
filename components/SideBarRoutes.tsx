"use client";
import { BarChart, Compass, Layout, List } from "lucide-react";
import SideBarItem from "./SideBarItem";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

const SideBarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route, index) => (
        <>
          <SideBarItem
            key={index}
            icon={route.icon}
            href={route.href}
            label={route.label}
          />
        </>
      ))}
    </div>
  );
};

export default SideBarRoutes;
