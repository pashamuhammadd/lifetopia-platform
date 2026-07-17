"use client";

import { Send } from "lucide-react";
import {
  useActionState,
  useEffect,
  useRef,
} from "react";

import {
  createCommunityComment,
  type CommunityCommentActionState,
} from "@/app/actions/community/comments";
import { useGuestAuth } from "@/components/auth/GuestAuthProvider";
import { Button } from "@/components/ui/Button";

type CommentComposerProps = {
  postId: string;
};

const initialState: CommunityCommentActionState =
  {
    success: false,
    message: "",
  };

export function CommentComposer({
  postId,
}: CommentComposerProps) {
  const formRef =
    useRef<HTMLFormElement>(null);

  const {
    isAuthenticated,
    requestAuth,
  } = useGuestAuth();

  const [
    state,
    formAction,
    isPending,
  ] = useActionState(
    createCommunityComment,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  function requestLoginForGuest() {
    if (isAuthenticated) {
      return;
    }

    requestAuth();
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={(event) => {
        if (!isAuthenticated) {
          event.preventDefault();
          requestAuth();
        }
      }}
      className="space-y-2"
    >
      <input
        type="hidden"
        name="postId"
        value={postId}
      />

      <div className="flex gap-3">
        <input
          id={`comment-input-${postId}`}
          name="content"
          required
          maxLength={500}
          readOnly={!isAuthenticated}
          onClick={requestLoginForGuest}
          onFocus={requestLoginForGuest}
          placeholder={
            isAuthenticated
              ? "Write a comment..."
              : "Login to join the conversation..."
          }
          className="h-11 min-w-0 flex-1 rounded-full border border-[#ead9b8] bg-[#fffaf0] px-5 text-sm font-bold outline-none transition focus:border-[#6fa83a] focus:bg-white"
        />

        <Button
          disabled={
            isPending ||
            !isAuthenticated
          }
          className="rounded-full px-5"
          aria-label="Send comment"
        >
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