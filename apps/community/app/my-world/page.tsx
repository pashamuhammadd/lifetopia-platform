import type { Metadata } from "next";
import { AppLayout } from "@/components/layout/AppLayout";
import { MyWorldDashboard } from "@/components/my-world/MyWorldDashboard";
import { requireCurrentProfile } from "@/data/auth/require-current-profile";
import { getMyWorldDashboard } from "@/data/my-world";

export const metadata: Metadata = { title: "My World", description: "Your private Lifetopia account and CommunityHub dashboard.", robots: { index: false, follow: false } };

export default async function MyWorldPage() {
  await requireCurrentProfile("/my-world");
  const dashboard = await getMyWorldDashboard();
  if (!dashboard) throw new Error("My World is unavailable. Run Community Phase 8 SQL first.");
  return <AppLayout><MyWorldDashboard dashboard={dashboard}/></AppLayout>;
}
