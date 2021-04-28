import { Dispatch, SetStateAction, useState } from "react";
import { AlertModal } from "../shared/AlertModal";
import { InputField } from "../shared/InputField";
import { PrimaryButton } from "../shared/PrimaryButton";

type TaskProps = {
  setTitle: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<string>>;
};

export const Task = ({ setTitle, setPage }: TaskProps): JSX.Element => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="text-center">
      <h1 className="text-3xl text-gray-700 mb-6 sm:mb-14">新規タスク登録</h1>
      <div className="h-52 w-96 flex flex-col items-center justify-center">
        <h2 className="text-2xl text-gray-700 mb-5">タイトルを入力</h2>
        <InputField
          color="white"
          name="title"
          type="text"
          value={taskTitle}
          onChange={setTaskTitle}
        />
      </div>
      <PrimaryButton
        bgColor="blue"
        className="bottom-16 left-1/2 translate-x-50"
        fixed
        onClick={() => {
          if (!taskTitle) {
            setMessage("タイトル");
            setIsOpen(true);
            return;
          }
          setPage("todo");
          setTitle(taskTitle);
        }}
      >
        Todo入力へ
      </PrimaryButton>
      <AlertModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        primaryText="OK"
        message={`なんだろう、${message}埋めてもらってもいいですか？`}
      />
    </div>
  );
};
