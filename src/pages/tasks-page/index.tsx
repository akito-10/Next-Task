import { MainLayout } from "src/layouts/main";
import { TasksContent } from "src/components/TasksContent";

export default function TasksPage(): JSX.Element {
  return (
    <MainLayout page="タスク一覧" description="タスク一覧ページです。">
      <TasksContent />
    </MainLayout>
  );
}
