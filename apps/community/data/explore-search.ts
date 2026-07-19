import { createClient } from "@repo/lib/supabase/server";
import { formatCommunityRole } from "@/data/profile/public-profile";

export type ExploreProfile = { id: string; username: string; displayName: string; avatarSrc: string; role: string; followersCount: number; viewerIsFollowing: boolean; isOwnProfile: boolean };
export type ExplorePost = { id: string; content: string; category: string; createdAt: string; authorId: string; username: string; displayName: string; avatarSrc: string; likesCount: number; commentsCount: number };

type ExploreProfileRow = {
  id: string;
  username: string;
  display_name: string;
  avatar_id: string;
  role: string;
  followers_count: number | string | null;
  viewer_is_following: boolean | null;
};

type ExplorePostRow = {
  id: string;
  content: string;
  category: string;
  created_at: string;
  author_id: string;
  username: string;
  display_name: string;
  avatar_id: string;
  likes_count: number | string | null;
  comments_count: number | string | null;
};

export async function searchExplore(query: string, tab: "posts" | "people", page: number) {
  const supabase = await createClient(); const offset = (page - 1) * 12;
  if (tab === "people") {
    const [{ data, error }, { data: authData }] = await Promise.all([
      supabase.rpc("search_community_profiles", { p_query: query, p_limit: 13, p_offset: offset }), supabase.auth.getUser(),
    ]);
    const rows: ExploreProfileRow[] = error || !data
      ? []
      : (data as ExploreProfileRow[]);
    return { profiles: rows.slice(0, 12).map((item) => ({ id: item.id, username: item.username, displayName: item.display_name, avatarSrc: `/images/avatars/${item.avatar_id}.jpg`, role: formatCommunityRole(item.role), followersCount: Number(item.followers_count ?? 0), viewerIsFollowing: Boolean(item.viewer_is_following), isOwnProfile: authData.user?.id === item.id })) satisfies ExploreProfile[], posts: [], hasNext: rows.length > 12 };
  }
  const { data, error } = await supabase.rpc("search_community_posts", { p_query: query, p_limit: 13, p_offset: offset });
  const rows: ExplorePostRow[] = error || !data
    ? []
    : (data as ExplorePostRow[]);
  return { profiles: [], posts: rows.slice(0, 12).map((item) => ({ id: item.id, content: item.content, category: item.category, createdAt: new Date(item.created_at).toLocaleDateString("en", { month: "short", day: "numeric" }), authorId: item.author_id, username: item.username, displayName: item.display_name, avatarSrc: `/images/avatars/${item.avatar_id}.jpg`, likesCount: Number(item.likes_count ?? 0), commentsCount: Number(item.comments_count ?? 0) })) satisfies ExplorePost[], hasNext: rows.length > 12 };
}
