"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@repo/lib/supabase/server";

export type CommunityCommentActionState = {
  success: boolean;
  message: string;
};

export async function createCommunityComment(
  _previousState: CommunityCommentActionState,
  formData: FormData,
): Promise<CommunityCommentActionState> {
  const postId = String(formData.get("postId") ?? "");
  const content = String(formData.get("content") ?? "").trim();

  if (!postId || !content) {
    return {
      success: false,
      message: "Comment cannot be empty.",
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

  const { error } = await supabase.from("community_comments").insert({
    post_id: postId,
    author_id: user.id,
    content,
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/");

  return {
    success: true,
    message: "Comment posted.",
  };
}