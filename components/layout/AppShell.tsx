import Sidebar from "@/components/layout/Sidebar";
import MobileSidebar from "@/components/layout/MobileSidebar";

export default function AppShell({
  children,
  workspaceId,
}: {
  children: React.ReactNode;
  workspaceId?: string;
}) {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Sidebar workspaceId={workspaceId} />

      <div className="flex-1 flex flex-col">
        <MobileSidebar workspaceId={workspaceId} />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-white rounded-lg shadow-sm p-6 min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
