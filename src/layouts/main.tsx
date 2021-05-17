import { NextSeo } from "next-seo";
import { HeaderComponent } from "src/components/shared/Header";
import { useWatchIsLogin } from "src/hooks/useWatchIsLogin";
import type { MainLayoutProps } from "src/layouts/types";

export function MainLayout({
  page,
  children,
  description,
}: MainLayoutProps): JSX.Element {
  useWatchIsLogin();

  return (
    <>
      <NextSeo title={`NextTask - ${page}`} description={description}></NextSeo>
      <main>
        <div className="font-mono min-h-screen min-w-full flex justify-center bg-gray-300">
          <HeaderComponent />
          {children}
        </div>
      </main>
    </>
  );
}
