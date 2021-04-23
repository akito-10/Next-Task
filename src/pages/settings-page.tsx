import { SettingContent } from "src/components/SettingContent";
import { MainLayout } from "src/layouts/main";

export default function SettingsPage(): JSX.Element {
  return (
    <MainLayout page="設定" description="設定ページです。">
      <SettingContent />
    </MainLayout>
  );
}
