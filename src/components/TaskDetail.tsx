import { Dispatch, SetStateAction, useState } from "react";
import { TasksContentType } from "src/models";
import { CheckItem } from "./shared/CheckItem";
import { ControlModal } from "./shared/ControlModal";

type TaskDetailProps = {
  task: TasksContentType;
  setTask: Dispatch<SetStateAction<TasksContentType>>;
};

export const TaskDetail = ({ task, setTask }: TaskDetailProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currId, setCurrId] = useState<number>(0);

  return (
    <div className="text-center max-w-full">
      <h1 className="text-3xl text-gray-700 mb-6 sm:mb-14">{`タスク名：${task.title}`}</h1>
      {task.todoList.map((todo) => (
        <CheckItem
          key={`${todo.todoId}`}
          setId={setCurrId}
          todo={todo}
          setIsOpen={setIsOpen}
        />
      ))}
      <ControlModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        task={task}
        currId={currId}
        setTask={setTask}
      />
    </div>
  );
};
