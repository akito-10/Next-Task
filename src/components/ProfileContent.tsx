import { useEffect, useState } from "react";
import { auth } from "src/firebase/firebase";
import { InputField } from "./shared/InputField";
import classNames from "classnames";

export const ProfileContent = () => {
  const [currentUser, setCurrentUser] = useState<any>();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null>(null);

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setAvatar(e.target.files![0]);
      e.target.value = "";
    }
  };

  useEffect(() => {
    const currentUser = auth.currentUser;
    setCurrentUser(currentUser);
    setUsername(currentUser?.displayName!);
    setEmail(currentUser?.email!);
  }, []);

  return (
    <div className="w-64">
      <p>ユーザー名</p>
      <InputField
        color="white"
        name="username"
        type="text"
        autoComplete="username"
        placeholder={currentUser?.username}
        value={username}
        onChange={setUsername}
      />
      <p>メールアドレス</p>
      <InputField
        color="white"
        name="email"
        type="email"
        autoComplete="email"
        placeholder={currentUser?.email}
        value={email}
        onChange={setEmail}
      />
      <label className="cursor-pointer">
        <img
          src={currentUser?.photoURL}
          width={40}
          height={40}
          className={classNames(
            "rounded-full",
            !avatar ? "opacity-30" : "opacity-100"
          )}
        />
        <input type="file" hidden onChange={onChangeImageHandler} />
      </label>
    </div>
  );
};
