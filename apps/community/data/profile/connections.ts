import { createClient } from "@repo/lib/supabase/server";
import { formatCommunityRole } from "./public-profile";

export type ProfileConnection = {
  id: string; username: string; displayName: string; avatarSrc: string;
  role: string; accountType: string; followersCount: number;
  viewerIsFollowing: boolean; isOwnProfile: boolean;
};

type ProfileConnectionRow = {
  id: string;
  username: string;
  display_name: string;
  avatar_id: string;
  role: string;
  account_type: string;
  followers_count: number | string | null;
  viewer_is_following: boolean | null;
};

export async function getProfileConnections(profileId: string, kind: "followers" | "following") {
  const supabase = await createClient();
  const [{ data, error }, { data: authData }] = await Promise.all([
    supabase.rpc("get_community_profile_connections", { p_profile_id: profileId, p_kind: kind, p_limit: 50, p_offset: 0 }),
    supabase.auth.getUser(),
  ]);
  if (error || !data) return [];
  const rows = data as ProfileConnectionRow[];
  return rows.map((item) => ({
    id: item.id, username: item.username, displayName: item.display_name,
    avatarSrc: `/images/avatars/${item.avatar_id}.jpg`, role: formatCommunityRole(item.role),
    accountType: item.account_type, followersCount: Number(item.followers_count ?? 0),
    viewerIsFollowing: Boolean(item.viewer_is_following), isOwnProfile: authData.user?.id === item.id,
  })) satisfies ProfileConnection[];
}
