import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth, storage } from "src/firebase/firebase";
import { InputField } from "./shared/InputField";
import { PrimaryButton } from "./shared/PrimaryButton";
import { updateUserProfile } from "src/features/userSlice";
import { AlertModal } from "./shared/AlertModal";

export const ProfileContent = () => {
  const dispatch = useDispatch();
  const currentUser = auth.currentUser;
  const [username, setUsername] = useState<string>(currentUser?.displayName!);
  const [email, setEmail] = useState<string>(currentUser?.email!);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setAvatar(e.target.files![0]);
      e.target.value = "";
    }
  };

  const updateProfileHandler = async () => {
    let url = "";
    if (avatar) {
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomChar + "_" + avatar.name;

      await storage.ref(`avatars/${fileName}`).put(avatar);
      url = await storage.ref("avatars").child(fileName).getDownloadURL();
    } else {
      url = currentUser?.photoURL!;
    }

    await currentUser?.updateProfile({
      displayName: username,
      photoURL: url,
    });

    await currentUser?.updateEmail(email);

    dispatch(
      updateUserProfile({
        displayName: username,
        photoUrl: url,
      })
    );
  };

  useEffect(() => {
    setUsername(currentUser?.displayName!);
    setEmail(currentUser?.email!);
  }, []);

  return (
    <div className="w-64 text-center m-auto">
      <p className="mb-4">ユーザー名</p>
      <InputField
        color="white"
        name="username"
        type="text"
        autoComplete="username"
        placeholder={currentUser?.displayName!}
        value={username}
        onChange={setUsername}
      />
      <p className="mt-8 mb-4">メールアドレス</p>
      <InputField
        color="white"
        name="email"
        type="email"
        autoComplete="email"
        placeholder={currentUser?.email!}
        value={email}
        onChange={setEmail}
      />
      <div className="flex items-center">
        <img
          src={currentUser?.photoURL!}
          width={40}
          height={40}
          className="rounded-full mt-8 mx-auto"
        />
        <label className="cursor-pointer inline-block mt-10 mr-4">
          <input type="file" hidden onChange={onChangeImageHandler} />
          <p
            id="btn"
            className="bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            Change
          </p>
        </label>
      </div>
      <PrimaryButton
        className="mt-16"
        onClick={async () =>
          await updateProfileHandler()
            .then(() => {
              setIsSuccessOpen(true);
            })
            .catch(() => {
              setIsAlertOpen(false);
            })
        }
      >
        保存
      </PrimaryButton>
      <AlertModal
        isOpen={isSuccessOpen}
        setIsOpen={setIsSuccessOpen}
        primaryText="OK"
        message="保存しました。"
        type="success"
      />
      <AlertModal
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        primaryText="OK"
        message="更新に失敗しました。"
      />
    </div>
  );
};
