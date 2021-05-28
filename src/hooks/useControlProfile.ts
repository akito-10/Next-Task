import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateUserProfile } from 'src/features/userSlice';
import { auth, storage } from 'src/firebase/firebase';

type ProfileType = {
  username: string;
  email: string;
  avatar: File | null;
};

export const useControlProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentUser = auth.currentUser;
  const [profile, setProfile] = useState<ProfileType>({
    username: user.displayName,
    email: currentUser?.email!,
    avatar: null,
  });

  const changeUsername = useCallback(
    (v: string) => {
      setProfile({
        ...profile,
        username: v,
      });
    },
    [profile]
  );

  const changeEmail = useCallback(
    (v: string) => {
      setProfile({
        ...profile,
        email: v,
      });
    },
    [profile]
  );

  const changeImageHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files![0]) {
        setProfile({
          ...profile,
          avatar: e.target.files![0],
        });
        e.target.value = '';
      }
    },
    [profile]
  );

  const updateProfileHandler = useCallback(async () => {
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
  }, [profile]);

  return {
    profile,
    photoUrl: user.photoUrl,
    changeUsername,
    changeEmail,
    changeImageHandler,
    updateProfileHandler,
  };
};
