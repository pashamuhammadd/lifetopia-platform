"use client";

import {
  Bookmark,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";
import {
  useOptimistic,
  useTransition,
} from "react";

import { toggleCommunityBookmark } from "@/app/actions/community/bookmarks";
import { toggleCommunityLike } from "@/app/actions/community/likes";
import { useGuestAuth } from "@/components/auth/GuestAuthProvider";

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
  const {
    isAuthenticated,
    requestAuth,
  } = useGuestAuth();

  const [
    isLikePending,
    startLikeTransition,
  ] = useTransition();

  const [
    isBookmarkPending,
    startBookmarkTransition,
  ] = useTransition();

  const [
    optimisticLike,
    toggleOptimisticLike,
  ] = useOptimistic(
    {
      active: isLiked,
      count: likes,
    },
    (
      state: ToggleState,
      action: "toggle",
    ) => {
      if (action !== "toggle") {
        return state;
      }

      return {
        active: !state.active,
        count: state.active
          ? Math.max(
              0,
              (state.count ?? 0) - 1,
            )
          : (state.count ?? 0) + 1,
      };
    },
  );

  const [
    optimisticBookmark,
    toggleOptimisticBookmark,
  ] = useOptimistic(
    {
      active: isBookmarked,
    },
    (
      state: ToggleState,
      action: "toggle",
    ) => {
      if (action !== "toggle") {
        return state;
      }

      return {
        active: !state.active,
      };
    },
  );

  function requireAuthentication() {
    if (isAuthenticated) {
      return false;
    }

    requestAuth();
    return true;
  }

  function handleLike() {
    if (requireAuthentication()) {
      return;
    }

    startLikeTransition(async () => {
      toggleOptimisticLike("toggle");
      await toggleCommunityLike(postId);
    });
  }

  function handleComment() {
    if (requireAuthentication()) {
      return;
    }

    const commentInput =
      document.getElementById(
        `comment-input-${postId}`,
      );

    commentInput?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    window.setTimeout(() => {
      commentInput?.focus();
    }, 250);
  }

  function handleBookmark() {
    if (requireAuthentication()) {
      return;
    }

    startBookmarkTransition(async () => {
      toggleOptimisticBookmark("toggle");
      await toggleCommunityBookmark(
        postId,
      );
    });
  }

  async function handleShare() {
    const postUrl = `${window.location.origin}${window.location.pathname}#post-${postId}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title:
            "Lifetopia Community Post",
          text:
            "View this post on Lifetopia Community.",
          url: postUrl,
        });

        return;
      }

      await navigator.clipboard.writeText(
        postUrl,
      );
    } catch {
      // Sharing may be cancelled by the user.
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-5 border-t border-[#f2e7c8] py-4 sm:gap-6">
      <button
        type="button"
        onClick={handleLike}
        disabled={isLikePending}
        aria-label={
          optimisticLike.active
            ? "Remove like"
            : "Like post"
        }
        className="flex min-h-10 items-center gap-2 text-sm font-black text-[#7a5635] transition hover:text-[#4f8124] disabled:opacity-70"
      >
        <Heart
          size={18}
          className={
            optimisticLike.active
              ? "fill-red-500 text-red-500"
              : ""
          }
        />

        <span>
          {optimisticLike.count ?? 0}
        </span>
      </button>

      <button
        type="button"
        onClick={handleComment}
        aria-label="Write a comment"
        className="flex min-h-10 items-center gap-2 text-sm font-black text-[#7a5635] transition hover:text-[#4f8124]"
      >
        <MessageCircle size={18} />
        <span>{comments}</span>
      </button>

      <button
        type="button"
        onClick={handleBookmark}
        disabled={isBookmarkPending}
        aria-label={
          optimisticBookmark.active
            ? "Remove bookmark"
            : "Bookmark post"
        }
        className="ml-auto flex min-h-10 items-center gap-2 text-sm font-black text-[#7a5635] transition hover:text-[#4f8124] disabled:opacity-70"
      >
        <Bookmark
          size={18}
          className={
            optimisticBookmark.active
              ? "fill-[#4f8124] text-[#4f8124]"
              : ""
          }
        />

        <span>
          {optimisticBookmark.active
            ? "Saved"
            : "Save"}
        </span>
      </button>

      <button
        type="button"
        onClick={handleShare}
        aria-label="Share post"
        className="flex min-h-10 items-center gap-2 text-sm font-black text-[#7a5635] transition hover:text-[#4f8124]"
      >
        <Share2 size={18} />
        <span>Share</span>
      </button>
    </div>
  );
}