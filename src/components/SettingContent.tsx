import { useRouter } from "next/router";
import { MouseEventHandler, useEffect, useState } from "react";
import { auth } from "src/firebase/firebase";
import { AlertModal } from "./shared/AlertModal";

type SettingMenuType = {
  title: string;
  handler: MouseEventHandler<HTMLLIElement>;
};

export const SettingContent = (): JSX.Element => {
  const router = useRouter();
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  const SETTING_MENU: SettingMenuType[] = [
    {
      title: "お問い合わせ",
      handler: () => router.push("settings-page/contact"),
    },
    {
      title: "退会",
      handler: () => setIsWithdrawalOpen(true),
    },
  ];

  const deleteUser = () => {
    auth.currentUser
      ?.delete()
      .then(() => {
        router.push("/");
      })
      .catch(() => {
        setIsAlertOpen(true);
      });
  };

  useEffect(() => {
    router.prefetch("/");
    router.prefetch("contact");
  }, []);

  return (
    <div className="w-full">
      <div className="w-11/12 max-w-xl bg-gray-50 h-auto m-auto py-4 rounded-lg">
        <h1 className="border-b-2 border-gray-400 px-5 pb-2">設定</h1>
        <ul>
          {SETTING_MENU.map((item, index) => (
            <li
              key={index}
              className="flex justify-between px-8 py-3 cursor-pointer hover:bg-gray-100 sm:px-16"
              onClick={item.handler}
            >
              <span>{item.title}</span>
              <span className="text-gray-400">＞</span>
            </li>
          ))}
        </ul>
      </div>
      <AlertModal
        isOpen={isWithdrawalOpen}
        setIsOpen={setIsWithdrawalOpen}
        primaryText="OK"
        message={"退会をするとアカウントが削除されます。よろしいですか？"}
        type="warning"
        secondText="キャンセル"
        onClick={() => deleteUser()}
      />
      <AlertModal
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        primaryText="OK"
        message={"上手く削除できませんでした。"}
        type="alert"
      />
    </div>
  );
};
