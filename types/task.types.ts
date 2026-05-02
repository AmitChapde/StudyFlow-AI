export type TaskStatus = "TODO" | "DONE";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export interface ITask {
  _id: string;
  goalId: string; 
  title: string;
  description?: string;
  status: TaskStatus;
  steps?: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  dueDate?: string | null;
  priority?: TaskPriority;
}