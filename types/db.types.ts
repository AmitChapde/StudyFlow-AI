import mongoose from "mongoose";

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
  status: "TODO" | "IN_PROGRESS" | "DONE";
  steps?: string[];
}