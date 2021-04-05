import { Auth } from "src/components/Auth";
import { MainLayout } from "src/layouts";

export default function LoginPage() {
  return (
    <MainLayout page="ログイン" description="ログインページです。">
      <Auth />
    </MainLayout>
  );
}
