import { useCallback, useState } from 'react';
import { auth } from 'src/firebase/firebase';
import { UserInfoType } from 'src/models';
import { addStorage } from 'src/lib/addStorage';
import { updateProfile } from 'src/lib/updateProfile';
import { useUserInfoValidations } from './useUserInfoValidations';

export const useControlUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    email: '',
    password: '',
    avatar: null,
    username: '',
  });
  const [isViewAlert, setIsViewAlert] = useState<boolean>(true);
  const { alertText, setAlertText, checkItemsInLogin, checkItemsInSignUp } =
    useUserInfoValidations(userInfo);

  const changeImageHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files![0]) {
        setUserInfo({
          ...userInfo,
          avatar: e.target.files![0],
        });
        e.target.value = '';
      }
    },
    [userInfo]
  );

  const signInEmail = useCallback(async () => {
    await auth
      .signInWithEmailAndPassword(userInfo.email!, userInfo.password!)
      .then(() => {})
      .catch(() => {
        setAlertText('メールアドレスまたはパスワードが正しくありません。');
        setIsViewAlert(true);
      });
  }, [userInfo]);

  const signUpEmail = useCallback(async () => {
    const authUser = await auth.createUserWithEmailAndPassword(
      userInfo.email!,
      userInfo.password!
    );

    let url = '';
    if (userInfo.avatar) {
      url = await addStorage(userInfo.avatar, url);
    }

    await updateProfile(authUser, userInfo.username, url);
  }, [userInfo]);

  const changeUsername = useCallback(
    (v: string) => {
      setUserInfo({
        ...userInfo,
        username: v,
      });
    },
    [userInfo]
  );

  const changeEmail = useCallback(
    (v: string) => {
      setUserInfo({
        ...userInfo,
        email: v,
      });
    },
    [userInfo]
  );

  const changePassword = useCallback(
    (v: string) => {
      setUserInfo({
        ...userInfo,
        password: v,
      });
    },
    [userInfo]
  );

  return {
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
  };
};
