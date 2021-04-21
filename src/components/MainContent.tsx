import Image from "next/image";
import { useSelector } from "react-redux";
import { selectUser } from "src/features/userSlice";
import { Button } from "./shared/Button";

export const MainContent = (): JSX.Element => {
  const user = useSelector(selectUser);

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
      <h2 className="text-3xl mt-4">ユーザーネーム</h2>
      <h3 className="text-xl mt-12">進行中のタスク</h3>
      <div className="bg-gray-50 text-gray-500 px-16 py-4 mt-4 rounded-lg shadow-xl">
        <h4 className="mb-2 border-b border-black border-solid text-black">
          タスク名
        </h4>
        <p className="mb-4">進捗度：34%</p>
        <p className="mb-2 text-black">次のタスク</p>
        <p>プロフィール画面作成</p>
        <p>~3/24</p>
        <Button bgColor="blue">Done!!</Button>
      </div>
    </div>
  );
};
