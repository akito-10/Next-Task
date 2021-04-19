import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

type InputFieldProps = {
  name: string;
  type: string;
  autoComplete: string;
  placeholder: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
};

export const InputField = ({
  name,
  type,
  autoComplete,
  placeholder,
  value,
  onChange,
}: InputFieldProps): JSX.Element => {
  return (
    <>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required
        className="appearance-none rounded-none relative block w-full px-3 py-2 mb-3 border border-gray-300 placeholder-gray-500 text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        placeholder={placeholder}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
      />
    </>
  );
};
