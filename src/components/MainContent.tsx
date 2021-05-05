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
  const unmountRef = useUnmountRef();
  const [currTask, setCurrTask] = useSafeState(unmountRef, {
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

  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .onSnapshot((snapshot) => {
        const notDoneTodoList = snapshot
          .data()
          ?.todoList.filter((curr: TodoListType) => curr.isDone === false);
        const firstTodo = notDoneTodoList.sort(
          (a: TodoListType, b: TodoListType) =>
            formatDeadline(a.deadline) - formatDeadline(b.deadline)
        )[0];
        if (snapshot.data()) {
          setCurrTask({
            title: snapshot.data()?.title,
            progress: snapshot.data()?.progress,
            todo: firstTodo,
          });
        }
      });
  }, []);

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
          {currTask.title}
        </h4>
        <p className="mb-4">{`進捗度： ${currTask.progress}%`}</p>
        <p className="mb-2 text-black">次のタスク</p>
        <p>{currTask.todo.title}</p>
        <p>{`〜 ${currTask.todo.deadline.split("-").join("/")}`}</p>
        <PrimaryButton
          bgColor="blue"
          ripple
          onClick={() => console.log("Done")}
        >
          Done!!
        </PrimaryButton>
      </div>
    </div>
  );
};
