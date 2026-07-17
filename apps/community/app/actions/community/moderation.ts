"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@repo/lib/supabase/server";

import { getCurrentProfile } from "@/data/profile/current-profile";
import {
  isCommunityReportStatus,
} from "@/types/report";

export type ModerationActionState = {
  success: boolean;
  message: string;
};

const MODERATION_ROLES = new Set([
  "founder",
  "admin",
  "moderator",
]);

export async function updateCommunityReportStatus(
  formData: FormData,
): Promise<ModerationActionState> {
  const reportId = String(
    formData.get("reportId") ?? "",
  ).trim();

  const status = String(
    formData.get("status") ?? "",
  ).trim();

  const resolutionNote = String(
    formData.get("resolutionNote") ?? "",
  ).trim();

  if (!reportId || !isCommunityReportStatus(status)) {
    return {
      success: false,
      message: "This moderation action is invalid.",
    };
  }

  if (resolutionNote.length > 500) {
    return {
      success: false,
      message: "Moderator notes can contain up to 500 characters.",
    };
  }

  const profile = await getCurrentProfile();

  if (
    !profile ||
    !MODERATION_ROLES.has(
      profile.role.trim().toLowerCase(),
    )
  ) {
    return {
      success: false,
      message: "You do not have moderation access.",
    };
  }

  const supabase = await createClient();

  const isFinalStatus =
    status === "resolved" ||
    status === "dismissed";

  const { error } = await supabase
    .from("community_reports")
    .update({
      status,
      reviewed_by: profile.id,
      reviewed_at: isFinalStatus
        ? new Date().toISOString()
        : null,
      resolution_note:
        resolutionNote || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", reportId);

  if (error) {
    console.error(
      "Failed to update community report:",
      error,
    );

    return {
      success: false,
      message: "The report status could not be updated.",
    };
  }

  revalidatePath("/admin/reports");

  return {
    success: true,
    message: "Report status updated.",
  };
}
