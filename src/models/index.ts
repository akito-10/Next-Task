export type TasksContentType = {
  id: string;
  title: string;
  progress: number;
  created_at: any;
  todoList: TodoListType[];
};

export type TodoListType = {
  todoId: number;
  title: string;
  deadline: string;
  isDone: boolean;
  doneDate: any;
};

export type CurrTaskType = {
  id: string;
  title: string;
  progress: number;
  todo: {
    todoId: number;
    title: string;
    deadline: string;
    doneDate: any;
    isDone: boolean;
  };
};
