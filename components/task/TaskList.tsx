"use client";

import TaskItem from "./TaskItem";
import { ITask } from "@/types/task.types";

export default function TaskList({
  tasks,
  onChange,
}: {
  tasks: ITask[];
  onChange?: () => void;
}) {
  return (
    <div className="space-y-4">
      {tasks.map((t) => (
        <TaskItem key={t._id} task={t} onChange={onChange} />
      ))}
    </div>
  );
}