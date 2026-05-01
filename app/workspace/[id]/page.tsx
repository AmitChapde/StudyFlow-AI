"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import CreateGoalForm from "@/components/goal/CreateGoalForm";
import TaskList from "@/components/task/TaskList";
import { ITask } from "@/types/task.types";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WorkspacePage() {
  const params = useParams();
  const workspaceId = params.id as string;

  const [workspace, setWorkspace] = useState<any>(null);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWorkspace = async () => {
    const res = await apiFetch(`/api/workspaces/${workspaceId}`);
    setWorkspace(res.data);
  };

  const fetchTasks = async () => {
    const res = await apiFetch(`/api/tasks?workspaceId=${workspaceId}`);
    setTasks(res.data || []);
  };

  useEffect(() => {
    if (!workspaceId) return;

    const load = async () => {
      try {
        await Promise.all([fetchWorkspace(), fetchTasks()]);
      } catch (err) {
        console.error("Load error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [workspaceId]);

  if (loading) {
    return <p className="text-sm text-gray-500">Loading workspace...</p>;
  }

  if (!workspace) {
    return <p className="text-sm text-red-500">Workspace not found</p>;
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <Link
        href="/dashboard"
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-black"
      >
        <Button variant="outline" size="sm" className="px-2 cursor-pointer">
          <ArrowLeft size={16} />
          Back to Workspaces
        </Button>
      </Link>
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">{workspace.name}</h1>
        <p className="text-sm text-gray-500">
          Owner: {workspace.createdBy?.name}
        </p>
      </div>

      {/* Create Goal */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-medium">Create Goal & Generate Tasks</h2>

          <p className="text-sm text-gray-500">
            Define your goal and let AI break it into actionable steps.
          </p>

          <CreateGoalForm workspaceId={workspaceId} onCreated={fetchTasks} />
        </CardContent>
      </Card>

      {/* Tasks */}
      <div className="space-y-3">
        <h2 className="text-lg font-medium">Tasks</h2>

        {tasks.length === 0 ? (
          <p className="text-sm text-gray-500">
            No tasks yet. Create a goal to generate tasks.
          </p>
        ) : (
          <TaskList tasks={tasks} onChange={fetchTasks} />
        )}
      </div>

      {/* Back */}
    </div>
  );
}
