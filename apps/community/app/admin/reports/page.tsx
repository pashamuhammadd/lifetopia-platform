import type { Metadata } from "next";

import { ReportsDashboard } from "@/components/admin/ReportsDashboard";
import { AppLayout } from "@/components/layout/AppLayout";
import { getModerationReports } from "@/data/admin/reports";
import {
  requireModeratorProfile,
} from "@/data/auth/require-moderator-profile";

export const metadata: Metadata = {
  title: "Community Reports",
  description:
    "Private Lifetopia Community moderation workspace.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CommunityReportsPage() {
  await requireModeratorProfile(
    "/admin/reports",
  );

  const reports =
    await getModerationReports();

  return (
    <AppLayout
      showRightSidebar={false}
    >
      <ReportsDashboard
        reports={reports}
      />
    </AppLayout>
  );
}
