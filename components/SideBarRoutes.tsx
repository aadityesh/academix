"use client";
import { Compass, Layout } from "lucide-react";
import SideBarItem from "./SideBarItem";

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

const SideBarRoutes = () => {
  const routes = guestRoutes;
  return (
    <div className="flex flex-col w-full">
      {guestRoutes.map((route) => (
        <>
          <SideBarItem
            key={route.href}
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
