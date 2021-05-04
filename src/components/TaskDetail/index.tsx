import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "src/features/userSlice";
import { db } from "src/firebase/firebase";
import { TasksContentType, TodoListType } from "src/models";
import { AlertModal } from "../shared/AlertModal";
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
  const [isWarningOpen, setIsWarningOpen] = useState<boolean>(false);
  const [currId, setCurrId] = useState<number>(0);

  const checkedTodo = (todo: TodoListType, checked: boolean) => {
    const allTodoLength = task.todoList.length;

    // 渡ってきたcheckedがtrueの時はfalseになる時であるので-1、逆の時は+1
    const doneTodoLength = checked
      ? task.todoList.filter((curr) => curr.isDone === true).length - 1
      : task.todoList.filter((curr) => curr.isDone === true).length + 1;

    // 完了率の計算
    const progress = Math.floor((doneTodoLength / allTodoLength) * 100);

    db.collection("users")
      .doc(user.uid)
      .collection("tasks")
      .doc(taskId!)
      .set({
        ...task,
        progress: progress,
        todoList: [
          ...task.todoList.filter((curr) => curr.todoId !== todo.todoId),
          {
            todoId: todo.todoId,
            title: todo.title,
            deadline: todo.deadline,
            isDone: !checked,
            doneDate: new Date().getTime(),
          },
        ],
      });
  };

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

  const addCurrTask = () => {
    db.collection("users")
      .doc(user.uid)
      .set({
        ...task,
      });
  };

  return (
    <div className="text-center max-w-full mb-28">
      <h1 className="text-3xl text-gray-700 mb-6 sm:mb-14">{`タスク名：${task.title}`}</h1>
      {task.todoList.map((todo) => (
        <CheckItem
          key={`${todo.todoId}`}
          setId={setCurrId}
          todo={todo}
          setIsEditOpen={setIsEditOpen}
          checkedFunc={checkedTodo}
          deleteFunc={deleteTodo}
        />
      ))}
      <PrimaryButton
        onClick={() => setIsAddOpen(true)}
        fixed
        className="bottom-24 left-1/2 translate-x-50"
      >
        新しいTodoを追加する
      </PrimaryButton>
      <PrimaryButton
        onClick={() => setIsWarningOpen(true)}
        fixed
        className="bottom-10 left-1/2 translate-x-50"
        bgColor="white"
      >
        現在のタスクにする
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
      <AlertModal
        isOpen={isWarningOpen}
        setIsOpen={setIsWarningOpen}
        primaryText={"設定"}
        message={"このタスクを現在のタスクにしますか？"}
        type="warning"
        secondText={"キャンセル"}
        onClick={() => addCurrTask()}
      />
    </div>
  );
};
