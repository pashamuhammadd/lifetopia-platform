import { notFound } from "next/navigation";

import { AppLayout } from "@/components/layout/AppLayout";
import { PublicProfile } from "@/components/profile/PublicProfile";

import {
  getPublicProfile,
  getPublicProfilePosts,
} from "@/data/profile/public-profile";

type UserProfilePageProps = {
  params: Promise<{
    username: string;
  }>;
};

export default async function UserProfilePage({
  params,
}: UserProfilePageProps) {
  const { username } = await params;

  const profile = await getPublicProfile(username);

  if (!profile) {
    notFound();
  }

  const posts = await getPublicProfilePosts(profile.id);

  return (
    <AppLayout>
      <PublicProfile profile={profile} posts={posts} />
    </AppLayout>
  );
}