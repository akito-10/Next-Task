import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TableContents } from "src/components/shared/TableContents";
import { selectUser } from "src/features/userSlice";
import { db } from "src/firebase/firebase";
import { TasksContentType } from "src/models";
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

  const classes = tableContents.length > 3 ? "h-auto" : "h-80";

  useEffect(() => {
    // リロードが起きた瞬間、uidが空になり、エラーが起きてしまう。
    // そのため、以下のような振り分けの処理を追加している。
    const unSub = user.uid
      ? db
          .collection("users")
          .doc(user.uid)
          .collection("tasks")
          .orderBy("created_at", "desc")
          .onSnapshot((snapshot) => {
            setTableContents(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                title: doc.data().title,
                progress: doc.data().progress,
                created_at: doc.data().title,
                todoList: doc.data().todoList,
              }))
            );
          })
      : console.log;

    return () => unSub();
  }, [user.uid]);

  const deleteTask = (id: string) => {
    if (window.confirm("このタスクを削除しますか？")) {
      db.collection("users")
        .doc(user.uid)
        .collection("tasks")
        .doc(id)
        .delete()
        .then(() => {
          console.log("削除成功！");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    }
  };

  return (
    <div className="flex flex-col max-w-full -my-8 sm:my-0">
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
                      onClick={() => deleteTask(content.id)}
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
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
              >
                ＜Previous
              </a>
              <a
                href="#"
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
              >
                Next＞
              </a>
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
    </div>
  );
};
