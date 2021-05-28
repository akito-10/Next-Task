import { useState } from 'react';
import { InputField } from './shared/InputField';
import { PrimaryButton } from './shared/PrimaryButton';
import { AlertModal } from './shared/AlertModal';
import Image from 'next/image';
import { useControlProfile } from 'src/hooks/useControlProfile';

export const ProfileContent = () => {
  const {
    profile,
    photoUrl,
    changeUsername,
    changeEmail,
    changeImageHandler,
    updateProfileHandler,
  } = useControlProfile();
  const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  return (
    <div className="w-64 text-center m-auto">
      <p className="mb-4">ユーザー名</p>
      <InputField
        color="white"
        name="username"
        type="text"
        autoComplete="username"
        placeholder={profile.username}
        defaultValue={profile.username}
        onBlur={changeUsername}
      />
      <p className="mt-8 mb-4">メールアドレス</p>
      <InputField
        color="white"
        name="email"
        type="email"
        autoComplete="email"
        placeholder={profile.email}
        defaultValue={profile.email}
        onBlur={changeEmail}
      />
      <div className="flex justify-evenly items-center mt-10">
        {photoUrl && (
          <Image
            src={photoUrl}
            width={40}
            height={40}
            className={'rounded-full mx-auto'}
          />
        )}
        <label className="cursor-pointer inline-block">
          <input type="file" hidden onChange={changeImageHandler} />
          <p
            id="btn"
            className="bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            変更
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
