"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@repo/lib/supabase/server";

import {
  POST_CONTENT_MAX_LENGTH,
  isPostCategory,
} from "@/types/post";

export type CommunityPostActionState = {
  success: boolean;
  message: string;
};

function validatePostContent(content: string): CommunityPostActionState | null {
  if (!content) {
    return {
      success: false,
      message: "Post content cannot be empty.",
    };
  }

  if (content.length > POST_CONTENT_MAX_LENGTH) {
    return {
      success: false,
      message: `Posts can contain up to ${POST_CONTENT_MAX_LENGTH} characters.`,
    };
  }

  return null;
}

export async function createCommunityPost(
  formData: FormData,
): Promise<CommunityPostActionState> {
  const content = String(formData.get("content") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();

  const contentError = validatePostContent(content);

  if (contentError) {
    return contentError;
  }

  if (!isPostCategory(category)) {
    return {
      success: false,
      message: "Choose a valid Lifetopia topic.",
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "You must login before creating a post.",
    };
  }

  const { error } = await supabase.from("community_posts").insert({
    author_id: user.id,
    content,
    category,
  });

  if (error) {
    console.error("Failed to create community post:", error);

    return {
      success: false,
      message: "Your post could not be published. Please try again.",
    };
  }

  revalidatePath("/");

  return {
    success: true,
    message: "Post published.",
  };
}

export async function updateCommunityPost(
  _previousState: CommunityPostActionState,
  formData: FormData,
): Promise<CommunityPostActionState> {
  const postId = String(formData.get("postId") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (!postId) {
    return {
      success: false,
      message: "This post could not be identified.",
    };
  }

  const contentError = validatePostContent(content);

  if (contentError) {
    return contentError;
  }

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

  const { error } = await supabase
    .from("community_posts")
    .update({
      content,
      updated_at: new Date().toISOString(),
    })
    .eq("id", postId)
    .eq("author_id", user.id);

  if (error) {
    console.error("Failed to update community post:", error);

    return {
      success: false,
      message: "Your post could not be updated. Please try again.",
    };
  }

  revalidatePath("/");

  return {
    success: true,
    message: "Post updated.",
  };
}

export async function deleteCommunityPost(
  postId: string,
): Promise<CommunityPostActionState> {
  if (!postId.trim()) {
    return {
      success: false,
      message: "This post could not be identified.",
    };
  }

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

  const { error } = await supabase
    .from("community_posts")
    .delete()
    .eq("id", postId)
    .eq("author_id", user.id);

  if (error) {
    console.error("Failed to delete community post:", error);

    return {
      success: false,
      message: "Your post could not be deleted. Please try again.",
    };
  }

  revalidatePath("/");

  return {
    success: true,
    message: "Post deleted.",
  };
}
