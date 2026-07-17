import type { Metadata } from "next";

import { AppLayout } from "@/components/layout/AppLayout";
import { MyWorld } from "@/components/my-world/MyWorld";
import { requireCurrentProfile } from "@/data/auth/require-current-profile";

export const metadata: Metadata = {
  title: "My World",
  description: "Your private Lifetopia account dashboard.",
  alternates: {
    canonical: "/my-world",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function MyWorldPage() {
  const profile = await requireCurrentProfile("/my-world");

  return (
    <AppLayout showRightSidebar={false} showTopNavbar={false}>
      <MyWorld profile={profile} />
    </AppLayout>
  );
}
