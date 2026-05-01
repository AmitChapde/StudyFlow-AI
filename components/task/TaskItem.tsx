"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ITask } from "@/types/task.types";
import { apiFetch } from "@/lib/api";

export default function TaskItem({
  task,
  onChange,
}: {
  task: ITask;
  onChange?: () => void;
}) {
  const [checked, setChecked] = useState(task.status === "DONE");
  const [steps, setSteps] = useState<string[]>(task.steps || []);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const toggleStatus = async () => {
    const newStatus = task.status === "DONE" ? "TODO" : "DONE";

    await apiFetch(`/api/tasks/${task._id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: newStatus }),
    });

    setChecked(newStatus === "DONE");
    onChange?.();
  };

  const handleDelete = async () => {
    await apiFetch(`/api/tasks/${task._id}`, {
      method: "DELETE",
    });
    onChange?.();
  };

  const handleEditSave = async () => {
    console.log("EDIT ID:", task._id);
    await apiFetch(`/api/tasks/${task._id}`, {
      method: "PATCH",
      body: JSON.stringify({ title }),
    });
    setEditing(false);
    onChange?.();
  };

  const handleExpand = async () => {
    setLoading(true);

    try {
      const res = await apiFetch("/api/tasks/expand", {
        method: "POST",
        body: JSON.stringify({
          task: task.title,
        }),
      });

      setSteps(res.data.steps || []);
    } catch (err) {
      console.error("Expand failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-3 bg-white">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={toggleStatus}
          className="mt-1 cursor-pointer"
        />

        <div className="flex-1">
          {editing ? (
            <input
              className="w-full border rounded px-2 py-1 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <p
              className={`font-medium ${
                checked ? "line-through text-gray-400" : ""
              }`}
            >
              {title}
            </p>
          )}

          {task.description && (
            <p className="text-sm text-gray-500">{task.description}</p>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={handleExpand}>
          {loading ? "Expanding..." : "✨ Expand"}
        </Button>

        {editing ? (
          <Button size="sm" onClick={handleEditSave}>
            Save
          </Button>
        ) : (
          <Button size="sm" variant="ghost" onClick={() => setEditing(true)}>
            Edit
          </Button>
        )}

        <Button
          size="sm"
          variant="ghost"
          className="text-red-500"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>

      {steps.length > 0 && (
        <div className="bg-gray-50 p-3 rounded-md space-y-2">
          <p className="text-xs text-gray-500">AI Breakdown</p>
          {steps.map((s, i) => (
            <div key={i} className="flex gap-2 text-sm">
              <span className="text-gray-400">{i + 1}.</span>
              <span>{s}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
