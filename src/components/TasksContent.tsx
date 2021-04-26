import classNames from "classnames";
import { useRouter } from "next/router";
import { useState } from "react";
import { TableContents } from "src/components/shared/TableContents";
import { PrimaryButton } from "./shared/PrimaryButton";

const TABLE_CONTENTS_VALUE = [
  {
    id: "1",
    name: "個人開発アプリ１",
    progress: "100%",
  },
  {
    id: "2",
    name: "個人開発アプリ２",
    progress: "100%",
  },
  {
    id: "3",
    name: "個人開発アプリ３",
    progress: "38%",
  },
  {
    id: "4",
    name: "個人開発アプリ４",
    progress: "25%",
  },
  // {
  //   id: "5",
  //   name: "個人開発アプリ５",
  //   progress: "25%",
  // },
];

type TableContentsType = {
  title: string;
  created_at: any;
  todoList: {
    title: string;
    deadline: string;
    isDone: boolean | null;
    doneDate: any;
  }[];
}[];

export const TasksContent = (): JSX.Element => {
  const router = useRouter();
  const [tableContents, setTableContents] = useState<TableContentsType>([
    {
      title: "",
      created_at: null,
      todoList: [
        {
          title: "",
          deadline: "",
          isDone: null,
          doneDate: null,
        },
      ],
    },
  ]);

  const classes =
    tableContents.length > 3 || TABLE_CONTENTS_VALUE.length > 3
      ? "h-auto"
      : "h-80";

  return (
    <div className="flex flex-col max-w-full -my-8 sm:my-0">
      <div className="-my-2">
        <div className="py-2 align-middle sm:rounded-t-lg bg-gray-50">
          <div
            className={classNames(
              "shadow overflow-hidden border-b border-gray-200 w-650px max-w-full mx-auto",
              classes
            )}
          >
            <table className="divide-y divide-gray-200 w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                  >
                    Progress
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {TABLE_CONTENTS_VALUE.map((content) => (
                  <TableContents
                    key={content.id}
                    className="h-14"
                    name={content.name}
                    sub={content.progress}
                    onClick={() => console.log("OK!!")}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
              >
                Previous
              </a>
              <a
                href="#"
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
              >
                Next
              </a>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-end">
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    {/* <!-- Heroicon name: solid/chevron-left --> */}
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    2
                  </a>
                  <a
                    href="#"
                    className="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    3
                  </a>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    ...
                  </span>
                  <a
                    href="#"
                    className="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    8
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    9
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    10
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <PrimaryButton
          bgColor="blue"
          className="bottom-16 left-1/2 translate-x-50"
          fixed
          onClick={() => router.push("/tasks-page/new-task")}
        >
          新規タスク追加
        </PrimaryButton>
      </div>
    </div>
  );
};
