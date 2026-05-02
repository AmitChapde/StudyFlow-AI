"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import WorkspaceCard from "./WorkspaceCard";
import { WorkspaceWithRole } from "@/types/workspace.types";

type WorkspacesResponse = {
  success: boolean;
  data: WorkspaceWithRole[];
};

export default function WorkspaceList({ refresh }: { refresh: number }) {
  const [data, setData] = useState<WorkspaceWithRole[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWorkspaces = async () => {
    try {
      setLoading(true);
      const res = await apiFetch<WorkspacesResponse>("/api/workspaces");
      setData(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, [refresh]);

  if (loading) {
    return <p className="text-sm text-gray-500">Loading workspaces...</p>;
  }

  if (!data.length) {
    return (
      <p className="text-sm text-gray-500">
        No workspaces yet. Create one above 
      </p>
    );
  }

  return (
    <div className="grid gap-3">
      {data.map((item) => (
        <WorkspaceCard
          key={item.workspace._id}
          workspace={item.workspace}
          role={item.role}
        />
      ))}
    </div>
  );
}
