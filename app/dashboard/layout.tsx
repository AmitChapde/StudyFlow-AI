import Sidebar from "@/components/layout/Sidebar";
import MobileSidebar from "@/components/layout/MobileSidebar";

export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
 params: Promise<{ id?: string }>;
}) {

  const { id } = await params;

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      
      <Sidebar workspaceId={id} />

      <div className="flex-1 flex flex-col">
        <MobileSidebar workspaceId={id} />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-white rounded-lg shadow-sm p-6 min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}