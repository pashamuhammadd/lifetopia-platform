import type { Metadata } from "next";

import { Feed } from "@/components/feed/Feed";
import { AppLayout } from "@/components/layout/AppLayout";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function CommunityHomePage() {
  return (
    <AppLayout>
      <Feed />
    </AppLayout>
  );
}
