import mongoose from "mongoose";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export interface IGoalDB {
  title: string;
  description?: string;
  workspaceId: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
}

export interface ITaskDB {
  goalId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  status: "TODO" | "DONE";
  steps?: string[];
  createdBy: mongoose.Types.ObjectId;
  dueDate?: Date | null;
  priority?: TaskPriority;
  createdAt: Date;
  updatedAt: Date;
}
