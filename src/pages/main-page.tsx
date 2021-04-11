import { MainContent } from "src/components/MainContent";
import { MainLayout } from "src/layouts/main";

export default function MainPage(): JSX.Element {
  return (
    <MainLayout page="メインページ" description="メインページです。">
      <MainContent />
    </MainLayout>
  );
}
