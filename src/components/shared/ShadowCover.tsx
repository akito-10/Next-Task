import { Dispatch, SetStateAction } from "react";

type ShadowCoverProps = {
  setIsMyOwnOpen?: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const ShadowCover = ({
  setIsMyOwnOpen,
  setIsOpen,
}: ShadowCoverProps): JSX.Element => {
  return (
    <>
      <div
        onClick={() => {
          setIsMyOwnOpen && setIsMyOwnOpen(false);
          setIsOpen(false);
        }}
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>
      <span
        className="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
      >
        &#8203;
      </span>
    </>
  );
};
