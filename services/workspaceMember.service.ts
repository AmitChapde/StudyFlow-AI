import mongoose from "mongoose";
import { WorkspaceMember } from "@/models/WorkspaceMember";
import { CreateWorkspaceMemberInput } from "@/types/workspace.types";


export const createWorkspaceMember = async ({
  workspaceId,
  userId,
  role = "MEMBER",
}: CreateWorkspaceMemberInput) => {
  const workspaceObjectId = new mongoose.Types.ObjectId(workspaceId);
  const userObjectId = new mongoose.Types.ObjectId(userId);

  return WorkspaceMember.create({
    workspaceId: workspaceObjectId,
    userId: userObjectId,
    role,
  });
}; 