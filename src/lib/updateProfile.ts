import { useDispatch } from 'react-redux';
import { updateUserProfile } from 'src/features/userSlice';

export const updateProfile = async (
  authUser: any,
  username: string,
  url: any,
  email?: string
) => {
  const dispatch = useDispatch();

  await authUser.user?.updateProfile({
    displayName: username,
    photoURL: url,
  });

  email && (await authUser?.updateEmail(email));

  dispatch(
    updateUserProfile({
      displayName: username,
      photoUrl: url,
    })
  );
};
