import classNames from "classnames";
import { Dispatch, SetStateAction } from "react";
import { InputField } from "./InputField";
import { PrimaryButton } from "./PrimaryButton";
import { ShadowCover } from "./ShadowCover";

type InputModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  message: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onClick?: any;
};

export const InputModal = ({
  isOpen,
  setIsOpen,
  message,
  value,
  setValue,
  onClick,
}: InputModalProps) => {
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
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
        <ShadowCover setIsOpen={setIsOpen} />
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="w-4/5 mx-auto">
              <InputField
                value={value}
                type="email"
                placeholder={message}
                onChange={setValue}
              />
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <PrimaryButton
              bgColor="black"
              onClick={async () => {
                await onClick();
              }}
              className="w-full inline-flex justify-center rounded-md border border-transparent text-base font-medium sm:ml-3 sm:w-auto sm:text-sm"
            >
              送信
            </PrimaryButton>
            <PrimaryButton
              bgColor="white"
              textColor="black"
              onClick={() => {
                setIsOpen(false);
              }}
              className="w-full inline-flex justify-center rounded-md border border-transparent text-base font-medium  sm:ml-3 sm:w-auto sm:text-sm"
            >
              戻る
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};
