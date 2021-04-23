import classNames from "classnames";
import { useRouter } from "next/router";

type FloatButtonProps = {
  type: "menu" | "list";
  link: string;
};

export const FloatButton = ({ type, link }: FloatButtonProps) => {
  const router = useRouter();

  const bgColor =
    type === "menu"
      ? "bg-green-500 hover:bg-green-600"
      : "bg-blue-500 hover:bg-blue-600";
  // タイプごとに中のレイアウトを変更
  const children =
    type === "menu" ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    );

  return (
    <button
      className={classNames(
        "rounded-full w-10 h-10 flex justify-center items-center shadow-xl absolute right-7 bottom-10 sm:right-1/4 sm:bottom-20",
        bgColor
      )}
      onClick={() => router.push(link)}
    >
      {children}
    </button>
  );
};
