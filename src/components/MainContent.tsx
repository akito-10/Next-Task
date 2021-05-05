import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "src/features/userSlice";
import { db } from "src/firebase/firebase";
import { formatDeadline } from "src/lib/format-deadline";
import { CurrTaskType, TasksContentType, TodoListType } from "src/models";
import { PrimaryButton } from "./shared/PrimaryButton";
import Skeleton from "@yisheng90/react-loading";

export const MainContent = (): JSX.Element => {
  const user = useSelector(selectUser);
  const currTaskId = localStorage.getItem("currTaskId");
  const [task, setTask] = useState<TasksContentType>({
    id: "",
    title: "",
    progress: 0,
    created_at: null,
    todoList: [
      {
        todoId: 0,
        title: "",
        doneDate: null,
        deadline: "",
        isDone: false,
      },
    ],
  });
  const [currTask, setCurrTask] = useState<CurrTaskType>({
    id: "",
    title: "",
    progress: 0,
    todo: {
      todoId: 0,
      title: "",
      deadline: "",
      doneDate: null,
      isDone: false,
    },
  });
  const [isDoneCurrTask, setIsDoneCurrTask] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isComplete = currTask.progress === 100;

  useEffect(() => {
    const unSub = currTaskId
      ? db
          .collection("users")
          .doc(user.uid)
          .collection("tasks")
          .doc(currTaskId)
          .onSnapshot((snapshot) => {
            const notDoneTodoList = snapshot.data()?.todoList
              ? snapshot
                  .data()
                  ?.todoList.filter(
                    (curr: TodoListType) => curr.isDone === false
                  )
              : null;

            // 全タスクが完了している場合、falseとなり、空の値が設定される。
            if (notDoneTodoList.length > 0) {
              const firstTodo = notDoneTodoList.sort(
                (a: TodoListType, b: TodoListType) =>
                  formatDeadline(a.deadline) - formatDeadline(b.deadline)
              )[0];
              if (snapshot.data()) {
                setTask({
                  id: snapshot.data()?.id,
                  title: snapshot.data()?.title,
                  progress: snapshot.data()?.progress,
                  created_at: snapshot.data()?.created_at,
                  todoList: snapshot.data()?.todoList,
                });
                setCurrTask({
                  id: snapshot.data()?.id,
                  title: snapshot.data()?.title,
                  progress: snapshot.data()?.progress,
                  todo: firstTodo,
                });
              }
            } else {
              setCurrTask({
                id: snapshot.data()?.id,
                title: snapshot.data()?.title,
                progress: snapshot.data()?.progress,
                todo: {
                  todoId: 0,
                  title: "タスクは完了しました。",
                  deadline: "",
                  doneDate: null,
                  isDone: false,
                },
              });
            }
          })
      : console.log;

    setIsLoading(false);

    return () => unSub();
  }, [isDoneCurrTask]);

  const currTodoDone = () => {
    const allTodoLength = task.todoList.length;
    const doneTodoLength =
      task.todoList.filter((curr: TodoListType) => curr.isDone === true)
        .length + 1;

    // 完了率の計算
    const progress = Math.floor((doneTodoLength / allTodoLength) * 100);

    currTaskId &&
      db
        .collection("users")
        .doc(user.uid)
        .collection("tasks")
        .doc(currTaskId)
        .set({
          ...task,
          progress: progress,
          todoList: [
            ...task.todoList.filter(
              (curr: TodoListType) => curr.todoId !== currTask.todo?.todoId
            ),
            {
              ...currTask.todo,
              isDone: true,
              doneDate: new Date().getTime(),
            },
          ],
        });

    // useEffectを誘発
    setIsDoneCurrTask((prev) => prev + "set");
  };

  return (
    <div className="text-center text-gray-50">
      {user.photoUrl && (
        <img
          src={user.photoUrl}
          width={100}
          height={100}
          className="rounded-full mx-auto"
        />
      )}
      <h2 className="text-3xl mt-4 text-gray-800">{user.displayName}</h2>
      <h3 className="text-2xl mt-12 text-gray-800">進行中のタスク</h3>

      {isLoading ? (
        <div className="mt-4">
          <Skeleton width={258} height={250} />
        </div>
      ) : (
        <div className="bg-gray-50 text-gray-500 px-16 py-4 mt-4 rounded-lg shadow-xl">
          <h4 className="mb-2 border-b border-black border-solid text-black">
            {currTask.title ? currTask.title : "タスクが設定されていません"}
          </h4>
          <p className="mb-4">{`進捗度： ${
            currTask.progress || currTask.progress === 0
              ? currTask.progress
              : "- "
          }%`}</p>
          <p className="mb-2 text-black">次のタスク</p>
          <p>
            {currTask.todo?.title
              ? currTask.todo.title
              : "現在進行中のタスクはありません。"}
          </p>
          <p>
            {currTask.todo?.deadline
              ? `〜 ${currTask.todo.deadline.split("-").join("/")}`
              : ""}
          </p>
          <PrimaryButton
            bgColor={isComplete ? "gray" : "blue"}
            ripple={!isComplete}
            onClick={() => currTodoDone()}
            className={isComplete ? "pointer-events-none" : ""}
          >
            {isComplete ? "Complete!!" : "Done!!"}
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};
