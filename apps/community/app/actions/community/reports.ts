"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@repo/lib/supabase/server";

import {
  COMMUNITY_REPORT_DETAILS_MAX_LENGTH,
  isCommunityReportReason,
  isCommunityReportTarget,
} from "@/types/report";

export type CommunityReportActionState = {
  success: boolean;
  message: string;
};

export async function createCommunityReport(
  formData: FormData,
): Promise<CommunityReportActionState> {
  const targetType = String(
    formData.get("targetType") ?? "",
  ).trim();

  const targetId = String(
    formData.get("targetId") ?? "",
  ).trim();

  const reason = String(
    formData.get("reason") ?? "",
  ).trim();

  const details = String(
    formData.get("details") ?? "",
  ).trim();

  if (
    !isCommunityReportTarget(targetType) ||
    !targetId
  ) {
    return {
      success: false,
      message: "This content could not be identified.",
    };
  }

  if (!isCommunityReportReason(reason)) {
    return {
      success: false,
      message: "Choose a valid report reason.",
    };
  }

  if (
    details.length >
    COMMUNITY_REPORT_DETAILS_MAX_LENGTH
  ) {
    return {
      success: false,
      message: `Report details can contain up to ${COMMUNITY_REPORT_DETAILS_MAX_LENGTH} characters.`,
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "You must login before submitting a report.",
    };
  }

  let postId: string;
  let commentId: string | null = null;
  let authorId: string | null = null;

  if (targetType === "post") {
    const {
      data: post,
      error: postError,
    } = await supabase
      .from("community_posts")
      .select("id, author_id")
      .eq("id", targetId)
      .maybeSingle();

    if (postError || !post) {
      return {
        success: false,
        message: "This post is no longer available.",
      };
    }

    postId = post.id;
    authorId = post.author_id;
  } else {
    const {
      data: comment,
      error: commentError,
    } = await supabase
      .from("community_comments")
      .select("id, post_id, author_id")
      .eq("id", targetId)
      .maybeSingle();

    if (commentError || !comment) {
      return {
        success: false,
        message: "This comment is no longer available.",
      };
    }

    postId = comment.post_id;
    commentId = comment.id;
    authorId = comment.author_id;
  }

  if (authorId === user.id) {
    return {
      success: false,
      message: "You cannot report your own content.",
    };
  }

  const { error } = await supabase
    .from("community_reports")
    .insert({
      reporter_id: user.id,
      target_type: targetType,
      post_id: postId,
      comment_id: commentId,
      reason,
      details: details || null,
      status: "pending",
    });

  if (error?.code === "23505") {
    return {
      success: false,
      message: "You have already reported this content.",
    };
  }

  if (error) {
    console.error(
      "Failed to create community report:",
      error,
    );

    return {
      success: false,
      message: "Your report could not be submitted. Please try again.",
    };
  }

  revalidatePath("/admin/reports");

  return {
    success: true,
    message:
      "Report submitted. A Lifetopia moderator will review it.",
  };
}
