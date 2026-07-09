import { createClient } from "@repo/lib/supabase/server";

export async function getBookmarkedPostIds() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return new Set<string>();

  const { data, error } = await supabase
    .from("community_bookmarks")
    .select("post_id")
    .eq("user_id", user.id);

  if (error || !data) return new Set<string>();

  return new Set(data.map((bookmark) => bookmark.post_id));
}