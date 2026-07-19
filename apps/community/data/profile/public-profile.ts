import { cache } from "react";
import { createClient } from "@repo/lib/supabase/server";

export type PublicProfileData = {
  id: string; username: string; displayName: string; avatarSrc: string;
  role: string; accountType: string; joinedAt: string; postsCount: number;
  followersCount: number; followingCount: number; viewerIsFollowing: boolean; isOwnProfile: boolean;
};
export type PublicProfilePost = { id: string; content: string; category: string; createdAt: string };

export function formatCommunityRole(role: string) {
  const roles: Record<string, string> = { founder: "World Founder", admin: "World Creator", developer: "World Builder", moderator: "Guardian", artist: "World Artist", alpha_tester: "Alpha Pioneer", beta_tester: "Beta Pioneer" };
  return roles[role] ?? "Lifetopian";
}

export const getPublicProfile = cache(async (username: string) => {
  const supabase = await createClient();
  const [{ data: profile, error }, { data: authData }] = await Promise.all([
    supabase.from("profiles").select("id, username, display_name, avatar_id, role, account_type, created_at").eq("username", username).single(),
    supabase.auth.getUser(),
  ]);
  if (error || !profile) return null;

  const [{ count }, { data: followRows }] = await Promise.all([
    supabase.from("community_posts").select("id", { count: "exact", head: true }).eq("author_id", profile.id),
    supabase.rpc("get_community_profile_follow_state", { p_profile_id: profile.id }),
  ]);
  const state = Array.isArray(followRows) ? followRows[0] : followRows;

  return {
    id: profile.id, username: profile.username, displayName: profile.display_name,
    avatarSrc: `/images/avatars/${profile.avatar_id}.jpg`, role: formatCommunityRole(profile.role),
    accountType: profile.account_type,
    joinedAt: new Date(profile.created_at).toLocaleDateString("en", { month: "short", year: "numeric" }),
    postsCount: count ?? 0, followersCount: Number(state?.followers_count ?? 0),
    followingCount: Number(state?.following_count ?? 0), viewerIsFollowing: Boolean(state?.viewer_is_following),
    isOwnProfile: authData.user?.id === profile.id,
  } satisfies PublicProfileData;
});

export async function getPublicProfilePosts(profileId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("community_posts").select("id, content, category, created_at").eq("author_id", profileId).order("created_at", { ascending: false });
  if (error || !data) return [];
  return data.map((post) => ({ id: post.id, content: post.content, category: post.category, createdAt: new Date(post.created_at).toLocaleDateString("en", { month: "short", day: "numeric" }) })) satisfies PublicProfilePost[];
}
