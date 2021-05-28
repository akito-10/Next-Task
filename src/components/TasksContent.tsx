import Skeleton from '@yisheng90/react-loading';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { TableContents } from 'src/components/shared/TableContents';
import { selectUser } from 'src/features/userSlice';
import { db } from 'src/firebase/firebase';
import { useGetTableContent } from 'src/hooks/useGetTableContent';
import { AlertModal } from './shared/AlertModal';
import { PrimaryButton } from './shared/PrimaryButton';

const TasksContent = (): JSX.Element => {
  const router = useRouter();
  const user = useSelector(selectUser);
  const [currId, setCurrId] = useState<string>('');
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const {
    tableContents,
    isLoading,
    hasPreviousPage,
    hasNextPage,
    getPreviousPage,
    getNextPage,
  } = useGetTableContent();

  const classes = tableContents.length > 3 ? 'h-auto' : 'h-80';

  const deleteTask = (id: string) => {
    db.collection('users')
      .doc(user.uid)
      .collection('tasks')
      .doc(id)
      .delete()
      .then(() => {
        const currTaskId = localStorage.getItem(user.uid);
        if (id === currTaskId) {
          localStorage.removeItem(user.uid);
        }
        console.log('削除成功！');
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  };

  return (
    <div className="flex flex-col max-w-full pt-24 pb-8">
      {isLoading || tableContents[0]?.title === '' ? (
        <Skeleton height={401} color="#C0C0C0" />
      ) : (
        <div className="-my-2">
          <div className="py-2 align-middle sm:rounded-t-lg bg-gray-50">
            <div
              className={classNames(
                'shadow overflow-hidden border-b border-gray-200 w-650px max-w-full mx-auto',
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
                  {tableContents.length > 0 && tableContents[0].title !== '' ? (
                    tableContents.map((content) => (
                      <TableContents
                        key={content.id}
                        className={classNames(
                          'h-14',
                          content.progress === 100 && 'bg-gray-200 opacity-70'
                        )}
                        sub={content.progress ? `${content.progress}%` : '0%'}
                        onClick={() => {
                          setIsAlertOpen(true);
                          setCurrId(content.id);
                        }}
                      >
                        <Link href={`/tasks/${content.id}`}>
                          <a
                            onClick={() =>
                              localStorage.setItem('taskId', content.id)
                            }
                            className="cursor-pointer"
                          >
                            {content.title}
                          </a>
                        </Link>
                      </TableContents>
                    ))
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </div>
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="px-6 flex-1 flex justify-between">
                <p
                  className={classNames(
                    'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 cursor-pointer select-none',
                    !hasPreviousPage && 'pointer-events-none bg-gray-200'
                  )}
                  onClick={getPreviousPage}
                >
                  ＜Previous
                </p>
                <p
                  className={classNames(
                    'ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 cursor-pointer select-none',
                    !hasNextPage && 'pointer-events-none bg-gray-200'
                  )}
                  onClick={getNextPage}
                >
                  Next＞
                </p>
              </div>
            </div>
          </div>
          <PrimaryButton
            bgColor="blue"
            className="bottom-20 left-1/2 translate-x-50"
            fixed
            onClick={() => router.push('/tasks-page/new-task')}
          >
            新規タスク追加
          </PrimaryButton>
        </div>
      )}
      <AlertModal
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        primaryText={'削除する'}
        message="このタスクを削除しますか？"
        secondText={'キャンセル'}
        onClick={() => deleteTask(currId)}
      />
    </div>
  );
};

export default TasksContent;
