import { ChangeEvent, FormEvent, useState } from 'react';
import { functions } from 'src/firebase/firebase';
import { AlertModal } from './shared/AlertModal';
import { InputField } from './shared/InputField';
import { PrimaryButton } from './shared/PrimaryButton';

export const ContactContent = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<'alert' | 'success'>('success');

  const sendMail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name: name,
      email: email,
      content: content,
    };
    const sendMail = functions.httpsCallable('sendMail');

    await sendMail(data)
      .then(() => {
        setName('');
        setEmail('');
        setContent('');
        setIsModalOpen(true);
        setType('success');
        setMessage('お問い合わせありがとうございます。送信が完了しました。');
      })
      .catch(() => {
        setIsModalOpen(true);
        setType('alert');
        setMessage('申し訳ありません。送信に失敗しました。');
      });
  };

  return (
    <div className="w-80 max-w-full mx-3 h-full flex flex-col justify-center m-auto">
      <h1 className="text-2xl mb-6 text-center">お問い合わせ</h1>
      <InputField
        color="white"
        name="username"
        autoComplete="username"
        placeholder="お名前*"
        onBlur={setName}
      />
      <form
        className="mb-20"
        onSubmit={async (e: FormEvent<HTMLFormElement>) => await sendMail(e)}
      >
        <InputField
          type="email"
          color="white"
          name="email"
          autoComplete="email"
          placeholder="メールアドレス*"
          onBlur={setEmail}
        />
        <textarea
          className="appearance-none relative block w-full h-40 px-3 py-2 mb-3 bg-gray-50 border border-gray-300 placeholder-gray-500 text-gray-600 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="お問い合わせ内容*"
          value={content}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
        />
        <PrimaryButton type="submit" expanded>
          送信
        </PrimaryButton>
      </form>
      <AlertModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        primaryText={'OK'}
        message={message}
        type={type}
      />
    </div>
  );
};
