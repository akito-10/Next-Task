import { useCallback, useState } from 'react';
import { auth } from 'src/firebase/firebase';

export const useResetPassword = () => {
  const [resetEmail, setResetEmail] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const sendResetEmail = useCallback(async () => {
    await auth
      .sendPasswordResetEmail(resetEmail)
      .then(() => {
        setIsModalOpen(false);
        setResetEmail('');
      })
      .catch((err) => {
        alert(err.message);
        setResetEmail('');
      });
  }, [resetEmail, isModalOpen]);

  return {
    resetEmail,
    isModalOpen,
    setResetEmail,
    setIsModalOpen,
    sendResetEmail,
  };
};
