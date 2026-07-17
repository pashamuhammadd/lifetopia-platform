import { createClient } from "@repo/lib/supabase/server";

export async function getBookmarkedPostIds(postIds: string[]) {
  if (!postIds.length) {
    return new Set<string>();
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Set<string>();
  }

  const { data, error } = await supabase
    .from("community_bookmarks")
    .select("post_id")
    .eq("user_id", user.id)
    .in("post_id", postIds);

  if (error || !data) {
    console.error("Failed to fetch bookmarked posts:", error);
    return new Set<string>();
  }

  return new Set(data.map((bookmark) => bookmark.post_id));
}
