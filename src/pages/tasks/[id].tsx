import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TaskDetail } from "src/components/TaskDetail";
import { selectUser } from "src/features/userSlice";
import { db } from "src/firebase/firebase";
import { MainLayout } from "src/layouts/main";
import { TasksContentType } from "src/models";

export default function TaskDetailPage() {
  const user = useSelector(selectUser);
  const [task, setTask] = useState<TasksContentType>({
    id: "",
    title: "",
    progress: 0,
    created_at: null,
    todoList: [
      {
        todoId: 0,
        title: "",
        deadline: "",
        isDone: false,
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
      <TaskDetail task={task} />
    </MainLayout>
  );
}
