import { MessageCircle } from "lucide-react";

import type { PublicProfilePost } from "@/data/profile/public-profile";

import { SectionCard } from "@/components/ui/SectionCard";

type ProfilePostsProps = {
  posts: PublicProfilePost[];
};

export function ProfilePosts({ posts }: ProfilePostsProps) {
  return (
    <SectionCard
      title="Recent Posts"
      description="Latest public updates from this Lifetopian."
      icon={MessageCircle}
    >
      {posts.length === 0 ? (
        <div className="rounded-[22px] bg-[#fffaf0] p-5">
          <p className="font-black text-[#2f2418]">No posts yet.</p>
          <p className="mt-1 text-sm font-bold text-[#7a5635]">
            This Lifetopian has not posted anything yet.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-[22px] bg-[#fffaf0] p-4 transition hover:bg-white"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#e8f3ff] px-3 py-1 text-[11px] font-black text-[#2f73c9]">
                  {post.category}
                </span>

                <span className="text-xs font-bold text-[#9b6635]">
                  {post.createdAt}
                </span>
              </div>

              <p className="mt-2 text-sm font-bold leading-6 text-[#7a5635]">
                {post.content}
              </p>
            </article>
          ))}
        </div>
      )}
    </SectionCard>
  );
}