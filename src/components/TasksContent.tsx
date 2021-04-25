import { useRouter } from "next/router";
import {
  TableContents,
  TableContentsProps,
} from "src/components/shared/TableContents";
import { PrimaryButton } from "./shared/PrimaryButton";

const TABLE_CONTENTS_VALUE: TableContentsProps[] = [
  {
    id: "1",
    name: "個人開発アプリ１",
    process: "100%",
  },
  {
    id: "2",
    name: "個人開発アプリ２",
    process: "100%",
  },
  {
    id: "3",
    name: "個人開発アプリ３",
    process: "38%",
  },
  {
    id: "4",
    name: "個人開発アプリ４",
    process: "25%",
  },
];

export const TasksContent = (): JSX.Element => {
  const router = useRouter();

  return (
    <div className="flex flex-col max-w-full -my-8 sm:my-0">
      <div className="-my-2">
        <div className="py-2 align-middle">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg  w-650px max-w-full mx-auto">
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
                    name={content.name}
                    process={content.process}
                  />
                ))}
              </tbody>
            </table>
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
