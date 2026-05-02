import AppShell from "@/components/layout/AppShell";

export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id: workspaceId } = await params;

  return <AppShell workspaceId={workspaceId}>{children}</AppShell>;
}
