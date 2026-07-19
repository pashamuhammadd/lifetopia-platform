import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProfileConnections } from "@/components/profile/ProfileConnections";
import { getProfileConnections } from "@/data/profile/connections";
import { getPublicProfile } from "@/data/profile/public-profile";

export const metadata: Metadata = { title: "Followers", robots: { index: true, follow: true } };
export default async function FollowersPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params; const profile = await getPublicProfile(username); if (!profile) notFound();
  const connections = await getProfileConnections(profile.id, "followers");
  return <AppLayout><ProfileConnections profile={profile} connections={connections} kind="followers" /></AppLayout>;
}
