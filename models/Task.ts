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
      enum: ["TODO", "DONE"],
      default: "TODO",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "MEDIUM",
    },

    dueDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

export const Task = models.Task || mongoose.model("Task", taskSchema);
