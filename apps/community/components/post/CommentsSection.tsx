import { comments } from "@/data/comments";

import { CommentComposer } from "./CommentComposer";
import { CommentItem } from "./CommentItem";

export function CommentsSection() {
  return (
    <div className="space-y-4 border-t border-[#ead9b8] pt-5">
      <CommentComposer />

      <div className="space-y-3">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            {...comment}
          />
        ))}
      </div>
    </div>
  );
}