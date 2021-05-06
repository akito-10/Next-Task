import classNames from "classnames";
import { Dispatch, SetStateAction } from "react";
import { PrimaryButton } from "./PrimaryButton";
import { ShadowCover } from "./ShadowCover";

type AlertModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  primaryText: string;
  message: string;
  type?: "alert" | "warning";
  secondText?: string;
  onClick?: any;
};

export const AlertModal = ({
  isOpen,
  setIsOpen,
  primaryText,
  message,
  type = "alert",
  secondText,
  onClick,
}: AlertModalProps): JSX.Element => {
  const bgColor = type === "alert" ? "bg-red-100" : "bg-yellow-100";
  const textColor = type === "alert" ? "text-red-600" : "text-yellow-300";

  return (
    <div
      className={classNames(
        "fixed z-10 inset-0 overflow-y-auto",
        !isOpen && "hidden"
      )}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <ShadowCover setIsOpen={setIsOpen} />
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div
                className={classNames(
                  "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10",
                  bgColor
                )}
              >
                {/* <!-- Heroicon name: outline/exclamation --> */}
                <svg
                  className={classNames("h-6 w-6", textColor)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  {message}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500"></p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <PrimaryButton
              bgColor="black"
              onClick={async () => {
                setIsOpen(false);
                onClick && onClick();
              }}
              className="w-full inline-flex justify-center rounded-md border border-transparent text-base font-medium sm:ml-3 sm:w-auto sm:text-sm"
            >
              {primaryText}
            </PrimaryButton>
            {secondText && (
              <PrimaryButton
                bgColor="white"
                textColor="black"
                onClick={() => {
                  setIsOpen(false);
                }}
                className="w-full inline-flex justify-center rounded-md border border-transparent text-base font-medium  sm:ml-3 sm:w-auto sm:text-sm"
              >
                {secondText}
              </PrimaryButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
