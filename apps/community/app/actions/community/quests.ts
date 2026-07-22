"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@repo/lib/supabase/server";
export type QuestActionResult = {
  ok: boolean;
  message: string;
  awarded?: number;
  changed?: boolean;
};
export async function recordDailyQuestVisit(): Promise<QuestActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, message: "Sign in to start today’s quests." };
  const { data, error } = await supabase.rpc("record_community_quest_event", {
    p_event_type: "daily_login",
    p_subject_id: null,
  });
  if (error) return { ok: false, message: "Today’s quest visit could not be recorded." };
  const changed = Boolean(data);
  if (changed) revalidatePath("/quest");
  return {
    ok: true,
    changed,
    message: changed ? "Daily visit recorded." : "Daily visit was already recorded.",
  };
}
export async function recordQuestPostView(postId: string): Promise<void> {
  if (!/^[0-9a-f-]{36}$/i.test(postId)) return;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;
  await supabase.rpc("record_community_quest_event", {
    p_event_type: "post_view",
    p_subject_id: postId,
  });
}
export async function claimDailyCommunityQuest(questCode: string): Promise<QuestActionResult> {
  const allowed = new Set([
    "daily_login",
    "read_posts",
    "like_posts",
    "meaningful_comment",
    "create_post",
  ]);
  if (!allowed.has(questCode)) return { ok: false, message: "This quest is invalid." };
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, message: "Sign in before claiming Harmony." };
  const { data, error } = await supabase.rpc("claim_daily_community_quest", {
    p_quest_code: questCode,
  });
  if (error)
    return {
      ok: false,
      message: error.message.includes("quest_incomplete")
        ? "Complete this task before claiming."
        : "Harmony could not be claimed.",
    };
  const row = Array.isArray(data) ? data[0] : data;
  const awarded = Number(row?.awarded ?? 0);
  revalidatePath("/quest");
  revalidatePath("/my-world");
  return {
    ok: true,
    awarded,
    message: awarded ? `+${awarded} Harmony claimed.` : "This task was already claimed today.",
  };
}
