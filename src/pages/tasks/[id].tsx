import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TaskDetail } from "src/components/TaskDetail";
import { selectUser } from "src/features/userSlice";
import { db } from "src/firebase/firebase";
import { MainLayout } from "src/layouts/main";
import { formatDeadline } from "src/lib/format-deadline";
import { TasksContentType, TodoListType } from "src/models";

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
          todoList: snapshot.data()?.todoList
            ? snapshot
                .data()
                ?.todoList.sort(
                  (a: TodoListType, b: TodoListType) =>
                    formatDeadline(a.deadline) - formatDeadline(b.deadline)
                )
            : [],
        });
      });
    setIsLoading(false);

    return () => unSub();
  }, []);

  return (
    <MainLayout
      page={`${task.title}詳細`}
      description={`${task.title}詳細です。`}
    >
      {isLoading ? <div></div> : <TaskDetail task={task} />}
    </MainLayout>
  );
}
