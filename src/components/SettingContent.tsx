export const SettingContent = (): JSX.Element => {
  return (
    <div className="w-full">
      <div className="w-11/12 bg-gray-50 h-auto m-auto py-4 rounded-lg">
        <h1 className="border-b-2 border-gray-400 px-5 pb-2">設定</h1>
        <ul>
          {/* <li>通知</li> */}
          <li className="flex justify-between px-8 py-3 cursor-pointer hover:bg-gray-100 sm:px-16">
            <span>お問い合わせ</span>
            <span className="text-gray-400">＞</span>
          </li>
          <li className="flex justify-between px-8 py-3 cursor-pointer hover:bg-gray-100 sm:px-16">
            <span>退会</span>
            <span className="text-gray-400">＞</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
