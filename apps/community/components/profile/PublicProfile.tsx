import type {
  PublicProfileData,
  PublicProfilePost,
} from "@/data/profile/public-profile";

import { PageHeader } from "@/components/ui/PageHeader";
import { ProfileHero } from "./ProfileHero";
import { ProfilePosts } from "./ProfilePosts";
import { ProfileStats } from "./ProfileStats";

type PublicProfileProps = {
  profile: PublicProfileData;
  posts: PublicProfilePost[];
};

export function PublicProfile({ profile, posts }: PublicProfileProps) {
  return (
    <div className="space-y-5 pb-24 md:pb-0">
      <PageHeader
        title="Player Profile"
        description="View a Lifetopian identity, activity, and community posts."
      />

      <ProfileHero profile={profile} />
      <ProfileStats profile={profile} />
      <ProfilePosts posts={posts} />
    </div>
  );
}