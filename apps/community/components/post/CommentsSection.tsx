import type { CommunityComment } from "@/data/community/comments";

import { CommentComposer } from "./CommentComposer";
import { CommentItem } from "./CommentItem";

type CommentsSectionProps = {
  postId: string;
  comments: CommunityComment[];
};

export function CommentsSection({ postId, comments }: CommentsSectionProps) {
  return (
    <div className="space-y-4 border-t border-[#ead9b8] pt-5">
      <CommentComposer postId={postId} />

      {comments.length > 0 ? (
        <div className="space-y-3">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      ) : null}
    </div>
  );
}