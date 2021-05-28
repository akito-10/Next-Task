import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth, storage } from 'src/firebase/firebase';
import { InputField } from './shared/InputField';
import { PrimaryButton } from './shared/PrimaryButton';
import { selectUser, updateUserProfile } from 'src/features/userSlice';
import { AlertModal } from './shared/AlertModal';
import Image from 'next/image';

type ProfileType = {
  username: string;
  email: string;
  avatar: File | null;
};

export const ProfileContent = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentUser = auth.currentUser;
  const [profile, setProfile] = useState<ProfileType>({
    username: user.displayName,
    email: currentUser?.email!,
    avatar: null,
  });
  const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setProfile({
        ...profile,
        avatar: e.target.files![0],
      });
      e.target.value = '';
    }
  };

  const updateProfileHandler = async () => {
    let url = '';
    if (profile.avatar) {
      const S =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join('');
      const fileName = randomChar + '_' + profile.avatar.name;

      await storage.ref(`avatars/${fileName}`).put(profile.avatar);
      url = await storage.ref('avatars').child(fileName).getDownloadURL();
    } else {
      url = currentUser?.photoURL!;
    }

    await currentUser?.updateProfile({
      displayName: profile.username,
      photoURL: url,
    });

    await currentUser?.updateEmail(profile.email);

    dispatch(
      updateUserProfile({
        displayName: profile.username,
        photoUrl: url,
      })
    );
  };

  const updateUsername = useCallback(
    (v: string) => {
      setProfile({
        ...profile,
        username: v,
      });
    },
    [profile]
  );

  const updateEmail = useCallback(
    (v: string) => {
      setProfile({
        ...profile,
        email: v,
      });
    },
    [profile]
  );

  return (
    <div className="w-64 text-center m-auto">
      <p className="mb-4">ユーザー名</p>
      <InputField
        color="white"
        name="username"
        type="text"
        autoComplete="username"
        placeholder={user.displayName}
        defaultValue={user.displayName}
        onBlur={updateUsername}
      />
      <p className="mt-8 mb-4">メールアドレス</p>
      <InputField
        color="white"
        name="email"
        type="email"
        autoComplete="email"
        placeholder={currentUser?.email!}
        defaultValue={currentUser?.email!}
        onBlur={updateEmail}
      />
      <div className="flex justify-evenly items-center mt-10">
        {user.photoUrl && (
          <Image
            src={user.photoUrl}
            width={40}
            height={40}
            className={'rounded-full mx-auto'}
          />
        )}
        <label className="cursor-pointer inline-block">
          <input type="file" hidden onChange={onChangeImageHandler} />
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
