import mongoose from "mongoose";
import { Types } from "mongoose";
import { IUser } from "./user.types";

export type Role = "ADMIN" | "MEMBER";

export interface CreateWorkspaceInput {
  name: string;
  userId: Types.ObjectId;
}

export interface IWorkspace {
   _id: string;
  name: string;
  createdBy: IUser | Types.ObjectId;
}

export interface WorkspaceWithRole {
  role: Role;
  workspace: IWorkspace;
}

export interface IWorkspaceMember {
  workspaceId: Types.ObjectId;
  userId: Types.ObjectId;
  role: Role;
}

export type CreateWorkspaceMemberInput = {
  workspaceId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  role?: "ADMIN" | "MEMBER";
};
