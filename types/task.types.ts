export type TaskStatus = "TODO" | "DONE";

export interface ITask {
  _id: string;
  goalId: string; 
  title: string;
  description?: string;
  status: TaskStatus;
  steps?: string[];
  createdAt: string;
  updatedAt: string;
}