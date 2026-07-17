import Link from "next/link";

import { CommentsSection } from "@/components/post/CommentsSection";
import { PostActions } from "@/components/post/PostActions";
import { PostMenu } from "@/components/post/PostMenu";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import {
  categoryStyles,
  roleStyles,
} from "@/data/identity";
import type { CommunityPost } from "@/types/community-post";

type PostCardProps = {
  post: CommunityPost;
};

export function PostCard({
  post,
}: PostCardProps) {
  const profileHref = `/user/${post.author.username}`;

  const roleStyle =
    roleStyles[post.author.role];
  const RoleIcon = roleStyle.icon;

  const categoryStyle =
    categoryStyles[post.category];
  const CategoryIcon =
    categoryStyle.icon;

  return (
    <article id={`post-${post.id}`}>
      <Card className="p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(88,60,28,0.16)] sm:p-5">
        <div className="flex items-start gap-3 sm:gap-4">
          <Link
            href={profileHref}
            className="shrink-0"
          >
            <Avatar
              initials={post.author.displayName.charAt(
                0,
              )}
              src={post.author.avatarSrc}
              alt={post.author.displayName}
            />
          </Link>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <Link
                    href={profileHref}
                    className="font-black text-[#2f2418] hover:text-[#4f8124]"
                  >
                    {post.author.displayName}
                  </Link>

                  <Link
                    href={profileHref}
                    className="text-sm font-semibold text-[#7a5635] hover:text-[#4f8124]"
                  >
                    @{post.author.username}
                  </Link>

                  <time className="text-xs font-semibold text-[#9b6635]">
                    · {post.createdAt}
                  </time>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-black ${roleStyle.className}`}
                  >
                    <RoleIcon size={12} />
                    {post.author.role}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-black ${categoryStyle.className}`}
                  >
                    <CategoryIcon size={12} />
                    {post.category}
                  </span>
                </div>
              </div>

              <PostMenu
                postId={post.id}
                content={post.content}
                isOwner={post.isOwner}
              />
            </div>

            <p className="mt-4 whitespace-pre-line break-words text-[15px] font-semibold leading-7 text-[#2f2418]">
              {post.content}
            </p>

            <PostActions
              postId={post.id}
              likes={post.likes}
              comments={post.comments}
              isLiked={post.isLiked}
              isBookmarked={
                post.isBookmarked
              }
            />

            <CommentsSection
              postId={post.id}
              comments={post.commentItems}
            />
          </div>
        </div>
      </Card>
    </article>
  );
}
