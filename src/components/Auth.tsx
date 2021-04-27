import { useState } from "react";
import { InputField } from "./shared/InputField";
import Image from "next/image";
import classNames from "classnames";
import { auth, storage } from "src/firebase/firebase";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "src/features/userSlice";
import { useRouter } from "next/router";

export const Auth = (): JSX.Element => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [username, setUsername] = useState<string>("");
  const [alertText, setAlertText] = useState<string>("");
  const [isViewAlert, setIsViewAlert] = useState<boolean>(true);

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setAvatar(e.target.files![0]);
      e.target.value = "";
    }
  };

  // ログイン時のバリデーション
  const checkItemsInLogin = () => {
    if (!email && !password) {
      setAlertText("メールアドレス、パスワードは必須です。");
      return false;
    } else if (!email) {
      setAlertText("メールアドレスは必須です。");
      return false;
    } else if (!password) {
      setAlertText("パスワードは必須です。");
      return false;
    }
    return true;
  };

  // 新規登録時のバリデーション
  const checkItemsInSignUp = () => {
    if (!username && !avatar && !email && !password) {
      setAlertText(
        "ユーザー名、アバター、メールアドレス、パスワードは必須です。"
      );
      return false;
    } else if (!username) {
      setAlertText("ユーザー名は必須です。");
      return false;
    } else if (!avatar) {
      setAlertText("アバターは必須です。");
      return false;
    } else if (!email) {
      setAlertText("メールアドレスは必須です。");
      return false;
    } else if (!password) {
      setAlertText("パスワードは必須です。");
      return false;
    } else if (password.length < 6) {
      setAlertText("パスワードは6文字以上です。");
      return false;
    }
    return true;
  };

  const signInEmail = async () => {
    await auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        router.push("/main-page");
      })
      .catch(() => {
        setAlertText("メールアドレスまたはパスワードが正しくありません。");
        setIsViewAlert(true);
      });
  };

  const signUpEmail = async () => {
    const authUser = await auth.createUserWithEmailAndPassword(email, password);

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
    }

    await authUser.user?.updateProfile({
      displayName: username,
      photoURL: url,
    });

    dispatch(
      updateUserProfile({
        displayName: username,
        photoUrl: url,
      })
    );

    router.push("/main-page");
  };

  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-600">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
      </div>
      <form className="mt-8 space-y-6 text-center" action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          {!isLogin && (
            <div>
              <InputField
                name="username"
                type="text"
                autoComplete="username"
                placeholder="ユーザー名"
                value={username}
                onChange={setUsername}
              />
            </div>
          )}
          {!isLogin && (
            <label className="cursor-pointer">
              <Image
                src="/profile.png"
                width={40}
                height={40}
                className={classNames(
                  "rounded-full",
                  !avatar ? "opacity-30" : "opacity-100"
                )}
              />
              <input type="file" hidden onChange={onChangeImageHandler} />
            </label>
          )}
          <div>
            <InputField
              name="email"
              type="email"
              autoComplete="email"
              placeholder="メールアドレス"
              value={email}
              onChange={setEmail}
            />
          </div>
          <div>
            <InputField
              name="password"
              type="password"
              autoComplete="password"
              placeholder="パスワード"
              value={password}
              onChange={setPassword}
            />
          </div>
          <span
            className={classNames(
              "text-xs text-red-600",
              !isViewAlert && "hidden"
            )}
          >
            {alertText}
          </span>
        </div>

        <div className="flex items-center justify-between px-3">
          <div className="flex items-center">
            <input
              id="remember_me"
              name="remember_me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              パスワードを覚えておく
            </label>
          </div>

          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-indigo-700 hover:text-indigo-900"
            >
              パスワードを忘れた
            </a>
          </div>
        </div>

        <div>
          <button
            type="button"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
              {
                const checkedItems = isLogin
                  ? checkItemsInLogin()
                  : checkItemsInSignUp();
                if (!checkedItems) {
                  setIsViewAlert(true);
                  return;
                }
                setIsViewAlert(false);
                isLogin ? signInEmail() : signUpEmail();
              }
            }}
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            {isLogin ? "Login" : "Sign up"}
          </button>
          <div className="mt-3 ml-3">
            <span
              className="cursor-pointer text-gray-600"
              onClick={() => {
                setIsViewAlert(false);
                setIsLogin(!isLogin);
              }}
            >
              {isLogin ? "新規登録へ" : "ログイン画面へ"}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};
