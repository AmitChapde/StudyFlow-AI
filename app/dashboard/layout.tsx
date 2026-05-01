import Sidebar from "@/components/layout/Sidebar";
import MobileSidebar from "@/components/layout/MobileSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <MobileSidebar />

        <main className="p-6">
          <div className="bg-white rounded-lg shadow-sm p-6 min-h-[80vh]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}