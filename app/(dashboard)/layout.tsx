import SideBar from "@/components/SideBar";

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full">
      {/* hidden */}
      <div className=" md:flex h-full flex-col fixed">
        <SideBar />
      </div>
      {children}
    </div>
  );
}
