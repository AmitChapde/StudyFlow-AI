import mongoose, { Schema, models } from "mongoose";
import { IWorkspace } from "@/types/workspace.types";

const workspaceSchema = new Schema<IWorkspace>(
  {
    name: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Workspace =
  models.Workspace || mongoose.model("Workspace", workspaceSchema);