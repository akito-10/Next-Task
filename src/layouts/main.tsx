import { NextSeo } from "next-seo";
import { HeaderComponent } from "src/components/header";
import type { MainLayoutProps } from "src/layouts/types";

export function MainLayout({
  page,
  children,
  description,
}: MainLayoutProps): JSX.Element {
  return (
    <>
      <NextSeo title={`Tasker - ${page}`} description={description}></NextSeo>
      <main>
        <div className="font-mono min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-500">
          <HeaderComponent />
          {children}
        </div>
      </main>
    </>
  );
}
