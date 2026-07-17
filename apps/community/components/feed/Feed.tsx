import {
  AlertCircle,
  Hash,
  Sprout,
  X,
} from "lucide-react";
import Link from "next/link";

import { getCommunityPosts } from "@/data/community/posts";

import { CreatePost } from "./CreatePost";
import { FeedPagination } from "./FeedPagination";
import { PostCard } from "./PostCard";

type FeedProps = {
  page?: number;
  tag?: string | null;
};

export async function Feed({
  page = 1,
  tag,
}: FeedProps) {
  const result =
    await getCommunityPosts(page, tag);

  return (
    <>
      <CreatePost />

      {result.activeTag ? (
        <div className="mt-4 flex items-center justify-between gap-3 rounded-[18px] border border-[#bddceb] bg-[#eef8ff] px-4 py-3">
          <div className="flex min-w-0 items-center gap-2 text-sm font-black text-[#347ba5]">
            <Hash size={17} />
            <span className="truncate">
              Showing #{result.activeTag}
            </span>
          </div>

          <Link
            href="/"
            aria-label="Clear hashtag filter"
            className="grid size-8 shrink-0 place-items-center rounded-full bg-white/80 text-[#347ba5] hover:bg-white"
          >
            <X size={15} />
          </Link>
        </div>
      ) : null}

      {result.error ? (
        <div
          role="alert"
          className="mt-4 rounded-[24px] border border-[#edc4b7] bg-[#fff5f1] p-6 text-center"
        >
          <span className="mx-auto grid size-11 place-items-center rounded-2xl bg-white text-[#b85b42] shadow-sm">
            <AlertCircle size={21} />
          </span>

          <h2 className="mt-3 text-lg font-black text-[#633c31]">
            Feed temporarily unavailable
          </h2>

          <p className="mx-auto mt-2 max-w-lg text-sm font-semibold leading-6 text-[#8a6257]">
            {result.error} Refresh the page
            in a moment.
          </p>
        </div>
      ) : result.posts.length ? (
        <>
          <div className="mt-4 space-y-4">
            {result.posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
              />
            ))}
          </div>

          <FeedPagination
            page={result.page}
            totalPages={result.totalPages}
            tag={result.activeTag}
          />
        </>
      ) : (
        <div className="mt-4 rounded-[24px] border border-[#dce9c9] bg-[linear-gradient(135deg,#fffdf5,#eff8e8)] p-7 text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-2xl border border-[#cde2ba] bg-white text-[#5f913f] shadow-sm">
            <Sprout size={22} />
          </span>

          <h2 className="mt-3 text-lg font-black text-[#385126]">
            {result.activeTag
              ? `No posts found for #${result.activeTag}`
              : "Be the first to share"}
          </h2>

          <p className="mx-auto mt-2 max-w-lg text-sm font-semibold leading-6 text-[#6f7f5f]">
            {result.activeTag
              ? "Try another hashtag or return to the complete community feed."
              : "The Lifetopia feed is ready for its next story, question, guide, or community moment."}
          </p>
        </div>
      )}
    </>
  );
}
