import mongoose from "mongoose";
import "@/models/User"; 
import { CreateWorkspaceInput } from "@/types/workspace.types";
import { Workspace } from "@/models/Workspace";
import { WorkspaceMember } from "@/models/WorkspaceMember";
import { createWorkspaceMember } from "./workspaceMember.service";

export const createWorkspace = async ({
  name,
  userId,
}: CreateWorkspaceInput) => { 
  const workspace = await Workspace.create({
    name,
    createdBy: userId,
  });

  await createWorkspaceMember({
  workspaceId: workspace._id,
  userId: new mongoose.Types.ObjectId(userId),
  role: "ADMIN",
});

  await workspace.populate("createdBy", "name email");

  return {
    role: "ADMIN",
    workspace,
  };
};

export const getUserWorkspaces = async (userId: string) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);

  const memberships = await WorkspaceMember.find({
    userId: userObjectId,
  }).populate({
    path: "workspaceId",
    populate: { path: "createdBy", select: "name email" },
  });

  return memberships.map((m) => ({
    role: m.role,
    workspace: m.workspaceId,
  }));
};

export const getWorkspaceById = async (workspaceId: string) => {
  return Workspace.findById(workspaceId).populate("createdBy", "name email");
};
