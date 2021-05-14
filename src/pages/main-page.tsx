import { MainLayout } from "src/layouts/main";
import dynamic from "next/dynamic";

const DynamicMainContent = dynamic(() => import("src/components/MainContent"), {
  ssr: false,
});

export default function MainPage(): JSX.Element {
  return (
    <MainLayout page="メインページ" description="メインページです。">
      <DynamicMainContent />
    </MainLayout>
  );
}
