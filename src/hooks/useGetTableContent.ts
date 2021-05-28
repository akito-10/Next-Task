import { useCallback, useEffect, useState } from 'react';
import { db } from 'src/firebase/firebase';
import { useSelector } from 'react-redux';
import { selectUser } from 'src/features/userSlice';
import { TasksContentType } from 'src/models';

export const useGetTableContent = () => {
  const user = useSelector(selectUser);
  const [tableContents, setTableContents] = useState<TasksContentType[]>([
    {
      id: '',
      title: '',
      todoList: [
        {
          todoId: 0,
          title: '',
          doneDate: null,
          deadline: '',
          isDone: false,
        },
      ],
      progress: 0,
      created_at: null,
    },
  ]);
  // 全体における一番目のタスク
  const [firstTask, setFirstTask] = useState<TasksContentType>();
  // 全体における最後のタスク
  const [lastTask, setLastTask] = useState<TasksContentType>();
  // 現在表示されている中の一番目のタスク
  const [currentFirstTask, setCurrentFirstTask] = useState<TasksContentType>();
  // 現在表示されている中の最後のタスク
  const [currentLastTask, setCurrentLastTask] = useState<TasksContentType>();
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const LIMIT = 5;

  const getPreviousPage = useCallback(() => {
    const tasksRef = db
      .collection('users')
      .doc(user.uid)
      .collection('tasks')
      .limit(LIMIT)
      .orderBy('created_at', 'desc')
      .endBefore(currentFirstTask?.created_at)
      .limitToLast(LIMIT);

    tasksRef.onSnapshot((snapshot) => {
      const contentsArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        progress: doc.data().progress,
        created_at: doc.data().created_at,
        todoList: doc.data().todoList,
      }));

      setCurrentFirstTask(contentsArray[0]);
      setTableContents(contentsArray);
      setCurrentLastTask(contentsArray[snapshot.docs.length - 1]);
    });
  }, [user.uid, currentFirstTask, currentLastTask, tableContents]);

  const getNextPage = useCallback(() => {
    const tasksRef = db
      .collection('users')
      .doc(user.uid)
      .collection('tasks')
      .limit(LIMIT)
      .orderBy('created_at', 'desc')
      .startAfter(currentLastTask?.created_at);

    tasksRef.onSnapshot((snapshot) => {
      const contentsArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        progress: doc.data().progress,
        created_at: doc.data().created_at,
        todoList: doc.data().todoList,
      }));

      setCurrentFirstTask(contentsArray[0]);
      setTableContents(contentsArray);
      setCurrentLastTask(contentsArray[snapshot.docs.length - 1]);
    });
  }, [user.uid, currentFirstTask, currentLastTask, tableContents]);

  // 初期リロードにて値をセット
  useEffect(() => {
    const unSub_1 = user.uid
      ? db
          .collection('users')
          .doc(user.uid)
          .collection('tasks')
          .orderBy('created_at', 'desc')
          .limit(LIMIT)
          .onSnapshot((snapshot) => {
            const contentsArray = snapshot.docs.map((doc) => ({
              id: doc.id,
              title: doc.data().title,
              progress: doc.data().progress,
              created_at: doc.data().created_at,
              todoList: doc.data().todoList,
            }));

            setFirstTask(contentsArray[0]);
            setCurrentFirstTask(contentsArray[0]);
            setCurrentLastTask(contentsArray[snapshot.docs.length - 1]);
            setTableContents(contentsArray);
          })
      : console.log;

    const unSub_2 = user.uid
      ? db
          .collection('users')
          .doc(user.uid)
          .collection('tasks')
          .orderBy('created_at', 'desc')
          .limitToLast(1)
          .onSnapshot((snapshot) => {
            setLastTask(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                title: doc.data().title,
                progress: doc.data().progress,
                created_at: doc.data().created_at,
                todoList: doc.data().todoList,
              }))[0]
            );
          })
      : console.log;

    setIsLoading(false);

    return () => {
      unSub_1();
      unSub_2();
    };
  }, [user.uid]);

  // ページをめくるたび、前後にページがあるか判定
  useEffect(() => {
    if (firstTask && currentFirstTask) {
      setHasPreviousPage(firstTask.id !== currentFirstTask.id);
    }
    if (lastTask && currentLastTask) {
      setHasNextPage(lastTask.id !== currentLastTask.id);
    }
  }, [user.uid, firstTask, lastTask, currentFirstTask, currentLastTask]);

  return {
    tableContents,
    isLoading,
    hasPreviousPage,
    hasNextPage,
    getPreviousPage,
    getNextPage,
  };
};
