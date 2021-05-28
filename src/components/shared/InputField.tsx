import classNames from 'classnames';
import { FocusEvent, Dispatch, SetStateAction } from 'react';

type InputFieldProps = {
  color?: 'white' | 'gray';
  name?: string;
  type?: 'text' | 'email' | 'password' | 'date';
  autoComplete?: string;
  placeholder?: string;
  onBlur: Dispatch<SetStateAction<string>>;
};

export const InputField = ({
  color = 'gray',
  name,
  type = 'text',
  autoComplete,
  placeholder,
  onBlur,
}: InputFieldProps): JSX.Element => {
  const inputStyle =
    'appearance-none relative block w-full px-3 py-2 mb-3 border border-gray-300 placeholder-gray-500 text-gray-600 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm';
  const bgColor = color === 'gray' ? 'bg-gray-300' : 'bg-white';

  return (
    <>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required
        className={classNames(inputStyle, bgColor)}
        placeholder={placeholder}
        onBlur={(e: FocusEvent<HTMLInputElement>) => {
          onBlur(e.currentTarget.value);
        }}
      />
    </>
  );
};
