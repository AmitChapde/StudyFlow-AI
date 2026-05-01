import mongoose, { Schema, models } from "mongoose";
import { IGoalDB } from "@/types/db.types";

const goalSchema = new Schema<IGoalDB>(
  {
    title: { type: String, required: true },
    description: String,
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Goal =
  models.Goal || mongoose.model("Goal", goalSchema);