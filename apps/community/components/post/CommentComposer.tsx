"use client";

import { Send, X } from "lucide-react";
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
import { COMMENT_CONTENT_MAX_LENGTH } from "@/types/post";

type CommentComposerProps = {
  postId: string;
  parentCommentId?: string;
  replyingTo?: string;
  autoFocus?: boolean;
  onCancel?: () => void;
};

const initialState: CommunityCommentActionState = {
  success: false,
  message: "",
};

export function CommentComposer({
  postId,
  parentCommentId,
  replyingTo,
  autoFocus = false,
  onCancel,
}: CommentComposerProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    if (autoFocus && isAuthenticated) {
      inputRef.current?.focus();
    }
  }, [autoFocus, isAuthenticated]);

  useEffect(() => {
    if (!state.success) {
      return;
    }

    formRef.current?.reset();
    onCancel?.();
  }, [onCancel, state.success]);

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

      {parentCommentId ? (
        <input
          type="hidden"
          name="parentCommentId"
          value={parentCommentId}
        />
      ) : null}

      {replyingTo ? (
        <div className="flex items-center justify-between gap-3 rounded-[14px] border border-[#d7e7c6] bg-[#f2faeb] px-3 py-2 text-xs font-black text-[#527d40]">
          <span className="truncate">
            Replying to @{replyingTo}
          </span>

          {onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              aria-label="Cancel reply"
              className="grid size-7 shrink-0 place-items-center rounded-full hover:bg-white"
            >
              <X size={14} />
            </button>
          ) : null}
        </div>
      ) : null}

      <div className="flex gap-2 sm:gap-3">
        <input
          ref={inputRef}
          id={
            parentCommentId
              ? `reply-input-${parentCommentId}`
              : `comment-input-${postId}`
          }
          name="content"
          required
          maxLength={COMMENT_CONTENT_MAX_LENGTH}
          readOnly={!isAuthenticated}
          onClick={requestLoginForGuest}
          onFocus={requestLoginForGuest}
          placeholder={
            isAuthenticated
              ? parentCommentId
                ? "Write a reply..."
                : "Write a comment..."
              : "Login to join the conversation..."
          }
          className="h-11 min-w-0 flex-1 rounded-full border border-[#ead9b8] bg-[#fffaf0] px-4 text-sm font-bold outline-none transition focus:border-[#6fa83a] focus:bg-white sm:px-5"
        />

        <Button
          disabled={isPending || !isAuthenticated}
          className="grid size-11 shrink-0 place-items-center rounded-full p-0"
          aria-label={parentCommentId ? "Send reply" : "Send comment"}
        >
          <Send size={17} />
        </Button>
      </div>

      {state.message ? (
        <p
          role={state.success ? "status" : "alert"}
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
