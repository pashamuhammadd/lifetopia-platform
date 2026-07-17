import type { Metadata } from "next";
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

export async function generateMetadata({
  params,
}: UserProfilePageProps): Promise<Metadata> {
  const { username } = await params;
  const profile = await getPublicProfile(username);

  if (!profile) {
    return {
      title: "Profile Not Found",
      description: "This Lifetopia Community profile could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalPath = `/user/${encodeURIComponent(profile.username)}`;
  const title = `${profile.displayName} (@${profile.username})`;
  const description = `View ${profile.displayName}'s Lifetopia Community profile, role, and public posts.`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonicalPath,
      images: [
        {
          url: "/images/community/community-preview.png",
          width: 1586,
          height: 992,
          alt: `${profile.displayName}'s Lifetopia Community profile`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/community/community-preview.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

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
