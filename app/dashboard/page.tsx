"use client";

import { useState } from "react";
import CreateWorkspaceForm from "@/components/workspace/CreateWorkspaceForm";
import WorkspaceList from "@/components/workspace/WorkspaceList";

export default function DashboardPage() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Workspaces</h1>
        <p className="text-sm text-gray-500">
          Manage your study environments
        </p>
      </div>

      <CreateWorkspaceForm
        onCreated={() => setRefresh((prev) => prev + 1)}
      />

      <WorkspaceList refresh={refresh} />
    </div>
  );
}