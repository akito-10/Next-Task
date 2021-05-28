import { db } from 'src/firebase/firebase';

export const deleteTask = (uid: string, taskId: string) => {
  db.collection('users')
    .doc(uid)
    .collection('tasks')
    .doc(taskId)
    .delete()
    .then(() => {
      const currTaskId = localStorage.getItem(uid);
      if (taskId === currTaskId) {
        localStorage.removeItem(uid);
      }
      console.log('削除成功！');
    })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
};
