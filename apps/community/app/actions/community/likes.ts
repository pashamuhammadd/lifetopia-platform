"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@repo/lib/supabase/server";

export async function toggleCommunityLike(postId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "You must login first.",
    };
  }

  const { data: existingLike } = await supabase
    .from("community_likes")
    .select("post_id")
    .eq("post_id", postId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existingLike) {
    const { error } = await supabase
      .from("community_likes")
      .delete()
      .eq("post_id", postId)
      .eq("user_id", user.id);

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    revalidatePath("/");

    return {
      success: true,
      liked: false,
      message: "Like removed.",
    };
  }

  const { error } = await supabase.from("community_likes").insert({
    post_id: postId,
    user_id: user.id,
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
    liked: true,
    message: "Post liked.",
  };
}