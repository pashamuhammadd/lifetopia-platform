import { createClient } from "@repo/lib/supabase/server";

import {
  normalizePostCategory,
} from "@/types/post";
import type {
  CommunityFeedResult,
  CommunityPost,
} from "@/types/community-post";
import { resolveLifetopiaRole } from "@/data/identity";

import { getBookmarkedPostIds } from "./bookmarks";
import { getCommentsByPostIds } from "./comments";
import { getLikedPostIds } from "./likes";

export const COMMUNITY_POSTS_PER_PAGE = 10;

export async function getCommunityPosts(
  requestedPage = 1,
): Promise<CommunityFeedResult> {
  const page = Number.isFinite(requestedPage)
    ? Math.max(1, Math.floor(requestedPage))
    : 1;

  const from = (page - 1) * COMMUNITY_POSTS_PER_PAGE;
  const to = from + COMMUNITY_POSTS_PER_PAGE - 1;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error, count } = await supabase
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
      {
        count: "exact",
      },
    )
    .order("created_at", {
      ascending: false,
    })
    .range(from, to);

  if (error || !data) {
    console.error("Failed to fetch community posts:", error);

    return {
      posts: [],
      page,
      totalPages: 1,
      totalPosts: 0,
      error: "The community feed could not be loaded right now.",
    };
  }

  const postIds = data.map((post) => post.id);

  const [
    likedPostIds,
    bookmarkedPostIds,
    commentsByPostId,
  ] = await Promise.all([
    getLikedPostIds(postIds),
    getBookmarkedPostIds(postIds),
    getCommentsByPostIds(postIds),
  ]);

  const posts: CommunityPost[] = data.map((post) => {
    const author = Array.isArray(post.author)
      ? post.author[0]
      : post.author;

    return {
      id: post.id,
      content: post.content,
      category: normalizePostCategory(post.category),
      createdAt: new Date(post.created_at).toLocaleDateString("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      isOwner: user?.id === author?.id,
      isLiked: likedPostIds.has(post.id),
      isBookmarked: bookmarkedPostIds.has(post.id),
      author: {
        id: author?.id ?? "",
        username: author?.username ?? "lifetopian",
        displayName: author?.display_name ?? "Lifetopian",
        avatarSrc: `/images/avatars/${author?.avatar_id ?? "avatar-01"}.jpg`,
        role: resolveLifetopiaRole(author?.role),
      },
      likes: post.likes?.[0]?.count ?? 0,
      comments: post.comments?.[0]?.count ?? 0,
      commentItems: commentsByPostId.get(post.id) ?? [],
    };
  });

  const totalPosts = count ?? posts.length;
  const totalPages = Math.max(
    1,
    Math.ceil(totalPosts / COMMUNITY_POSTS_PER_PAGE),
  );

  return {
    posts,
    page,
    totalPages,
    totalPosts,
    error: null,
  };
}
