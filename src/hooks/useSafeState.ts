import { MutableRefObject, useCallback, useState } from "react";

export const useSafeState = (
  unmountRef: MutableRefObject<boolean>,
  defaultValue: any
) => {
  const [state, changeState] = useState(defaultValue);
  const wrapChangeState = useCallback(
    (v: any) => {
      if (!unmountRef.current) {
        changeState(v);
      }
    },
    [changeState, unmountRef]
  );

  return [state, wrapChangeState];
};
