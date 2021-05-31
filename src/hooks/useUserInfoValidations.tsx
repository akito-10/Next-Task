import { useCallback, useState } from 'react';
import { UserInfoType } from 'src/models';

export const useUserInfoValidations = (userInfo: UserInfoType) => {
  const [alertText, setAlertText] = useState<string>('');

  // ログイン時のバリデーション
  const checkItemsInLogin = useCallback(() => {
    if (!userInfo.email && !userInfo.password) {
      setAlertText('メールアドレス、パスワードは必須です。');
      return false;
    } else if (!userInfo.email) {
      setAlertText('メールアドレスは必須です。');
      return false;
    } else if (!userInfo.password) {
      setAlertText('パスワードは必須です。');
      return false;
    }
    return true;
  }, [userInfo]);

  // 新規登録時のバリデーション
  const checkItemsInSignUp = useCallback(() => {
    if (
      !userInfo.username &&
      !userInfo.avatar &&
      !userInfo.email &&
      !userInfo.password
    ) {
      setAlertText(
        'ユーザー名、アバター、メールアドレス、パスワードは必須です。'
      );
      return false;
    } else if (!userInfo.username) {
      setAlertText('ユーザー名は必須です。');
      return false;
    } else if (!userInfo.avatar) {
      setAlertText('アバターは必須です。');
      return false;
    } else if (!userInfo.email) {
      setAlertText('メールアドレスは必須です。');
      return false;
    } else if (!userInfo.password) {
      setAlertText('パスワードは必須です。');
      return false;
    } else if (userInfo.password.length < 6) {
      setAlertText('パスワードは6文字以上です。');
      return false;
    }
    return true;
  }, [userInfo]);

  return {
    alertText,
    setAlertText,
    checkItemsInLogin,
    checkItemsInSignUp,
  };
};
