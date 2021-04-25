import { useState } from "react";
import { Task } from "./task";
import { TodoList } from "./todo-list";

export const NewTaskContent = () => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [page, setPage] = useState<string>("task");

  return (
    <div>
      {page === "task" ? (
        <Task setTitle={setTaskTitle} setPage={setPage} />
      ) : (
        <TodoList taskTitle={taskTitle} setPage={setPage} />
      )}
    </div>
  );
};
