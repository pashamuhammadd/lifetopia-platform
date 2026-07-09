"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@repo/lib/supabase/server";

export async function toggleCommunityBookmark(postId: string) {
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

  const { data: existingBookmark } = await supabase
    .from("community_bookmarks")
    .select("post_id")
    .eq("post_id", postId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existingBookmark) {
    const { error } = await supabase
      .from("community_bookmarks")
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
      bookmarked: false,
      message: "Bookmark removed.",
    };
  }

  const { error } = await supabase.from("community_bookmarks").insert({
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
    bookmarked: true,
    message: "Post saved.",
  };
}