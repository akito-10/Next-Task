export type TasksContentType = {
  id: string;
  title: string;
  progress: number;
  created_at: any;
  todoList: {
    title: string;
    deadline: string;
    isDone: boolean | null;
    doneDate: any;
  }[];
};
