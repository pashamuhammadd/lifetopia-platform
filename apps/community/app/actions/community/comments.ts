"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@repo/lib/supabase/server";

import { COMMENT_CONTENT_MAX_LENGTH } from "@/types/post";

export type CommunityCommentActionState = {
  success: boolean;
  message: string;
};

function revalidateCommunityPost(postId: string) {
  revalidatePath("/");
  revalidatePath(`/post/${postId}`);
}

export async function createCommunityComment(
  _previousState: CommunityCommentActionState,
  formData: FormData,
): Promise<CommunityCommentActionState> {
  const postId = String(formData.get("postId") ?? "").trim();
  const parentCommentId =
    String(formData.get("parentCommentId") ?? "").trim() || null;
  const content = String(formData.get("content") ?? "").trim();

  if (!postId) {
    return {
      success: false,
      message: "This post could not be identified.",
    };
  }

  if (!content) {
    return {
      success: false,
      message: "Comment cannot be empty.",
    };
  }

  if (content.length > COMMENT_CONTENT_MAX_LENGTH) {
    return {
      success: false,
      message: `Comments can contain up to ${COMMENT_CONTENT_MAX_LENGTH} characters.`,
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "You must login before commenting.",
    };
  }

  if (parentCommentId) {
    const { data: parentComment, error: parentError } = await supabase
      .from("community_comments")
      .select("id, post_id")
      .eq("id", parentCommentId)
      .maybeSingle();

    if (
      parentError ||
      !parentComment ||
      parentComment.post_id !== postId
    ) {
      return {
        success: false,
        message: "This reply target is no longer available.",
      };
    }
  }

  const { error } = await supabase.from("community_comments").insert({
    post_id: postId,
    author_id: user.id,
    parent_comment_id: parentCommentId,
    content,
  });

  if (error) {
    console.error("Failed to create community comment:", error);

    return {
      success: false,
      message: "Your comment could not be published. Please try again.",
    };
  }

  revalidateCommunityPost(postId);

  return {
    success: true,
    message: parentCommentId ? "Reply published." : "Comment published.",
  };
}
