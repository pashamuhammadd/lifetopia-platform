import { PageHeader } from "@/components/ui/PageHeader";
import { ProfileHero } from "./ProfileHero";
import { ProfilePosts } from "./ProfilePosts";
import { ProfileStats } from "./ProfileStats";

export function PublicProfile() {
  return (
    <div className="space-y-5 pb-24 md:pb-0">
      <PageHeader
        title="Player Profile"
        description="View a Lifetopian identity, activity, and community posts."
      />

      <ProfileHero />
      <ProfileStats />
      <ProfilePosts />
    </div>
  );
}