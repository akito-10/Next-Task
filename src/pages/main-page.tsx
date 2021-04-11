import { MainContent } from "src/components/MainContent";
import { MainLayout } from "src/layouts/main";

export default function MainPage() {
  return (
    <MainLayout page="メインページ" description="メインページです。">
      <MainContent />
    </MainLayout>
  );
}
