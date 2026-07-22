"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@repo/lib/supabase/server";
export type GuildActionResult = { ok: boolean; message: string; slug?: string; status?: string };
export async function createCommunityGuild(formData: FormData): Promise<GuildActionResult> {
  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "")
    .trim()
    .toLowerCase();
  const description = String(formData.get("description") ?? "").trim();
  const policy = String(formData.get("joinPolicy") ?? "open");
  if (
    name.length < 3 ||
    name.length > 40 ||
    !/^[a-z0-9][a-z0-9-]{2,31}$/.test(slug) ||
    description.length < 10 ||
    description.length > 500 ||
    !["open", "approval"].includes(policy)
  )
    return { ok: false, message: "Check the guild name, slug, description, and join policy." };
  const supabase = await createClient();
  const { error } = await supabase.rpc("create_community_guild", {
    p_name: name,
    p_slug: slug,
    p_description: description,
    p_join_policy: policy,
  });
  if (error)
    return {
      ok: false,
      message: /unique|duplicate/i.test(error.message)
        ? "You already own a guild or this slug is taken."
        : "The guild could not be created.",
    };
  revalidatePath("/guild");
  return { ok: true, message: "Guild created.", slug };
}
export async function joinCommunityGuild(guildId: string): Promise<GuildActionResult> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("join_community_guild", { p_guild_id: guildId });
  if (error) return { ok: false, message: "The guild request could not be saved." };
  revalidatePath("/guild");
  return {
    ok: true,
    status: String(data),
    message: data === "pending" ? "Join request sent." : "You joined the guild.",
  };
}
export async function leaveCommunityGuild(guildId: string): Promise<GuildActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.rpc("leave_community_guild", { p_guild_id: guildId });
  if (error)
    return {
      ok: false,
      message: error.message.includes("owner_cannot_leave")
        ? "Transfer ownership before leaving."
        : "The guild could not be left.",
    };
  revalidatePath("/guild");
  return { ok: true, message: "You left the guild." };
}
export async function reviewGuildJoinRequest(
  guildId: string,
  userId: string,
  approve: boolean,
): Promise<GuildActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.rpc("review_guild_join_request", {
    p_guild_id: guildId,
    p_user_id: userId,
    p_approve: approve,
  });
  if (error) return { ok: false, message: "The join request could not be reviewed." };
  revalidatePath("/guild");
  return { ok: true, message: approve ? "Member approved." : "Request declined." };
}
