import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full">
      {/*  */}
      <div className="md:pl-56 h-[80px] fixed inset-y-0 w-full z-50 ">
        <NavBar />
      </div>
      <div className="hidden md:flex h-full inset-y-0  w-56 flex-col fixed z-50">
        <SideBar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">{children}</main>
    </div>
  );
}
