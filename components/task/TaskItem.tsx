"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ITask } from "@/types/task.types";
import { apiFetch } from "@/lib/api";
import { getDueLabelAndStyle } from "@/lib/task-utils";
import { Wand2 } from "lucide-react";

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
  const [dueDate, setDueDate] = useState(
    task.dueDate ? task.dueDate.split("T")[0] : "",
  );
  const [priority, setPriority] = useState(task.priority || "MEDIUM");

  const skipNextSync = useRef(false);

  useEffect(() => {
    if (skipNextSync.current) {
      skipNextSync.current = false;
      return;
    }
    setTitle(task.title);
    setPriority(task.priority || "MEDIUM");
    setDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");
  }, [task]);

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
    await apiFetch(`/api/tasks/${task._id}`, { method: "DELETE" });
    onChange?.();
  };

  const handleEditSave = async () => {
    setEditing(false);
    skipNextSync.current = true;

    const res = await apiFetch(`/api/tasks/${task._id}`, {
      method: "PATCH",
      body: JSON.stringify({ title, dueDate: dueDate || null, priority }),
    });

    const updated = res.data;
    setTitle(updated.title);
    setPriority(updated.priority);
    setDueDate(updated.dueDate ? updated.dueDate.split("T")[0] : "");
    onChange?.();
  };

  const handleExpand = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/api/tasks/expand", {
        method: "POST",
        body: JSON.stringify({ task: task.title }),
      });
      setSteps(res.data.steps || []);
    } catch (err) {
      console.error("Expand failed", err);
    } finally {
      setLoading(false);
    }
  };

  const due = dueDate ? getDueLabelAndStyle(dueDate, task.status) : null;

  return (
    <div
      className={`border rounded-lg p-4 space-y-3 transition ${due?.style.includes("red") && task.status !== "DONE" ? "border-red-300 bg-red-50" : "border-gray-200 bg-white"}`}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={toggleStatus}
          className="mt-1 cursor-pointer"
        />

        <div className="flex-1 space-y-1">
          {editing ? (
            <>
              <input
                className="w-full border rounded px-2 py-1 text-sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="date"
                className="border rounded px-2 py-1 text-sm"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              <select
                className="border rounded px-2 py-1 text-sm"
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as "LOW" | "MEDIUM" | "HIGH")
                }
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </>
          ) : (
            <>
              <p
                className={`font-medium ${checked ? "line-through text-gray-400" : ""}`}
              >
                {title}
              </p>

              <div className="flex items-center gap-2 text-xs">
                {due ? (
                  <span className={`px-2 py-0.5 rounded ${due.style}`}>
                    {due.label}
                  </span>
                ) : (
                  <span className="text-gray-400 italic">No deadline</span>
                )}

                <span
                  className={`px-2 py-0.5 rounded ${
                    priority === "HIGH"
                      ? "bg-red-100 text-red-600"
                      : priority === "MEDIUM"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {priority}
                </span>
              </div>
            </>
          )}

          {task.description && (
            <p className="text-sm text-gray-500">{task.description}</p>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={handleExpand}>
          <Wand2 className="w-3.5 h-3.5 mr-1" />
          {loading ? "Expanding..." : "Expand"}
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
