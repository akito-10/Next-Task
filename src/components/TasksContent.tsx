import Skeleton from "@yisheng90/react-loading";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TableContents } from "src/components/shared/TableContents";
import { selectUser } from "src/features/userSlice";
import { db } from "src/firebase/firebase";
import { TasksContentType } from "src/models";
import { AlertModal } from "./shared/AlertModal";
import { PrimaryButton } from "./shared/PrimaryButton";

export const TasksContent = (): JSX.Element => {
  const router = useRouter();
  const user = useSelector(selectUser);
  const [tableContents, setTableContents] = useState<TasksContentType[]>([
    {
      id: "",
      title: "",
      todoList: [
        {
          todoId: 0,
          title: "",
          doneDate: null,
          deadline: "",
          isDone: false,
        },
      ],
      progress: 0,
      created_at: null,
    },
  ]);
  // 全体における一番目のタスク
  const [firstTask, setFirstTask] = useState<TasksContentType>();
  // 全体における最後のタスク
  const [lastTask, setLastTask] = useState<TasksContentType>();
  // 現在表示されている中の一番目のタスク
  const [currentFirstTask, setCurrentFirstTask] = useState<TasksContentType>();
  // 現在表示されている中の最後のタスク
  const [currentLastTask, setCurrentLastTask] = useState<TasksContentType>();
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [currId, setCurrId] = useState<string>("");
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const LIMIT = 5;

  const classes = tableContents.length > 3 ? "h-auto" : "h-80";

  // 初期リロードにて値をセット
  useEffect(() => {
    const unSub_1 = user.uid
      ? db
          .collection("users")
          .doc(user.uid)
          .collection("tasks")
          .orderBy("created_at", "desc")
          .limit(LIMIT)
          .onSnapshot((snapshot) => {
            const contentsArray = snapshot.docs.map((doc) => ({
              id: doc.id,
              title: doc.data().title,
              progress: doc.data().progress,
              created_at: doc.data().created_at,
              todoList: doc.data().todoList,
            }));

            setFirstTask(contentsArray[0]);
            setCurrentFirstTask(contentsArray[0]);
            setCurrentLastTask(contentsArray[snapshot.docs.length - 1]);
            setTableContents(contentsArray);
          })
      : console.log;

    const unSub_2 = user.uid
      ? db
          .collection("users")
          .doc(user.uid)
          .collection("tasks")
          .orderBy("created_at", "desc")
          .limitToLast(1)
          .onSnapshot((snapshot) => {
            setLastTask(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                title: doc.data().title,
                progress: doc.data().progress,
                created_at: doc.data().created_at,
                todoList: doc.data().todoList,
              }))[0]
            );
          })
      : console.log;

    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 150);

    return () => {
      unSub_1();
      unSub_2();
      clearTimeout(timeoutId);
    };
  }, [user.uid]);

  // ページをめくるたび、前後にページがあるか判定
  useEffect(() => {
    if (firstTask && currentFirstTask) {
      setHasPreviousPage(firstTask.id !== currentFirstTask.id);
    }
    if (lastTask && currentLastTask) {
      setHasNextPage(lastTask.id !== currentLastTask.id);
    }
  }, [user.uid, firstTask, lastTask, currentFirstTask, currentLastTask]);

  const deleteTask = (id: string) => {
    db.collection("users")
      .doc(user.uid)
      .collection("tasks")
      .doc(id)
      .delete()
      .then(() => {
        const currTaskId = localStorage.getItem("currTaskId");
        if (id === currTaskId) {
          localStorage.removeItem("currTaskId");
        }
        console.log("削除成功！");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const getPreviousPage = () => {
    const tasksRef = db
      .collection("users")
      .doc(user.uid)
      .collection("tasks")
      .limit(LIMIT)
      .orderBy("created_at", "desc")
      .endBefore(currentFirstTask?.created_at)
      .limitToLast(LIMIT);

    tasksRef.onSnapshot((snapshot) => {
      const contentsArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        progress: doc.data().progress,
        created_at: doc.data().created_at,
        todoList: doc.data().todoList,
      }));

      setCurrentFirstTask(contentsArray[0]);
      setTableContents(contentsArray);
      setCurrentLastTask(contentsArray[snapshot.docs.length - 1]);
    });
  };

  const getNextPage = () => {
    const tasksRef = db
      .collection("users")
      .doc(user.uid)
      .collection("tasks")
      .limit(LIMIT)
      .orderBy("created_at", "desc")
      .startAfter(currentLastTask?.created_at);

    tasksRef.onSnapshot((snapshot) => {
      const contentsArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        progress: doc.data().progress,
        created_at: doc.data().created_at,
        todoList: doc.data().todoList,
      }));

      setCurrentFirstTask(contentsArray[0]);
      setTableContents(contentsArray);
      setCurrentLastTask(contentsArray[snapshot.docs.length - 1]);
    });
  };

  return (
    <div className="flex flex-col max-w-full -my-8 sm:my-0">
      {isLoading ? (
        <Skeleton width={640} height={401} color="#C0C0C0" />
      ) : (
        <div className="-my-2">
          <div className="py-2 align-middle sm:rounded-t-lg bg-gray-50">
            <div
              className={classNames(
                "shadow overflow-hidden border-b border-gray-200 w-650px max-w-full mx-auto",
                classes
              )}
            >
              <table className="divide-y divide-gray-200 w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                    >
                      Progress
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                    >
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tableContents.length > 0 && tableContents[0].title !== "" ? (
                    tableContents.map((content) => (
                      <TableContents
                        key={content.id}
                        className="h-14"
                        sub={`${content.progress}%`}
                        onClick={() => {
                          setIsAlertOpen(true);
                          setCurrId(content.id);
                        }}
                      >
                        <Link href={`/tasks/${content.id}`}>
                          <span
                            onClick={() =>
                              localStorage.setItem("taskId", content.id)
                            }
                            className="cursor-pointer"
                          >
                            {content.title}
                          </span>
                        </Link>
                      </TableContents>
                    ))
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </div>
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="px-6 flex-1 flex justify-between">
                <p
                  className={classNames(
                    "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 cursor-pointer select-none",
                    !hasPreviousPage && "pointer-events-none bg-gray-200"
                  )}
                  onClick={getPreviousPage}
                >
                  ＜Previous
                </p>
                <p
                  className={classNames(
                    "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 cursor-pointer select-none",
                    !hasNextPage && "pointer-events-none bg-gray-200"
                  )}
                  onClick={getNextPage}
                >
                  Next＞
                </p>
              </div>
            </div>
          </div>
          <PrimaryButton
            bgColor="blue"
            className="bottom-20 left-1/2 translate-x-50"
            fixed
            onClick={() => router.push("/tasks-page/new-task")}
          >
            新規タスク追加
          </PrimaryButton>
        </div>
      )}
      <AlertModal
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        primaryText={"削除する"}
        message="このタスクを削除しますか？"
        secondText={"キャンセル"}
        onClick={() => deleteTask(currId)}
      />
    </div>
  );
};
