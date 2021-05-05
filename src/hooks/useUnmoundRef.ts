import { useEffect, useRef } from "react";

export const useUnmountRef = () => {
  const unmountRef = useRef(false);

  useEffect(
    () => () => {
      unmountRef.current = true;
    },
    []
  );

  return unmountRef;
};
