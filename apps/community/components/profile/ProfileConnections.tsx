import { Users } from "lucide-react";
import Link from "next/link";

import type { PublicProfileData } from "@/data/profile/public-profile";
import type { ProfileConnection } from "@/data/profile/connections";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { FollowButton } from "./FollowButton";

export function ProfileConnections({
  profile,
  connections,
  kind,
}: {
  profile: PublicProfileData;
  connections: ProfileConnection[];
  kind: "followers" | "following";
}) {
  const title = kind === "followers" ? "Followers" : "Following";
  return (
    <div className="space-y-5 pb-24 md:pb-0">
      <PageHeader
        title={`${profile.displayName}'s ${title}`}
        description={`Public ${title.toLowerCase()} connections for @${profile.username}.`}
      />
      {connections.length ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {connections.map((person) => (
            <Card key={person.id} className="flex items-center gap-4 p-5">
              <Link
                href={`/user/${encodeURIComponent(person.username)}`}
                className="flex min-w-0 flex-1 items-center gap-3"
              >
                <Avatar
                  initials={person.displayName.charAt(0)}
                  src={person.avatarSrc}
                  alt={person.displayName}
                  size={54}
                />
                <div className="min-w-0">
                  <h2 className="truncate font-black text-[#2f2418]">{person.displayName}</h2>
                  <p className="truncate text-sm font-bold text-[#7a5635]">
                    @{person.username} · {person.followersCount} followers
                  </p>
                  <p className="mt-1 text-xs font-black text-[#4f8124]">{person.role}</p>
                </div>
              </Link>
              <FollowButton
                targetProfileId={person.id}
                initialIsFollowing={person.viewerIsFollowing}
                isOwnProfile={person.isOwnProfile}
                compact
              />
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title={`No ${title.toLowerCase()} yet`}
          description="This public connection list is currently empty."
          icon={Users}
        />
      )}
    </div>
  );
}
