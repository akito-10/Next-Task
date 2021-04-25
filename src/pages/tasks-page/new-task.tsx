import { NewTaskContent } from "src/components/NewTaskContent";
import { MainLayout } from "src/layouts/main";

export default function NewTask(): JSX.Element {
  return (
    <MainLayout page="新規タスク作成" description="新規タスク作成ページです。">
      <NewTaskContent />
    </MainLayout>
  );
}
