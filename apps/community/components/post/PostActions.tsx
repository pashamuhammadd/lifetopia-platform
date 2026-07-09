"use client";

import { useOptimistic, useTransition } from "react";
import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";

import { toggleCommunityBookmark } from "@/app/actions/community/bookmarks";
import { toggleCommunityLike } from "@/app/actions/community/likes";

type PostActionsProps = {
  postId: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
};

type ToggleState = {
  active: boolean;
  count?: number;
};

export function PostActions({
  postId,
  likes,
  comments,
  isLiked,
  isBookmarked,
}: PostActionsProps) {
  const [isLikePending, startLikeTransition] = useTransition();
  const [isBookmarkPending, startBookmarkTransition] = useTransition();

  const [optimisticLike, toggleOptimisticLike] = useOptimistic(
    {
      active: isLiked,
      count: likes,
    },
    (state: ToggleState, action: "toggle") => {
      if (action !== "toggle") return state;

      return {
        active: !state.active,
        count: state.active ? (state.count ?? 0) - 1 : (state.count ?? 0) + 1,
      };
    },
  );

  const [optimisticBookmark, toggleOptimisticBookmark] = useOptimistic(
    {
      active: isBookmarked,
    },
    (state: ToggleState, action: "toggle") => {
      if (action !== "toggle") return state;

      return {
        active: !state.active,
      };
    },
  );

  function handleLike() {
    toggleOptimisticLike("toggle");

    startLikeTransition(async () => {
      await toggleCommunityLike(postId);
    });
  }

  function handleBookmark() {
    toggleOptimisticBookmark("toggle");

    startBookmarkTransition(async () => {
      await toggleCommunityBookmark(postId);
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-6 border-t border-[#f2e7c8] py-4">
      <button
        type="button"
        onClick={handleLike}
        disabled={isLikePending}
        className="flex items-center gap-2 text-sm font-black text-[#7a5635] transition hover:text-[#4f8124] disabled:opacity-70"
      >
        <Heart
          size={18}
          className={
            optimisticLike.active ? "fill-red-500 text-red-500" : ""
          }
        />

        <span>{optimisticLike.count ?? 0}</span>
      </button>

      <button
        type="button"
        className="flex items-center gap-2 text-sm font-black text-[#7a5635] transition hover:text-[#4f8124]"
      >
        <MessageCircle size={18} />
        <span>{comments}</span>
      </button>

      <button
        type="button"
        onClick={handleBookmark}
        disabled={isBookmarkPending}
        className="ml-auto flex items-center gap-2 text-sm font-black text-[#7a5635] transition hover:text-[#4f8124] disabled:opacity-70"
      >
        <Bookmark
          size={18}
          className={
            optimisticBookmark.active
              ? "fill-[#4f8124] text-[#4f8124]"
              : ""
          }
        />
        <span>{optimisticBookmark.active ? "Saved" : "Save"}</span>
      </button>

      <button
        type="button"
        className="flex items-center gap-2 text-sm font-black text-[#7a5635] transition hover:text-[#4f8124]"
      >
        <Share2 size={18} />
        <span>Share</span>
      </button>
    </div>
  );
}