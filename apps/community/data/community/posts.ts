import { createClient } from "@repo/lib/supabase/server";

import type { CommunityPost } from "@/types/community-post";
import { getBookmarkedPostIds } from "./bookmarks";
import { getCommentsByPostIds } from "./comments";
import { getLikedPostIds } from "./likes";

export async function getCommunityPosts(): Promise<CommunityPost[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const likedPostIds = await getLikedPostIds();
  const bookmarkedPostIds = await getBookmarkedPostIds();
  const { data, error } = await supabase
    .from("community_posts")
    .select(
      `
      id,
      content,
      category,
      created_at,
      author:profiles!community_posts_author_id_fkey (
        id,
        username,
        display_name,
        avatar_id,
        role
      ),
      likes:community_likes(count),
      comments:community_comments(count)
    `,
    )
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("Failed to fetch community posts:", error);
    return [];
  }

  const commentsByPostId = await getCommentsByPostIds(
    data.map((post) => post.id),
  );

  return data.map((post) => {
    const author = Array.isArray(post.author) ? post.author[0] : post.author;

    return {
      id: post.id,
      content: post.content,
      category: post.category,
      createdAt: new Date(post.created_at).toLocaleDateString("en", {
        month: "short",
        day: "numeric",
      }),
      isOwner: user?.id === author?.id,
      isLiked: likedPostIds.has(post.id),
      isBookmarked: bookmarkedPostIds.has(post.id),
      author: {
        id: author?.id ?? "",
        username: author?.username ?? "lifetopian",
        displayName: author?.display_name ?? "Lifetopian",
        avatarSrc: `/images/avatars/${author?.avatar_id ?? "avatar-01"}.jpg`,
        role: author?.role === "admin" ? "World Creator" : "Lifetopian",
        title: "Alpha Pioneer",
      },
      likes: post.likes?.[0]?.count ?? 0,
      comments: post.comments?.[0]?.count ?? 0,
      commentItems: commentsByPostId.get(post.id) ?? [],
    };
  });
}