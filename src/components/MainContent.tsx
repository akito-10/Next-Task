import Image from "next/image";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "src/features/userSlice";
import { db } from "src/firebase/firebase";
import { useSafeState } from "src/hooks/useSafeState";
import { useUnmountRef } from "src/hooks/useUnmoundRef";
import { formatDeadline } from "src/lib/format-deadline";
import { TodoListType } from "src/models";
import { PrimaryButton } from "./shared/PrimaryButton";

export const MainContent = (): JSX.Element => {
  const user = useSelector(selectUser);
  const currTaskId = localStorage.getItem("currTaskId");
  const unmountRef = useUnmountRef();
  const [task, setTask] = useSafeState(unmountRef, {
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
  const [currTask, setCurrTask] = useSafeState(unmountRef, {
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

  const isComplete = currTask.progress === 100;

  useEffect(() => {
    currTaskId &&
      db
        .collection("users")
        .doc(user.uid)
        .collection("tasks")
        .doc(currTaskId)
        .onSnapshot((snapshot) => {
          const notDoneTodoList = snapshot.data()?.todoList
            ? snapshot
                .data()
                ?.todoList.filter((curr: TodoListType) => curr.isDone === false)
            : null;

          // 全タスクが完了している場合、falseとなり、空の値が設定される。
          if (notDoneTodoList) {
            const firstTodo = notDoneTodoList.sort(
              (a: TodoListType, b: TodoListType) =>
                formatDeadline(a.deadline) - formatDeadline(b.deadline)
            )[0];
            if (snapshot.data()) {
              setTask({ ...snapshot.data() });
              setCurrTask({
                id: snapshot.data()?.id,
                title: snapshot.data()?.title,
                progress: snapshot.data()?.progress,
                todo: firstTodo,
              });
            }
          } else {
            setCurrTask({
              ...snapshot.data(),
              todo: null,
            });
          }
        });
  }, [currTask]);

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
              (curr: TodoListType) => curr.todoId !== currTask.todo.todoId
            ),
            {
              ...currTask.todo,
              isDone: true,
              doneDate: new Date().getTime(),
            },
          ],
        });

    // データベースから値を取得するため、useEffectの依存値にしている。
    setCurrTask({});
  };

  console.log(task);

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
      <div className="bg-gray-50 text-gray-500 px-16 py-4 mt-4 rounded-lg shadow-xl">
        <h4 className="mb-2 border-b border-black border-solid text-black">
          {currTask.title ? currTask.title : "タスクが設定されていません"}
        </h4>
        <p className="mb-4">{`進捗度： ${
          currTask.progress ? currTask.progress : "- "
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
    </div>
  );
};
