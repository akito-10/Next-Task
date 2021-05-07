import classNames from "classnames";
import { Dispatch, SetStateAction } from "react";

type ShadowCoverProps = {
  className?: string;
  setIsMyOwnOpen?: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const ShadowCover = ({
  className,
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
        className={classNames(
          "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity",
          className
        )}
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
