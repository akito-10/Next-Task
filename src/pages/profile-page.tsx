import { ProfileContent } from "src/components/ProfileContent";
import { MainLayout } from "src/layouts/main";

export default function ProfilePage(): JSX.Element {
  return (
    <MainLayout page="プロフィール" description="プロフィールページです。">
      <ProfileContent />
    </MainLayout>
  );
}
