import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateUserProfile } from 'src/features/userSlice';
import { auth, storage } from 'src/firebase/firebase';
import { addStorage } from 'src/lib/addStorage';
import { updateProfile } from 'src/lib/updateProfile';

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
      url = await addStorage(profile.avatar, url);
    } else {
      url = currentUser?.photoURL!;
    }

    await updateProfile(currentUser, profile.username, url, profile.email);
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
