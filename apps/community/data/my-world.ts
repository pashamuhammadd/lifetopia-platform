import { createClient } from "@repo/lib/supabase/server";

type MyWorldRow = {
  profile_id: string; username: string; display_name: string; avatar_id: string;
  profile_role: string; account_type: string; joined_at: string;
  harmony_points: number | string; harmony_level: number; harmony_level_progress: number;
  harmony_level_target: number; wallet_linked: boolean; wallet_address: string | null;
  wallet_linked_at: string | null; posts_count: number | string; followers_count: number | string;
  following_count: number | string; daily_claims: number; guilds: MyWorldGuild[];
};
type PostRow = { id: string; content: string; created_at: string };
type LedgerRow = { id: number; amount: number | string; description: string; created_at: string };

export type MyWorldGuild = { id: string; slug: string; name: string; role: "owner" | "member"; status: "active" | "pending"; memberCount: number };
export type MyWorldActivity = { id: string; kind: "post" | "harmony"; title: string; detail: string; href: string; createdAt: string };
export type MyWorldDashboard = {
  profile: { id: string; username: string; displayName: string; avatarSrc: string; role: string; accountType: string; joinedAt: string };
  harmony: { points: number; level: number; progress: number; target: number };
  wallet: { linked: boolean; address: string | null; linkedAt: string | null };
  community: { posts: number; followers: number; following: number; dailyClaims: number };
  guilds: MyWorldGuild[];
  activity: MyWorldActivity[];
};

export async function getMyWorldDashboard(): Promise<MyWorldDashboard | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_my_world_dashboard");
  if (error || !data) return null;
  const row = (Array.isArray(data) ? data[0] : data) as MyWorldRow | undefined;
  if (!row) return null;
  const [{ data: posts }, { data: ledger }] = await Promise.all([
    supabase.from("community_posts").select("id,content,created_at").eq("author_id", row.profile_id).order("created_at", { ascending: false }).limit(5),
    supabase.from("harmony_ledger").select("id,amount,description,created_at").eq("user_id", row.profile_id).order("created_at", { ascending: false }).limit(5),
  ]);

  const activities: MyWorldActivity[] = [
    ...((posts ?? []) as PostRow[]).map((post) => ({ id: `post-${post.id}`, kind: "post" as const, title: "Community post", detail: post.content, href: `/post/${post.id}`, createdAt: post.created_at })),
    ...((ledger ?? []) as LedgerRow[]).map((item) => ({ id: `harmony-${item.id}`, kind: "harmony" as const, title: Number(item.amount) >= 0 ? `+${Number(item.amount)} Harmony` : `${Number(item.amount)} Harmony`, detail: item.description, href: "/quest", createdAt: item.created_at })),
  ].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).slice(0, 8);

  return {
    profile: { id: row.profile_id, username: row.username, displayName: row.display_name, avatarSrc: `/images/avatars/${row.avatar_id}.jpg`, role: row.profile_role, accountType: row.account_type, joinedAt: row.joined_at },
    harmony: { points: Number(row.harmony_points), level: Number(row.harmony_level), progress: Number(row.harmony_level_progress), target: Number(row.harmony_level_target) },
    wallet: { linked: Boolean(row.wallet_linked), address: row.wallet_address, linkedAt: row.wallet_linked_at },
    community: { posts: Number(row.posts_count), followers: Number(row.followers_count), following: Number(row.following_count), dailyClaims: Number(row.daily_claims) },
    guilds: Array.isArray(row.guilds) ? row.guilds : [],
    activity: activities,
  };
}
