import { HeaderComponent } from "src/components/header";
import { MainLayout } from "src/layouts";

export default function MainPage() {
  return (
    <MainLayout page="メインページ" description="メインページです。">
      <HeaderComponent />
    </MainLayout>
  );
}
