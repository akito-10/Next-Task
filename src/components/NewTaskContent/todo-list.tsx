import { Dispatch, SetStateAction, useState } from "react";
import { db } from "src/firebase/firebase";
import firebase from "firebase/app";
import { InputField } from "../shared/InputField";
import { PrimaryButton } from "../shared/PrimaryButton";
import { TableContents } from "../shared/TableContents";
import { useRouter } from "next/router";

type TodoListProps = {
  taskTitle: string;
  setPage: Dispatch<SetStateAction<string>>;
};

export const TodoList = ({
  taskTitle,
  setPage,
}: TodoListProps): JSX.Element => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [todoInfo, setTodoInfo] = useState([
    {
      title: "",
      deadline: "",
    },
  ]);

  const registerTask = () => {
    db.collection("tasks").add({
      title: taskTitle,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      todoList: todoInfo.map((todo) => {
        return {
          ...todo,
          isDone: false,
          doneDate: null,
        };
      }),
    });
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl text-gray-700 mb-6 sm:mb-14">
        {taskTitle ? `${taskTitle}のTodo登録` : "無名のタスク"}
      </h1>
      <div className="h-96 w-96 flex flex-col items-center justify-center mx-auto max-w-full">
        <h2 className="text-2xl text-gray-700 mb-5">タイトルを入力</h2>
        <InputField
          color="white"
          name="title"
          type="text"
          value={title}
          onChange={setTitle}
        />
        <h2 className="text-2xl text-gray-700 mb-3">締め切りを入力</h2>
        <InputField
          color="white"
          name="title"
          type="date"
          value={date}
          onChange={setDate}
        />
        <PrimaryButton
          bgColor="black"
          ripple
          onClick={() => {
            setTodoInfo((prev) =>
              prev[0]?.title !== ""
                ? [
                    ...prev,
                    {
                      title: title,
                      deadline: date,
                    },
                  ]
                : [
                    {
                      title: title,
                      deadline: date,
                    },
                  ]
            );
            setTitle("");
            setDate("");
          }}
        >
          Todo登録
        </PrimaryButton>
        <div className="mt-3 w-96 max-w-full">
          <table className="divide-y divide-gray-200 w-full overflow-y-scroll h-28 block rounded-md">
            <thead className="bg-gray-50 w-full block">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center w-2/5"
                >
                  Deadline
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center w-1/5"
                >
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-50 w-full block">
              {todoInfo[0]?.title && todoInfo[0].title !== null ? (
                todoInfo.map((todo) => (
                  <TableContents
                    key={`${todo.title}-${todo.deadline}`}
                    name={todo.title}
                    sub={todo.deadline}
                    onClick={() =>
                      setTodoInfo(() =>
                        todoInfo.filter((curr) => curr.title !== todo.title)
                      )
                    }
                  />
                ))
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="absolute bottom-16 left-1/2 translate-x-50 w-full">
        <PrimaryButton
          bgColor="red"
          className="mr-5"
          onClick={() => setPage("task")}
        >
          戻る
        </PrimaryButton>
        <PrimaryButton
          bgColor="green"
          onClick={() => {
            registerTask();
            router.push("/tasks-page");
          }}
        >
          登録
        </PrimaryButton>
      </div>
    </div>
  );
};
