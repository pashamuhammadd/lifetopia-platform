"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import {
  deleteCommunityPost,
  updateCommunityPost,
  type CommunityPostActionState,
} from "@/app/actions/community/posts";
import { Button } from "@/components/ui/Button";

type PostMenuProps = {
  postId: string;
  content: string;
  isOwner: boolean;
};

const initialState: CommunityPostActionState = {
  success: false,
  message: "",
};

export function PostMenu({ postId, content, isOwner }: PostMenuProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [isDeleting, startDeleteTransition] = useTransition();

  const [editState, editAction, isEditingPending] = useActionState(
    updateCommunityPost,
    initialState,
  );

  useEffect(() => {
    if (editState.success) setIsEditing(false);
  }, [editState.success]);

  if (!isOwner) {
    return (
      <button className="grid size-9 shrink-0 place-items-center rounded-full text-[#8a6b47] transition hover:bg-[#fff4dc]">
        <MoreHorizontal size={18} />
      </button>
    );
  }

  function handleDelete() {
    if (!confirm("Delete this post?")) return;

    setDeleteMessage("");

    startDeleteTransition(async () => {
      const result = await deleteCommunityPost(postId);
      setDeleteMessage(result.message);
    });
  }

  return (
    <div className="relative">
      <details>
        <summary className="grid size-9 cursor-pointer list-none place-items-center rounded-full text-[#8a6b47] transition hover:bg-[#fff4dc]">
          <MoreHorizontal size={18} />
        </summary>

        <div className="absolute right-0 top-11 z-20 w-40 rounded-[18px] border border-[#ead9b8] bg-white p-2 shadow-[0_18px_45px_rgba(88,60,28,0.14)]">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
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
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </details>

      {deleteMessage ? (
        <p className="absolute right-0 top-24 z-20 w-48 rounded-[14px] bg-white px-3 py-2 text-xs font-black text-[#7a5635] shadow">
          {deleteMessage}
        </p>
      ) : null}

      {isEditing ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4">
          <form
            action={editAction}
            className="w-full max-w-lg rounded-[28px] border border-[#ead9b8] bg-white p-5 shadow-[0_24px_70px_rgba(0,0,0,0.18)]"
          >
            <input type="hidden" name="postId" value={postId} />

            <h2 className="text-xl font-black text-[#2f2418]">Edit Post</h2>

            <textarea
              name="content"
              defaultValue={content}
              required
              className="mt-4 min-h-36 w-full resize-none rounded-[20px] border border-[#ead9b8] bg-[#fffaf0] p-4 text-sm font-bold text-[#2f2418] outline-none focus:border-[#6fa83a]"
            />

            {editState.message ? (
              <p
                className={`mt-3 rounded-[16px] px-4 py-2 text-sm font-black ${
                  editState.success
                    ? "bg-[#edf7df] text-[#4f8124]"
                    : "bg-[#fff0f0] text-[#c24141]"
                }`}
              >
                {editState.message}
              </p>
            ) : null}

            <div className="mt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-full bg-[#fffaf0] px-5 py-2.5 text-sm font-black text-[#7a5635]"
              >
                Cancel
              </button>

              <Button disabled={isEditingPending}>
                {isEditingPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}