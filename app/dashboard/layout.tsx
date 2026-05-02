import AppShell from "@/components/layout/AppShell";

export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id?: string }>;
}) {
  const { id } = await params;

  return <AppShell workspaceId={id}>{children}</AppShell>;
}
