import classNames from "classnames";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectUser } from "src/features/userSlice";
import { auth } from "src/firebase/firebase";
import { AlertModal } from "./AlertModal";
import { ShadowCover } from "./ShadowCover";

type MenuItemProps = {
  title: string;
  link: string;
};

type SubMenuItemProps = {
  title: string;
  type: string;
};

const MENU_ITEMS: MenuItemProps[] = [
  {
    title: "Main",
    link: "main-page",
  },
  {
    title: "Tasks",
    link: "tasks-page",
  },
  {
    title: "Settings",
    link: "settings-page",
  },
];

const SUB_MENU_ITEMS: SubMenuItemProps[] = [
  {
    title: "Sign out",
    type: "logout",
  },
];

export const HeaderComponent = (): JSX.Element => {
  const router = useRouter();
  const user = useSelector(selectUser);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isWarmingOpen, setIsWarningOpen] = useState<boolean>(false);
  const [isCoverOpen, setIsCoverOpen] = useState<boolean>(false);
  const defaultStyle = "text-gray-300 hover:bg-gray-700 hover:text-white";
  const selectedStyle = "bg-gray-900 text-white";

  return (
    <>
      <nav className="bg-gray-800 w-screen fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div
              className={classNames(
                "absolute inset-y-0 left-0 flex items-center sm:hidden",
                isSubMenuOpen && "pointer-events-none"
              )}
            >
              {/* モバイルメニュー表示オン・オフボタン */}
              <button
                type="button"
                className={
                  "inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none "
                }
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                  setIsCoverOpen(!isCoverOpen);
                }}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-gray-50 font-extrabold text-2xl">Tasker</h1>
              </div>
              {/* メインメニュー */}
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  {MENU_ITEMS.map((item) => (
                    <Link key={item.title} href={`/${item.link}`}>
                      <a
                        className={classNames(
                          "px-3 py-2 rounded-md text-sm font-medium",
                          router.pathname === `/${item.title.toLowerCase()}`
                            ? selectedStyle
                            : defaultStyle
                        )}
                      >
                        {item.title}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div
                className={classNames(
                  "ml-3 relative",
                  isMenuOpen && "pointer-events-none"
                )}
              >
                <div>
                  {/* アイコンクリックでサブメニューオン・オフ */}
                  <button
                    type="button"
                    className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => {
                      setIsSubMenuOpen(!isSubMenuOpen);
                      setIsCoverOpen(!isCoverOpen);
                    }}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.photoUrl}
                      alt=""
                    />
                  </button>
                </div>
                {/* サブメニュー */}
                <div
                  className={classNames(
                    "origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ",
                    !isSubMenuOpen && "hidden"
                  )}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <ul>
                    {SUB_MENU_ITEMS.map((item) => (
                      <li
                        key={item.type}
                        onClick={async () =>
                          item.type === "logout" && setIsWarningOpen(true)
                        }
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer list-none"
                        role="menuitem"
                      >
                        {item.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* モバイルのメインメニュー画面 */}
        <div
          className={classNames("sm:hidden relative", !isMenuOpen && "hidden")}
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {MENU_ITEMS.map((item) => (
              <Link key={item.title} href={`/${item.link}`}>
                <a
                  className={classNames(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    router.pathname === `/${item.title.toLowerCase()}`
                      ? selectedStyle
                      : defaultStyle
                  )}
                >
                  {item.title}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </nav>
      {isCoverOpen && (
        <ShadowCover
          className="z-10"
          setIsMyOwnOpen={setIsCoverOpen}
          setIsOpen={isMenuOpen ? setIsMenuOpen : setIsSubMenuOpen}
        />
      )}
      <AlertModal
        type="warning"
        isOpen={isWarmingOpen}
        setIsOpen={setIsWarningOpen}
        primaryText={"OK"}
        message={"サインアウトしますか？"}
        secondText={"キャンセル"}
        onClick={async () => await auth.signOut()}
      />
    </>
  );
};
