import React from "react";

export type TableContentsProps = {
  id?: string;
  name: string;
  process: string;
};

export const TableContents = ({
  name,
  process,
}: TableContentsProps): JSX.Element => {
  return (
    <tr>
      <td className="px-6 py-4">
        <div className="flex flex-col items-center">
          <div className="text-sm font-medium text-gray-900">{name}</div>
        </div>
      </td>
      <td className="px-6 py-4 text-center">
        <div className="text-sm text-gray-900">{process}</div>
      </td>
      <td className="px-6 py-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </td>
    </tr>
  );
};
