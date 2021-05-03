import { Dispatch, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "src/features/userSlice";
import { db } from "src/firebase/firebase";
import { TasksContentType } from "src/models";
import { PrimaryButton } from "../shared/PrimaryButton";
import { CheckItem } from "./parts/CheckItem";
import { ControlModal } from "./parts/ControlModal";

type TaskDetailProps = {
  task: TasksContentType;
};

export const TaskDetail = ({ task }: TaskDetailProps): JSX.Element => {
  const user = useSelector(selectUser);
  const taskId = localStorage.getItem("taskId");
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
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
    <div className="text-center max-w-full mb-24">
      <h1 className="text-3xl text-gray-700 mb-6 sm:mb-14">{`タスク名：${task.title}`}</h1>
      {task.todoList.map((todo) => (
        <CheckItem
          key={`${todo.todoId}`}
          setId={setCurrId}
          todo={todo}
          setIsEditOpen={setIsEditOpen}
          deleteFunc={deleteTodo}
        />
      ))}
      <PrimaryButton
        onClick={() => setIsAddOpen(true)}
        fixed
        className="bottom-20 left-1/2 translate-x-50"
      >
        新しいTodoを追加する
      </PrimaryButton>
      <ControlModal
        isOpen={isAddOpen}
        setIsOpen={setIsAddOpen}
        task={task}
        type="add"
      />
      <ControlModal
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        task={task}
        type="edit"
        currId={currId}
      />
    </div>
  );
};
