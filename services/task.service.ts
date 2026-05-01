import mongoose from "mongoose";
import { Task } from "@/models/Task";
import { TaskStatus } from "@/types/task.types";

export const updateTaskStatus = async (
  taskId: string,
  status: TaskStatus
) => {
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new Error("Invalid taskId");
  }

  return Task.findByIdAndUpdate(
    taskId,
    { status },
    { new: true }
  );
};


export const updateTaskContent = async (
  taskId: string,
  payload: { title?: string; description?: string }
) => {
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new Error("Invalid taskId");
  }

  return Task.findByIdAndUpdate(taskId, payload, { new: true });
};

export const deleteTaskById = async (taskId: string) => {
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new Error("Invalid taskId");
  }

  return Task.findByIdAndDelete(taskId);
};