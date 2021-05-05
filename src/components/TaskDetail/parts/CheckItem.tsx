import { Dispatch, SetStateAction, useState } from "react";
import { TodoListType } from "src/models";
import { AlertModal } from "../../shared/AlertModal";

type CheckItemProps = {
  todo: TodoListType;
  setIsEditOpen: Dispatch<SetStateAction<boolean>>;
  setId: Dispatch<SetStateAction<number>>;
  checkedFunc: (todo: TodoListType, checked: boolean) => void;
  deleteFunc: (id: number) => void;
};

export const CheckItem = ({
  todo,
  setIsEditOpen,
  setId,
  checkedFunc,
  deleteFunc,
}: CheckItemProps): JSX.Element => {
  const [isWarningOpen, setIsWarningOpen] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  return (
    <div className="w-650px max-w-90p h-16 bg-gray-50 rounded-md flex items-center px-6 justify-between mx-auto mb-4">
      <input
        type="checkbox"
        checked={todo.isDone}
        onClick={() => {
          setIsWarningOpen(true);
        }}
        readOnly
        className="w-4 h-4 cursor-pointer"
      />
      <div>
        <p>{todo.title}</p>
        <p className="text-xs text-gray-600">{todo.deadline}</p>
      </div>
      <div className="flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={() => {
            setIsEditOpen(true);
            setId(todo.todoId);
          }}
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
          onClick={() => setIsAlertOpen(true)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </div>
      <AlertModal
        isOpen={isWarningOpen}
        setIsOpen={setIsWarningOpen}
        message={`${todo.title}を${
          todo.isDone ? "未完了" : "完了"
        }にしますか？`}
        primaryText={"OK"}
        type="warning"
        secondText={"キャンセル"}
        onClick={() => checkedFunc(todo, todo.isDone)}
      />
      <AlertModal
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        message={`${todo.title}を削除してよろしいですか？`}
        primaryText={"削除"}
        secondText={"キャンセル"}
        onClick={() => deleteFunc(todo.todoId)}
      />
    </div>
  );
};
