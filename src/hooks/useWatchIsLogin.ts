import { useEffect } from "react";
import { auth } from "src/firebase/firebase";
import { login, logout } from "src/features/userSlice";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export const useWatchIsLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
        router.push("/");
      }
    });

    return () => unSub();
  }, [dispatch]);
};
