import classNames from "classnames";
import { Dispatch, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "src/features/userSlice";
import { db } from "src/firebase/firebase";
import { TasksContentType } from "src/models";
import { InputField } from "../../shared/InputField";
import { PrimaryButton } from "../../shared/PrimaryButton";

type ControlModalProps = {
  isOpen: boolean;
  task: TasksContentType;
  type: "add" | "edit";
  currId?: number;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const ControlModal = ({
  isOpen,
  task,
  type,
  currId,
  setIsOpen,
}: ControlModalProps) => {
  const user = useSelector(selectUser);
  const taskId = localStorage.getItem("taskId");
  // filterから返ってくる値は配列であるが、返ってくる値は１つであるため。
  const todo =
    type === "edit"
      ? task.todoList.filter((curr) => curr.todoId === currId)[0]
      : "";
  const [title, setTitle] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  const todoIds = task.todoList.map((todo) => todo.todoId);
  const maxIdNum = Math.max(...todoIds);

  const updateTodo = async () => {
    const allTodoLength = task.todoList.length;
    const doneTodoLength =
      task.todoList.filter((curr) => curr.isDone === true).length - 1;

    // 完了率の計算
    const progress = Math.floor((doneTodoLength / allTodoLength) * 100);

    console.log(allTodoLength);
    console.log(doneTodoLength);
    console.log(progress);

    await db
      .collection("users")
      .doc(user.uid)
      .collection("tasks")
      .doc(taskId!)
      .set({
        ...task,
        progress: progress,
        todoList: [
          ...task.todoList.filter((curr) => curr !== todo),
          {
            todoId: maxIdNum + 1,
            // １.編集時、入力欄に何も入れていなかった場合、前回の値をいれるようにする。
            // ２.typeがaddの時にtodoが""になってしまうための振り分け
            title: title ? title : todo && todo.title,
            deadline: deadline ? deadline : todo && todo.deadline,
            isDone: false,
            doneDate: null,
          },
        ],
      });
  };

  const addTodo = async () => {
    const allTodoLength = task.todoList.length + 1;
    const doneTodoLength = task.todoList.filter((curr) => curr.isDone === true)
      .length;

    // 完了率の計算
    const progress = Math.floor((doneTodoLength / allTodoLength) * 100);

    await db
      .collection("users")
      .doc(user.uid)
      .collection("tasks")
      .doc(taskId!)
      .set({
        ...task,
        progress: progress,
        todoList: [
          ...task.todoList,
          {
            todoId: maxIdNum + 1,
            title: title,
            deadline: deadline,
            isDone: false,
            doneDate: null,
          },
        ],
      });
  };

  return (
    <div
      className={classNames(
        "fixed z-10 inset-0 overflow-y-auto",
        !isOpen && "hidden"
      )}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity cursor-pointer"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <div>
                <p>Todo名</p>
                <InputField
                  color="white"
                  name="todo"
                  type="text"
                  placeholder={todo ? todo.title : ""}
                  value={title}
                  onChange={setTitle}
                />
              </div>
              <div>
                <p>締め切り</p>
                <InputField
                  color="white"
                  name="deadline"
                  type="date"
                  placeholder={todo ? todo.deadline : ""}
                  value={deadline}
                  onChange={setDeadline}
                />
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500"></p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <PrimaryButton
              bgColor="green"
              onClick={async () => {
                setIsOpen(false);
                type === "edit" ? await updateTodo() : await addTodo();
                setTitle("");
                setDeadline("");
              }}
              className="w-full inline-flex justify-center rounded-md border border-transparent text-base font-medium sm:ml-3 sm:w-auto sm:text-sm"
            >
              確定する
            </PrimaryButton>
            <PrimaryButton
              bgColor="red"
              onClick={() => {
                setIsOpen(false);
              }}
              className="w-full inline-flex justify-center rounded-md border border-transparent text-base font-medium  sm:ml-3 sm:w-auto sm:text-sm"
            >
              戻る
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};
