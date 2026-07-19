"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@repo/lib/supabase/server";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export type FollowActionResult =
  | { ok: true; following: boolean }
  | { ok: false; error: string };

export async function toggleCommunityFollow(
  targetProfileId: string,
): Promise<FollowActionResult> {
  if (!UUID_PATTERN.test(targetProfileId)) {
    return { ok: false, error: "The selected Lifetopian is invalid." };
  }

  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  if (!authData.user) {
    return { ok: false, error: "Sign in before following a Lifetopian." };
  }

  const { data: target } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", targetProfileId)
    .single();
  if (!target) return { ok: false, error: "This profile is unavailable." };

  const { data, error } = await supabase.rpc("toggle_community_follow", {
    p_target_user_id: targetProfileId,
  });
  if (error) return { ok: false, error: "The follow request could not be saved." };

  revalidatePath("/explore");
  revalidatePath(`/user/${target.username}`);
  revalidatePath(`/user/${target.username}/followers`);
  revalidatePath(`/user/${target.username}/following`);
  return { ok: true, following: Boolean(data) };
}
