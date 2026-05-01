import mongoose, { Schema, models } from "mongoose";
import { IWorkspaceMember } from "@/types/workspace.types";

const workspaceMemberSchema = new Schema<IWorkspaceMember>(
  {
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "MEMBER"],
      default: "MEMBER",
    },
  },
  { timestamps: true }
);

export const WorkspaceMember =
  models.WorkspaceMember ||
  mongoose.model("WorkspaceMember", workspaceMemberSchema);