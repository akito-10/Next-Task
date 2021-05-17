import { MainLayout } from "src/layouts/main";
import dynamic from "next/dynamic";

const DynamicTasksContent = dynamic(
  () => import("src/components/TasksContent"),
  {
    ssr: false,
  }
);

export default function TasksPage(): JSX.Element {
  return (
    <MainLayout page="タスク一覧" description="タスク一覧ページです。">
      <DynamicTasksContent />
    </MainLayout>
  );
}
