import Link from "next/link";

import type { CommunityComment } from "@/data/community/comments";

import { Avatar } from "@/components/ui/Avatar";

type CommentItemProps = {
  comment: CommunityComment;
};

export function CommentItem({ comment }: CommentItemProps) {
  const profileHref = `/user/${comment.author.username}`;

  return (
    <div className="flex gap-3">
      <Link href={profileHref} className="shrink-0">
        <Avatar
          src={comment.author.avatarSrc}
          initials={comment.author.displayName.charAt(0)}
          alt={comment.author.displayName}
          size={40}
        />
      </Link>

      <div className="min-w-0 flex-1 rounded-2xl bg-[#fffaf0] p-3">
        <div className="flex flex-wrap items-center gap-2">
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

          <span className="ml-auto text-xs font-bold text-[#9b6635]">
            {comment.createdAt}
          </span>
        </div>

        <p className="mt-1 text-sm font-bold leading-6 text-[#7a5635]">
          {comment.content}
        </p>
      </div>
    </div>
  );
}