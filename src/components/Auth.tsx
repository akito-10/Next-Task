import { useState } from 'react';
import { InputField } from './shared/InputField';
import Image from 'next/image';
import classNames from 'classnames';
import { InputModal } from './shared/InputModal';
import { useControlUserInfo } from 'src/hooks/useControlUserInfo';
import { useResetPassword } from 'src/hooks/useResetPassword';

export const Auth = (): JSX.Element => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  // const [isPasswordRemember, setIsPassWordRemember] = useState<boolean>(false);

  const {
    alertText,
    userInfo,
    isViewAlert,
    setIsViewAlert,
    checkItemsInLogin,
    checkItemsInSignUp,
    changeImageHandler,
    signInEmail,
    signUpEmail,
    changeUsername,
    changeEmail,
    changePassword,
  } = useControlUserInfo();

  const {
    resetEmail,
    isModalOpen,
    setResetEmail,
    setIsModalOpen,
    sendResetEmail,
  } = useResetPassword();

  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-600">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
      </div>
      <form className="mt-8 space-y-6 text-center">
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          {!isLogin && (
            <div>
              <InputField
                name="username"
                type="text"
                autoComplete="username"
                placeholder="ユーザー名"
                onBlur={changeUsername}
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
                  'rounded-full',
                  !userInfo.avatar ? 'opacity-30' : 'opacity-100'
                )}
              />
              <input type="file" hidden onChange={changeImageHandler} />
            </label>
          )}
          <div>
            <InputField
              name="email"
              type="email"
              autoComplete="email"
              placeholder="メールアドレス"
              onBlur={changeEmail}
            />
          </div>
          <div>
            <InputField
              name="password"
              type="password"
              autoComplete="password"
              placeholder="パスワード"
              onBlur={changePassword}
            />
          </div>
          <span
            className={classNames(
              'text-xs text-red-600',
              !isViewAlert && 'hidden'
            )}
          >
            {alertText}
          </span>
        </div>

        <div className="flex items-center justify-end px-3">
          {/* <div className="flex items-center">
            <input
              id="remember_me"
              name="remember_me"
              type="checkbox"
              checked={isPasswordRemember}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
              onChange={() => setIsPassWordRemember(!isPasswordRemember)}
            />
            <label className="ml-2 block text-sm text-gray-900">
              パスワードを覚えておく
            </label>
          </div> */}
          {isLogin && (
            <div className="text-sm">
              <p
                className="font-medium text-indigo-700 hover:text-indigo-900 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                パスワードを忘れた
              </p>
            </div>
          )}
        </div>
        <div>
          <button
            type="button"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
              const checkedItems = isLogin
                ? checkItemsInLogin()
                : checkItemsInSignUp();
              if (!checkedItems) {
                setIsViewAlert(true);
                return;
              }
              setIsViewAlert(false);
              isLogin ? signInEmail() : signUpEmail();
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
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            {isLogin ? 'Login' : 'Sign up'}
          </button>
          <div className="mt-3 ml-3">
            <span
              className="cursor-pointer text-gray-600"
              onClick={() => {
                setIsViewAlert(false);
                setIsLogin(!isLogin);
              }}
            >
              {isLogin ? '新規登録へ' : 'ログイン画面へ'}
            </span>
          </div>
        </div>
      </form>
      <InputModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        message={'リセット用メールアドレスを記入'}
        value={resetEmail}
        setValue={setResetEmail}
        onClick={sendResetEmail}
      />
    </div>
  );
};
