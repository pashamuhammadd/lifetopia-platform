"use client";

import {
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  useState,
  useTransition,
} from "react";

import {
  deleteCommunityPost,
  updateCommunityPost,
  type CommunityPostActionState,
} from "@/app/actions/community/posts";
import { ReportTrigger } from "@/components/report/ReportTrigger";
import { Button } from "@/components/ui/Button";
import { POST_CONTENT_MAX_LENGTH } from "@/types/post";

type PostMenuProps = {
  postId: string;
  content: string;
  isOwner: boolean;
};

const initialState: CommunityPostActionState = {
  success: false,
  message: "",
};

export function PostMenu({
  postId,
  content,
  isOwner,
}: PostMenuProps) {
  const [isEditing, setIsEditing] =
    useState(false);

  const [editState, setEditState] =
    useState<CommunityPostActionState>(
      initialState,
    );

  const [deleteMessage, setDeleteMessage] =
    useState("");

  const [
    isEditingPending,
    startEditTransition,
  ] = useTransition();

  const [
    isDeleting,
    startDeleteTransition,
  ] = useTransition();

  function openEditModal() {
    setEditState(initialState);
    setIsEditing(true);
  }

  function closeEditModal() {
    if (isEditingPending) {
      return;
    }

    setEditState(initialState);
    setIsEditing(false);
  }

  function handleEdit(
    formData: FormData,
  ) {
    startEditTransition(async () => {
      const result =
        await updateCommunityPost(
          initialState,
          formData,
        );

      setEditState(result);

      if (result.success) {
        setIsEditing(false);
      }
    });
  }

  function handleDelete() {
    if (!confirm("Delete this post?")) {
      return;
    }

    setDeleteMessage("");

    startDeleteTransition(async () => {
      const result =
        await deleteCommunityPost(postId);

      setDeleteMessage(result.message);
    });
  }

  return (
    <div className="relative">
      <details>
        <summary
          className="grid size-9 cursor-pointer list-none place-items-center rounded-full text-[#8a6b47] transition hover:bg-[#fff4dc]"
          aria-label="Open post options"
        >
          <MoreHorizontal size={18} />
        </summary>

        <div className="absolute right-0 top-11 z-20 w-44 rounded-[18px] border border-[#ead9b8] bg-white p-2 shadow-[0_18px_45px_rgba(88,60,28,0.14)]">
          {isOwner ? (
            <>
              <button
                type="button"
                onClick={openEditModal}
                className="flex w-full items-center gap-2 rounded-[14px] px-3 py-2 text-left text-sm font-black text-[#7a5635] hover:bg-[#fffaf0]"
              >
                <Pencil size={15} />
                Edit
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex w-full items-center gap-2 rounded-[14px] px-3 py-2 text-left text-sm font-black text-[#c24141] hover:bg-[#fff0f0] disabled:opacity-60"
              >
                <Trash2 size={15} />

                {isDeleting
                  ? "Deleting..."
                  : "Delete"}
              </button>
            </>
          ) : (
            <ReportTrigger
              targetType="post"
              targetId={postId}
            />
          )}
        </div>
      </details>

      {deleteMessage ? (
        <p className="absolute right-0 top-24 z-20 w-48 rounded-[14px] bg-white px-3 py-2 text-xs font-black text-[#7a5635] shadow">
          {deleteMessage}
        </p>
      ) : null}

      {isEditing ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeEditModal();
            }
          }}
        >
          <form
            action={handleEdit}
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-post-title"
            className="w-full max-w-lg rounded-[28px] border border-[#ead9b8] bg-white p-5 shadow-[0_24px_70px_rgba(0,0,0,0.18)]"
          >
            <input
              type="hidden"
              name="postId"
              value={postId}
            />

            <h2
              id="edit-post-title"
              className="text-xl font-black text-[#2f2418]"
            >
              Edit Post
            </h2>

            <textarea
              name="content"
              defaultValue={content}
              required
              maxLength={
                POST_CONTENT_MAX_LENGTH
              }
              className="mt-4 min-h-36 w-full resize-none rounded-[20px] border border-[#ead9b8] bg-[#fffaf0] p-4 text-sm font-bold text-[#2f2418] outline-none focus:border-[#6fa83a]"
            />

            {editState.message &&
            !editState.success ? (
              <p className="mt-3 rounded-[16px] bg-[#fff0f0] px-4 py-2 text-sm font-black text-[#c24141]">
                {editState.message}
              </p>
            ) : null}

            <div className="mt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeEditModal}
                disabled={
                  isEditingPending
                }
                className="rounded-full bg-[#fffaf0] px-5 py-2.5 text-sm font-black text-[#7a5635] disabled:opacity-60"
              >
                Cancel
              </button>

              <Button
                disabled={
                  isEditingPending
                }
              >
                {isEditingPending
                  ? "Saving..."
                  : "Save"}
              </Button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
