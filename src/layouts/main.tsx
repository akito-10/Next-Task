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
      <NextSeo title={`Tasker - ${page}`} description={description}></NextSeo>
      <main>
        <div className="font-mono min-h-screen flex justify-center pt-24 pb-8 bg-gray-300">
          <HeaderComponent />
          {children}
        </div>
      </main>
    </>
  );
}
