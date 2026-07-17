"use client";

import { MessageCircleReply } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { useGuestAuth } from "@/components/auth/GuestAuthProvider";
import { RichCommunityText } from "@/components/community/RichCommunityText";
import { Avatar } from "@/components/ui/Avatar";
import type { CommunityComment } from "@/data/community/comments";

import { CommentComposer } from "./CommentComposer";

type CommentItemProps = {
  comment: CommunityComment;
  depth?: number;
};

export function CommentItem({
  comment,
  depth = 0,
}: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const {
    isAuthenticated,
    requestAuth,
  } = useGuestAuth();

  const profileHref = `/user/${comment.author.username}`;
  const canReply = depth < 3;

  function handleReply() {
    if (!isAuthenticated) {
      requestAuth();
      return;
    }

    setIsReplying(true);
  }

  return (
    <div
      className={
        depth > 0
          ? "border-l-2 border-[#e4d7bd] pl-3 sm:pl-4"
          : ""
      }
    >
      <div className="flex gap-2.5 sm:gap-3">
        <Link href={profileHref} className="shrink-0">
          <Avatar
            src={comment.author.avatarSrc}
            initials={comment.author.displayName.charAt(0)}
            alt={comment.author.displayName}
            size={depth > 0 ? 34 : 40}
          />
        </Link>

        <div className="min-w-0 flex-1">
          <div className="rounded-2xl bg-[#fffaf0] p-3">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <Link
                href={profileHref}
                className="font-black text-[#2f2418] hover:text-[#4f8124]"
              >
                {comment.author.displayName}
              </Link>

              <Link
                href={profileHref}
                className="text-xs font-bold text-[#9b6635] hover:text-[#4f8124]"
              >
                @{comment.author.username}
              </Link>

              <time
                dateTime={comment.createdAtIso}
                className="ml-auto text-xs font-bold text-[#9b6635]"
              >
                {comment.createdAt}
              </time>
            </div>

            <p className="mt-1 whitespace-pre-wrap break-words text-sm font-bold leading-6 text-[#7a5635]">
              <RichCommunityText content={comment.content} />
            </p>
          </div>

          {canReply ? (
            <button
              type="button"
              onClick={handleReply}
              className="mt-1.5 inline-flex min-h-8 items-center gap-1.5 px-2 text-xs font-black text-[#6d7f55] transition hover:text-[#4f8124]"
            >
              <MessageCircleReply size={14} />
              Reply
            </button>
          ) : null}

          {isReplying ? (
            <div className="mt-2">
              <CommentComposer
                postId={comment.postId}
                parentCommentId={comment.id}
                replyingTo={comment.author.username}
                autoFocus
                onCancel={() => setIsReplying(false)}
              />
            </div>
          ) : null}
        </div>
      </div>

      {comment.replies.length ? (
        <div className="ml-5 mt-3 space-y-3 sm:ml-7">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              depth={depth + 1}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
