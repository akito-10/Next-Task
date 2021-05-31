import { storage } from 'src/firebase/firebase';

export const addStorage = async (avatar: File, url: any) => {
  const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const N = 16;
  const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
    .map((n) => S[n % S.length])
    .join('');
  const fileName = randomChar + '_' + avatar.name;

  await storage.ref(`avatars/${fileName}`).put(avatar);
  url = await storage.ref('avatars').child(fileName).getDownloadURL();

  return url;
};
