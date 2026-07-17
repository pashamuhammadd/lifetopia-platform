import type { Metadata } from "next";

import { AppLayout } from "@/components/layout/AppLayout";
import { Quest } from "@/components/quest/Quest";
import { requireCurrentProfile } from "@/data/auth/require-current-profile";

export const metadata: Metadata = {
  title: "Community Quests",
  description: "Private Lifetopia Community quest and Harmony progression.",
  alternates: {
    canonical: "/quest",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function QuestPage() {
  await requireCurrentProfile("/quest");

  return (
    <AppLayout>
      <Quest />
    </AppLayout>
  );
}
