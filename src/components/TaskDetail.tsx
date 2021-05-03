import { Dispatch, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "src/features/userSlice";
import { db } from "src/firebase/firebase";
import { TasksContentType } from "src/models";
import { CheckItem } from "./shared/CheckItem";
import { ControlModal } from "./shared/ControlModal";

type TaskDetailProps = {
  task: TasksContentType;
};

export const TaskDetail = ({ task }: TaskDetailProps): JSX.Element => {
  const user = useSelector(selectUser);
  const taskId = localStorage.getItem("taskId");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currId, setCurrId] = useState<number>(0);

  const deleteTodo = (id: number) => {
    db.collection("users")
      .doc(user.uid)
      .collection("tasks")
      .doc(taskId!)
      .set({
        ...task,
        todoList: [...task.todoList.filter((curr) => curr.todoId !== id)],
      });
  };

  return (
    <div className="text-center max-w-full">
      <h1 className="text-3xl text-gray-700 mb-6 sm:mb-14">{`タスク名：${task.title}`}</h1>
      {task.todoList.map((todo) => (
        <CheckItem
          key={`${todo.todoId}`}
          setId={setCurrId}
          todo={todo}
          setIsEditOpen={setIsOpen}
          deleteFunc={deleteTodo}
        />
      ))}
      <ControlModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        task={task}
        currId={currId}
      />
    </div>
  );
};
