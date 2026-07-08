import { AppLayout } from "@/components/layout/AppLayout";
import { MyWorld } from "@/components/my-world/MyWorld";

export default function MyWorldPage() {
  return (
    <AppLayout showRightSidebar={false} showTopNavbar={false}>
      <MyWorld />
    </AppLayout>
  );
}