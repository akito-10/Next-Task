import classNames from "classnames";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type InputFieldProps = {
  color?: "white" | "gray";
  name: string;
  type: "text" | "email" | "password" | "date";
  autoComplete?: string;
  placeholder?: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
};

export const InputField = ({
  color = "gray",
  name,
  type,
  autoComplete,
  placeholder,
  value,
  onChange,
}: InputFieldProps): JSX.Element => {
  const bgColor = color === "gray" ? "bg-gray-300" : "bg-white";

  return (
    <>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required
        className={classNames(
          "appearance-none relative block w-full px-3 py-2 mb-3 border border-gray-300 placeholder-gray-500 text-gray-600 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm",
          bgColor
        )}
        placeholder={placeholder}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.value);
          console.log(e.target.value);
          console.log(typeof e.target.value);
        }}
      />
    </>
  );
};
