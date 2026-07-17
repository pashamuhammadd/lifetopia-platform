import { createClient } from "@repo/lib/supabase/server";

import { resolveLifetopiaRole } from "@/data/identity";
import {
  normalizePostCategory,
} from "@/types/post";
import type {
  CommunityFeedResult,
  CommunityPost,
} from "@/types/community-post";

import { getBookmarkedPostIds } from "./bookmarks";
import { getCommentsByPostIds } from "./comments";
import { getLikedPostIds } from "./likes";

export const COMMUNITY_POSTS_PER_PAGE = 10;

type CommunityPostQueryAuthor = {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_id: string | null;
  role: string | null;
};

type CommunityPostQueryRow = {
  id: string;
  content: string;
  category: string | null;
  created_at: string;
  author:
    | CommunityPostQueryAuthor
    | CommunityPostQueryAuthor[]
    | null;
  likes: Array<{
    count: number;
  }> | null;
  comments: Array<{
    count: number;
  }> | null;
};

function normalizeTag(
  value: string | null | undefined,
) {
  const normalized = value
    ?.trim()
    .replace(/^#/, "");

  if (!normalized) {
    return null;
  }

  if (
    !/^[A-Za-z0-9_]{1,40}$/.test(
      normalized,
    )
  ) {
    return null;
  }

  return normalized;
}

async function hydrateCommunityPosts(
  rows: CommunityPostQueryRow[],
  currentUserId: string | null,
): Promise<CommunityPost[]> {
  const postIds = rows.map(
    (post) => post.id,
  );

  const [
    likedPostIds,
    bookmarkedPostIds,
    commentsByPostId,
  ] = await Promise.all([
    getLikedPostIds(postIds),
    getBookmarkedPostIds(postIds),
    getCommentsByPostIds(
      postIds,
      currentUserId,
    ),
  ]);

  return rows.map((post) => {
    const author = Array.isArray(
      post.author,
    )
      ? post.author[0]
      : post.author;

    return {
      id: post.id,
      content: post.content,
      category:
        normalizePostCategory(
          post.category,
        ),
      createdAt: new Date(
        post.created_at,
      ).toLocaleDateString("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      createdAtIso: post.created_at,
      isOwner:
        currentUserId === author?.id,
      isLiked:
        likedPostIds.has(post.id),
      isBookmarked:
        bookmarkedPostIds.has(
          post.id,
        ),
      author: {
        id: author?.id ?? "",
        username:
          author?.username ??
          "lifetopian",
        displayName:
          author?.display_name ??
          "Lifetopian",
        avatarSrc: `/images/avatars/${
          author?.avatar_id ??
          "avatar-01"
        }.jpg`,
        role: resolveLifetopiaRole(
          author?.role,
        ),
      },
      likes:
        post.likes?.[0]?.count ?? 0,
      comments:
        post.comments?.[0]?.count ??
        0,
      commentItems:
        commentsByPostId.get(
          post.id,
        ) ?? [],
    };
  });
}

const COMMUNITY_POST_SELECT = `
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
`;

export async function getCommunityPosts(
  requestedPage = 1,
  requestedTag?: string | null,
): Promise<CommunityFeedResult> {
  const page = Number.isFinite(
    requestedPage,
  )
    ? Math.max(
        1,
        Math.floor(requestedPage),
      )
    : 1;

  const activeTag =
    normalizeTag(requestedTag);

  const from =
    (page - 1) *
    COMMUNITY_POSTS_PER_PAGE;

  const to =
    from +
    COMMUNITY_POSTS_PER_PAGE -
    1;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let query = supabase
    .from("community_posts")
    .select(COMMUNITY_POST_SELECT, {
      count: "exact",
    });

  if (activeTag) {
    query = query.ilike(
      "content",
      `%#${activeTag}%`,
    );
  }

  const {
    data,
    error,
    count,
  } = await query
    .order("created_at", {
      ascending: false,
    })
    .range(from, to);

  if (error || !data) {
    console.error(
      "Failed to fetch community posts:",
      error,
    );

    return {
      posts: [],
      page,
      totalPages: 1,
      totalPosts: 0,
      activeTag,
      error:
        "The community feed could not be loaded right now.",
    };
  }

  const posts =
    await hydrateCommunityPosts(
      data as unknown as CommunityPostQueryRow[],
      user?.id ?? null,
    );

  const totalPosts =
    count ?? posts.length;

  const totalPages = Math.max(
    1,
    Math.ceil(
      totalPosts /
        COMMUNITY_POSTS_PER_PAGE,
    ),
  );

  return {
    posts,
    page,
    totalPages,
    totalPosts,
    activeTag,
    error: null,
  };
}

export async function getCommunityPostById(
  postId: string,
): Promise<CommunityPost | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const {
    data,
    error,
  } = await supabase
    .from("community_posts")
    .select(COMMUNITY_POST_SELECT)
    .eq("id", postId)
    .maybeSingle();

  if (error || !data) {
    if (error) {
      console.error(
        "Failed to fetch community post:",
        error,
      );
    }

    return null;
  }

  const [post] =
    await hydrateCommunityPosts(
      [
        data as unknown as CommunityPostQueryRow,
      ],
      user?.id ?? null,
    );

  return post ?? null;
}
