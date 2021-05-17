import { NextSeo } from "next-seo";
import { useWatchIsLogin } from "src/hooks/useWatchIsLogin";
import type { MainLayoutProps } from "src/layouts/types";

export function Layout({
  page,
  children,
  description,
}: MainLayoutProps): JSX.Element {
  useWatchIsLogin();

  return (
    <>
      <NextSeo title={`NextTask - ${page}`} description={description}></NextSeo>
      <main>
        <div className="font-mono min-h-screen w-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-300">
          {children}
        </div>
      </main>
    </>
  );
}
