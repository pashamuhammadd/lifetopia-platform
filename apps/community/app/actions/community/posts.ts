"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@repo/lib/supabase/server";

export type CommunityPostActionState = {
  success: boolean;
  message: string;
};

export async function createCommunityPost(formData: FormData) {
  const content = String(formData.get("content") ?? "").trim();
  const category = String(formData.get("category") ?? "General");

  if (!content) return { success: false, message: "Post content cannot be empty." };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false, message: "You must login before creating a post." };

  const { error } = await supabase.from("community_posts").insert({
    author_id: user.id,
    content,
    category,
  });

  if (error) return { success: false, message: error.message };

  revalidatePath("/");
  return { success: true, message: "Post created successfully." };
}

export async function updateCommunityPost(
  _previousState: CommunityPostActionState,
  formData: FormData,
): Promise<CommunityPostActionState> {
  const postId = String(formData.get("postId") ?? "");
  const content = String(formData.get("content") ?? "").trim();

  if (!postId || !content) {
    return { success: false, message: "Post content cannot be empty." };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false, message: "You must login first." };

  const { error } = await supabase
    .from("community_posts")
    .update({
      content,
      updated_at: new Date().toISOString(),
    })
    .eq("id", postId)
    .eq("author_id", user.id);

  if (error) return { success: false, message: error.message };

  revalidatePath("/");
  return { success: true, message: "Post updated." };
}

export async function deleteCommunityPost(
  postId: string,
): Promise<CommunityPostActionState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false, message: "You must login first." };

  const { error } = await supabase
    .from("community_posts")
    .delete()
    .eq("id", postId)
    .eq("author_id", user.id);

  if (error) return { success: false, message: error.message };

  revalidatePath("/");
  return { success: true, message: "Post deleted." };
}