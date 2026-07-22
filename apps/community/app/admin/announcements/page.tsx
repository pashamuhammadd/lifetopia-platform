import type { Metadata } from "next";
import { AnnouncementPublisher } from "@/components/admin/AnnouncementPublisher";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { requireModeratorProfile } from "@/data/auth/require-moderator-profile";
export const metadata: Metadata = {
  title: "Official Announcements",
  robots: { index: false, follow: false },
};
export default async function AnnouncementAdminPage() {
  await requireModeratorProfile("/admin/announcements");
  return (
    <AppLayout showRightSidebar={false}>
      <div className="space-y-5">
        <PageHeader
          title="Official Announcements"
          description="Publish a real notification to every current Lifetopia profile."
        />
        <AnnouncementPublisher />
      </div>
    </AppLayout>
  );
}
