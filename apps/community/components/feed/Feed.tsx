import {
  AlertCircle,
  Sprout,
} from "lucide-react";

import { getCommunityPosts } from "@/data/community/posts";

import { CreatePost } from "./CreatePost";
import { FeedPagination } from "./FeedPagination";
import { PostCard } from "./PostCard";

type FeedProps = {
  page?: number;
};

export async function Feed({
  page = 1,
}: FeedProps) {
  const result =
    await getCommunityPosts(page);

  return (
    <>
      <CreatePost />

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
            totalPages={
              result.totalPages
            }
          />
        </>
      ) : (
        <div className="mt-4 rounded-[24px] border border-[#dce9c9] bg-[linear-gradient(135deg,#fffdf5,#eff8e8)] p-7 text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-2xl border border-[#cde2ba] bg-white text-[#5f913f] shadow-sm">
            <Sprout size={22} />
          </span>

          <h2 className="mt-3 text-lg font-black text-[#385126]">
            Be the first to share
          </h2>

          <p className="mx-auto mt-2 max-w-lg text-sm font-semibold leading-6 text-[#6f7f5f]">
            The Lifetopia feed is ready for
            its next story, question, guide,
            or community moment.
          </p>
        </div>
      )}
    </>
  );
}
