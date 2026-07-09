import { createClient } from "@repo/lib/supabase/server";

export type PublicProfileData = {
  id: string;
  username: string;
  displayName: string;
  avatarSrc: string;
  role: string;
  accountType: string;
  joinedAt: string;
  postsCount: number;
};

export type PublicProfilePost = {
  id: string;
  content: string;
  category: string;
  createdAt: string;
};

function formatRole(role: string) {
  if (role === "admin") return "World Creator";
  if (role === "developer") return "World Builder";
  if (role === "moderator") return "Guardian";
  return "Lifetopian";
}

export async function getPublicProfile(username: string) {
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, username, display_name, avatar_id, role, account_type, created_at")
    .eq("username", username)
    .single();

  if (error || !profile) return null;

  const { count } = await supabase
    .from("community_posts")
    .select("id", { count: "exact", head: true })
    .eq("author_id", profile.id);

  return {
    id: profile.id,
    username: profile.username,
    displayName: profile.display_name,
    avatarSrc: `/images/avatars/${profile.avatar_id}.jpg`,
    role: formatRole(profile.role),
    accountType: profile.account_type,
    joinedAt: new Date(profile.created_at).toLocaleDateString("en", {
      month: "short",
      year: "numeric",
    }),
    postsCount: count ?? 0,
  };
}

export async function getPublicProfilePosts(profileId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("community_posts")
    .select("id, content, category, created_at")
    .eq("author_id", profileId)
    .order("created_at", { ascending: false });

  if (error) return [];

  return data.map((post) => ({
    id: post.id,
    content: post.content,
    category: post.category,
    createdAt: new Date(post.created_at).toLocaleDateString("en", {
      month: "short",
      day: "numeric",
    }),
  }));
}