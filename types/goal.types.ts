export type IGoal = {
  _id: string;
  workspaceId: string;          
  title: string;
  tasks: { 
    _id: string;
    title: string;
    completed: boolean;
  }