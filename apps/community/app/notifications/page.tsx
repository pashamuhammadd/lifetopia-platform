import type { Metadata } from "next";

import { AppLayout } from "@/components/layout/AppLayout";
import { Notifications } from "@/components/notifications/Notifications";
import { requireCurrentProfile } from "@/data/auth/require-current-profile";

export const metadata: Metadata = {
  title: "Notifications",
  description: "Private announcements and comment-reply notifications.",
  alternates: {
    canonical: "/notifications",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function NotificationsPage() {
  await requireCurrentProfile("/notifications");

  return (
    <AppLayout>
      <Notifications />
    </AppLayout>
  );
}
