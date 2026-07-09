import { Avatar } from "@/components/ui/Avatar";

type Props = {
  author: string;
  username: string;
  avatar: string;
  content: string;
  createdAt: string;
};

export function CommentItem({
  author,
  username,
  avatar,
  content,
  createdAt,
}: Props) {
  return (
    <div className="flex gap-3">
      <Avatar
        src={avatar}
        initials={author.charAt(0)}
        alt={author}
        size={40}
      />

      <div className="min-w-0 flex-1 rounded-2xl bg-[#fffaf0] p-3">
        <div className="flex items-center gap-2">
          <p className="font-black text-[#2f2418]">{author}</p>

          <span className="text-xs font-bold text-[#9b6635]">
            {username}
          </span>

          <span className="ml-auto text-xs font-bold text-[#9b6635]">
            {createdAt}
          </span>
        </div>

        <p className="mt-1 text-sm font-bold leading-6 text-[#7a5635]">
          {content}
        </p>
      </div>
    </div>
  );
}