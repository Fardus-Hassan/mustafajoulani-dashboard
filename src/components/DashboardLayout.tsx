import Image from "next/image";
import Sidebar from "./Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F1F5F9]">
      <Sidebar />
      <div className="flex flex-1 flex-col pl-14 md:pl-0 md:ml-64 min-w-0">
       
        <div className="min-h-[calc(100vh-3rem)] flex-1 bg-white md:rounded-none rounded-tl-2xl shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
