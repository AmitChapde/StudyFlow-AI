export interface IGoal {
  _id: string;
  title: string;
  description?: string;
  workspaceId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
