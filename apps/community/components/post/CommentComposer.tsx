"use client";

import { useActionState, useEffect, useRef } from "react";
import { Send } from "lucide-react";

import {
  createCommunityComment,
  type CommunityCommentActionState,
} from "@/app/actions/community/comments";
import { Button } from "@/components/ui/Button";

type CommentComposerProps = {
  postId: string;
};

const initialState: CommunityCommentActionState = {
  success: false,
  message: "",
};

export function CommentComposer({ postId }: CommentComposerProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(
    createCommunityComment,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="space-y-2">
      <input type="hidden" name="postId" value={postId} />

      <div className="flex gap-3">
        <input
          name="content"
          required
          placeholder="Write a comment..."
          className="h-11 flex-1 rounded-full border border-[#ead9b8] bg-[#fffaf0] px-5 text-sm font-bold outline-none focus:border-[#6fa83a]"
        />

        <Button disabled={isPending} className="rounded-full px-5">
          <Send size={17} />
        </Button>
      </div>

      {state.message ? (
        <p
          className={`rounded-[14px] px-3 py-2 text-xs font-black ${
            state.success
              ? "bg-[#edf7df] text-[#4f8124]"
              : "bg-[#fff0f0] text-[#c24141]"
          }`}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}