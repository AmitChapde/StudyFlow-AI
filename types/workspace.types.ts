import mongoose from "mongoose";
import { Types } from "mongoose";



export interface IUserPreview {
  _id: string;
  name: string;
  email: string;
}

export type Role = "ADMIN" | "MEMBER";

export interface CreateWorkspaceInput {
  name: string;
  userId: Types.ObjectId;
}

export interface IWorkspace {
  _id: string;
  name: string;
  createdBy: string | IUserPreview;
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
