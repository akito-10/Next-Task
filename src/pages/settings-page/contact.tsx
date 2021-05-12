import { ContactContent } from "src/components/ContactContent";
import { MainLayout } from "src/layouts/main";

export default function Contact() {
  return (
    <MainLayout page="お問い合わせ" description="お問い合わせページです。">
      <ContactContent />
    </MainLayout>
  );
}
