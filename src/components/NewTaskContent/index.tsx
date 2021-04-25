import { useState } from "react";
import { Task } from "./task";

export const NewTaskContent = () => {
  const [title, setTitle] = useState<string>("");
  const [page, setPage] = useState<string>("task");

  return (
    <div>
      {page === "task" ? (
        <Task title={title} setTitle={setTitle} setPage={setPage} />
      ) : (
        <></>
      )}
    </div>
  );
};
