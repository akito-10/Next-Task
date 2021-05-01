import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "src/features/userSlice";
import { db } from "src/firebase/firebase";
import { MainLayout } from "src/layouts/main";

export default function TaskDetail() {
  const user = useSelector(selectUser);
  const [task, setTask] = useState({
    id: "",
    title: "",
    progress: 0,
    created_at: null,
    todoList: [
      {
        title: "",
        deadline: "",
        isDone: null,
        doneDate: null,
      },
    ],
  });
  const taskId = localStorage.getItem("taskId");

  useEffect(() => {
    const unSub = db
      .collection("users")
      .doc(user.uid)
      .collection("tasks")
      .doc(taskId!)
      .onSnapshot((snapshot) => {
        setTask({
          id: snapshot.id,
          title: snapshot.data()?.title,
          progress: snapshot.data()?.progress,
          created_at: snapshot.data()?.created_at,
          todoList: snapshot.data()?.todoList,
        });
      });

    return () => unSub();
  }, []);

  console.log(task);

  return (
    <MainLayout
      page={`${task.title}詳細`}
      description={`${task.title}詳細です。`}
    >
      <div className="text-center max-w-full">
        <h1 className="text-3xl text-gray-700 mb-6 sm:mb-14">{`タスク名：${task.title}`}</h1>
        <div className="w-650px max-w-90p h-16 bg-gray-50 rounded-md flex items-center px-6 justify-between mx-auto">
          <input type="checkbox" className="w-4 h-4 cursor-pointer" />
          <div>
            <p>{task.todoList[0].title}</p>
            <p className="text-xs text-gray-600">{task.todoList[0].deadline}</p>
          </div>
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
