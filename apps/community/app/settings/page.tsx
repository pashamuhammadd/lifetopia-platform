import type { Metadata } from "next";

import { AppLayout } from "@/components/layout/AppLayout";
import { Settings } from "@/components/settings/Settings";
import { requireCurrentProfile } from "@/data/auth/require-current-profile";

export const metadata: Metadata = {
  title: "Settings",
  description: "Private Lifetopia Community account settings.",
  alternates: {
    canonical: "/settings",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SettingsPage() {
  const profile = await requireCurrentProfile("/settings");

  return (
    <AppLayout>
      <Settings profile={profile} />
    </AppLayout>
  );
}
