import { Compass, Heart, MessageCircle, Search, Users } from "lucide-react";
import Link from "next/link";

import type { ExplorePost, ExploreProfile } from "@/data/explore-search";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { FollowButton } from "@/components/profile/FollowButton";

export function Explore({
  query,
  tab,
  page,
  profiles,
  posts,
  hasNext,
}: {
  query: string;
  tab: "posts" | "people";
  page: number;
  profiles: ExploreProfile[];
  posts: ExplorePost[];
  hasNext: boolean;
}) {
  const href = (nextPage: number) =>
    `/explore?q=${encodeURIComponent(query)}&type=${tab}&page=${nextPage}`;
  const results = tab === "people" ? profiles.length : posts.length;
  return (
    <div className="space-y-5 pb-24 md:pb-0">
      <PageHeader
        title="Explore"
        description="Search real public conversations and Lifetopians across the community."
      />
      <Card className="p-4 md:p-5">
        <form action="/explore" className="flex flex-col gap-3 sm:flex-row">
          <input type="hidden" name="type" value={tab} />
          <label className="relative flex-1">
            <span className="sr-only">Search CommunityHub</span>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a5635]" size={18} />
            <input
              name="q"
              defaultValue={query}
              maxLength={80}
              placeholder="Search posts or Lifetopians"
              className="w-full rounded-[18px] border border-[#ead9b8] bg-[#fffaf0] py-3 pl-11 pr-4 font-bold text-[#2f2418] outline-none focus:border-[#8bc34a]"
            />
          </label>
          <button className="rounded-[18px] bg-[#4f8124] px-6 py-3 font-black text-white">
            Search
          </button>
        </form>
        <nav aria-label="Explore result type" className="mt-4 flex gap-2">
          <Link
            href={`/explore?q=${encodeURIComponent(query)}&type=posts`}
            className={`rounded-full px-4 py-2 text-sm font-black ${tab === "posts" ? "bg-[#4f8124] text-white" : "bg-[#edf7df] text-[#4f8124]"}`}
          >
            Posts
          </Link>
          <Link
            href={`/explore?q=${encodeURIComponent(query)}&type=people`}
            className={`rounded-full px-4 py-2 text-sm font-black ${tab === "people" ? "bg-[#4f8124] text-white" : "bg-[#edf7df] text-[#4f8124]"}`}
          >
            Lifetopians
          </Link>
        </nav>
      </Card>

      {results ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {tab === "people"
            ? profiles.map((person) => (
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
              ))
            : posts.map((post) => (
                <Card key={post.id} className="p-5">
                  <Link
                    href={`/user/${encodeURIComponent(post.username)}`}
                    className="flex items-center gap-3"
                  >
                    <Avatar
                      initials={post.displayName.charAt(0)}
                      src={post.avatarSrc}
                      alt={post.displayName}
                      size={44}
                    />
                    <div>
                      <h2 className="font-black text-[#2f2418]">{post.displayName}</h2>
                      <p className="text-xs font-bold text-[#7a5635]">
                        @{post.username} · {post.createdAt}
                      </p>
                    </div>
                  </Link>
                  <p className="mt-4 whitespace-pre-wrap font-semibold leading-7 text-[#2f2418]">
                    {post.content}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-xs font-black text-[#7a5635]">
                    <span className="rounded-full bg-[#e8f3ff] px-3 py-1 text-[#2f73c9]">
                      {post.category}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Heart size={14} />
                      {post.likesCount}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MessageCircle size={14} />
                      {post.commentsCount}
                    </span>
                  </div>
                </Card>
              ))}
        </div>
      ) : (
        <EmptyState
          title="No results found"
          description={
            query
              ? `No public ${tab} matched “${query}”. Try another word.`
              : `There are no public ${tab} to show yet.`
          }
          icon={tab === "people" ? Users : Compass}
        />
      )}

      <nav aria-label="Explore pagination" className="flex items-center justify-between">
        <span className="text-sm font-bold text-[#7a5635]">Page {page}</span>
        <div className="flex gap-2">
          {page > 1 ? (
            <Link
              href={href(page - 1)}
              className="rounded-full border border-[#ead9b8] bg-white px-4 py-2 font-black text-[#7a5635]"
            >
              Previous
            </Link>
          ) : null}
          {hasNext ? (
            <Link
              href={href(page + 1)}
              className="rounded-full bg-[#4f8124] px-4 py-2 font-black text-white"
            >
              Next
            </Link>
          ) : null}
        </div>
      </nav>
    </div>
  );
}
