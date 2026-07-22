import { createClient } from "@repo/lib/supabase/server";
type NotificationRow = {
  id: string;
  type: "official_announcement" | "comment_reply";
  title: string;
  body: string;
  post_id: string | null;
  read_at: string | null;
  created_at: string;
};
export type CommunityNotification = {
  id: string;
  type: "official_announcement" | "comment_reply";
  title: string;
  body: string;
  href: string;
  read: boolean;
  createdAt: string;
};
export async function getCommunityNotifications() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("community_notifications")
    .select("id,type,title,body,post_id,read_at,created_at")
    .order("created_at", { ascending: false })
    .limit(100);
  return ((data ?? []) as NotificationRow[]).map((row) => ({
    id: row.id,
    type: row.type,
    title: row.title,
    body: row.body,
    href: row.post_id ? `/post/${row.post_id}` : "/notifications",
    read: Boolean(row.read_at),
    createdAt: row.created_at,
  })) satisfies CommunityNotification[];
}
export async function getUnreadNotificationCount() {
  const supabase = await createClient();
  const { count } = await supabase
    .from("community_notifications")
    .select("id", { count: "exact", head: true })
    .is("read_at", null);
  return count ?? 0;
}
