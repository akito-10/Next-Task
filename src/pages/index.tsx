import { Auth } from "src/components/Auth";
import { Layout } from "src/layouts";

export default function LoginPage() {
  return (
    <Layout page="ログイン" description="ログインページです。">
      <Auth />
    </Layout>
  );
}
