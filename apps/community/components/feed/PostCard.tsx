import { MoreHorizontal } from "lucide-react";

import { CommentsSection } from "@/components/post/CommentsSection";
import { PostActions } from "@/components/post/PostActions";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { categoryStyles, roleStyles, titleStyles } from "@/data/identity";
import type { Post } from "@/types/post";

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  const roleStyle = roleStyles[post.role];
  const RoleIcon = roleStyle.icon;

  const titleStyle = post.title ? titleStyles[post.title] : null;
  const TitleIcon = titleStyle?.icon;

  const categoryStyle = categoryStyles[post.category];

  return (
    <Card className="p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(88,60,28,0.16)]">
      <div className="flex items-start gap-4">
        <Avatar
          initials={post.displayName.charAt(0)}
          src={post.avatarSrc}
          alt={post.displayName}
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-black text-[#2f2418]">
                  {post.displayName}
                </h3>

                <span className="text-sm font-semibold text-[#7a5635]">
                  {post.username}
                </span>

                <span className="text-xs font-semibold text-[#9b6635]">
                  • {post.createdAt}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-black ${roleStyle.className}`}
                >
                  <RoleIcon size={12} />
                  {post.role}
                </span>

                {post.title && titleStyle && TitleIcon ? (
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-black ${titleStyle.className}`}
                  >
                    <TitleIcon size={12} />
                    {post.title}
                  </span>
                ) : null}

                <span
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-black ${categoryStyle.className}`}
                >
                  {post.category}
                </span>
              </div>
            </div>

            <button className="grid size-9 shrink-0 place-items-center rounded-full text-[#8a6b47] transition hover:bg-[#fff4dc]">
              <MoreHorizontal size={18} />
            </button>
          </div>

          <p className="mt-4 whitespace-pre-line text-[15px] font-semibold leading-7 text-[#2f2418]">
            {post.content}
          </p>

          <PostActions
            likes={post.likes}
            comments={post.comments}
          />

          <CommentsSection />
        </div>
      </div>
    </Card>
  );
}