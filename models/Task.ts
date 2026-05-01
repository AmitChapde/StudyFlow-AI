import mongoose, { Schema, models } from "mongoose";
import { ITaskDB } from "@/types/db.types";

const taskSchema = new Schema<ITaskDB>(
  {
    goalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
      required: true,
    },
    title: { type: String, required: true },
    description: String,
    status: {
      type: String,
      enum: ["TODO", "IN_PROGRESS", "DONE"],
      default: "TODO",
    },
  },
  { timestamps: true }
);

export const Task = models.Task || mongoose.model("Task", taskSchema);