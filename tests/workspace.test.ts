import { Types } from "mongoose";
import { Workspace } from "@/models/Workspace";
import { WorkspaceMember } from "@/models/WorkspaceMember";
import {
  createWorkspace,
  getUserWorkspaces,
  getWorkspaceById,
} from "@/services/workspace.service";
import { createWorkspaceMember } from "@/services/workspaceMember.service";

jest.mock("@/models/User", () => ({}));

jest.mock("@/models/Workspace", () => ({
  Workspace: {
    create: jest.fn(),
    findById: jest.fn(),
  },
}));

jest.mock("@/models/WorkspaceMember", () => ({
  WorkspaceMember: {
    create: jest.fn(),
    find: jest.fn(),
  },
}));

describe("workspace service", () => {
  const userId = "507f1f77bcf86cd799439011";
  const workspaceId = new Types.ObjectId("507f1f77bcf86cd799439012");
  const workspaceCreateMock = Workspace.create as unknown as jest.Mock;
  const workspaceFindByIdMock = Workspace.findById as unknown as jest.Mock;
  const workspaceMemberCreateMock = WorkspaceMember.create as unknown as jest.Mock;
  const workspaceMemberFindMock = WorkspaceMember.find as unknown as jest.Mock;

  it("creates a workspace and adds the creator as admin", async () => {
    const workspace = {
      _id: workspaceId,
      name: "Engineering",
      populate: jest.fn().mockResolvedValue(undefined),
    };

    workspaceCreateMock.mockResolvedValue(workspace);
    workspaceMemberCreateMock.mockResolvedValue({
      workspaceId,
      userId: new Types.ObjectId(userId),
      role: "ADMIN",
    });

    const result = await createWorkspace({ name: "Engineering", userId });

    expect(Workspace.create).toHaveBeenCalledWith({
      name: "Engineering",
      createdBy: userId,
    });
    expect(WorkspaceMember.create).toHaveBeenCalledWith({
      workspaceId,
      userId: new Types.ObjectId(userId),
      role: "ADMIN",
    });
    expect(workspace.populate).toHaveBeenCalledWith("createdBy", "name email");
    expect(result).toEqual({ role: "ADMIN", workspace });
  });

  it("creates a member role by default", async () => {
    workspaceMemberCreateMock.mockResolvedValue({
      workspaceId,
      userId: new Types.ObjectId(userId),
      role: "MEMBER",
    });

    await createWorkspaceMember({
      workspaceId,
      userId: new Types.ObjectId(userId),
    });

    expect(WorkspaceMember.create).toHaveBeenCalledWith({
      workspaceId,
      userId: new Types.ObjectId(userId),
      role: "MEMBER",
    });
  });

  it("returns workspaces from populated memberships", async () => {
    const memberships = [
      {
        role: "ADMIN",
        workspaceId: { _id: workspaceId, name: "Engineering" },
      },
    ];
    const populate = jest.fn().mockResolvedValue(memberships);
    workspaceMemberFindMock.mockReturnValue({ populate });

    const result = await getUserWorkspaces(userId);

    expect(WorkspaceMember.find).toHaveBeenCalledWith({
      userId: new Types.ObjectId(userId),
    });
    expect(populate).toHaveBeenCalledWith({
      path: "workspaceId",
      populate: { path: "createdBy", select: "name email" },
    });
    expect(result).toEqual([
      {
        role: "ADMIN",
        workspace: memberships[0].workspaceId,
      },
    ]);
  });

  it("fetches a workspace by id with owner details populated", () => {
    const populate = jest.fn();
    workspaceFindByIdMock.mockReturnValue({ populate });

    getWorkspaceById(workspaceId.toString());

    expect(Workspace.findById).toHaveBeenCalledWith(workspaceId.toString());
    expect(populate).toHaveBeenCalledWith("createdBy", "name email");
  });
});
