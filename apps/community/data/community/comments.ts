import { createClient } from "@repo/lib/supabase/server";

export type CommunityComment = {
  id: string;
  postId: string;
  parentCommentId: string | null;
  content: string;
  createdAt: string;
  createdAtIso: string;
  author: {
    id: string;
    username: string;
    displayName: string;
    avatarSrc: string;
  };
  replies: CommunityComment[];
};

type FlatCommunityComment = Omit<CommunityComment, "replies"> & {
  replies: CommunityComment[];
};

function buildCommentTree(
  comments: FlatCommunityComment[],
): CommunityComment[] {
  const commentMap = new Map<string, CommunityComment>();

  for (const comment of comments) {
    commentMap.set(comment.id, {
      ...comment,
      replies: [],
    });
  }

  const roots: CommunityComment[] = [];

  for (const comment of commentMap.values()) {
    if (!comment.parentCommentId) {
      roots.push(comment);
      continue;
    }

    const parent = commentMap.get(comment.parentCommentId);

    if (!parent) {
      roots.push(comment);
      continue;
    }

    parent.replies.push(comment);
  }

  return roots;
}

export async function getCommentsByPostIds(postIds: string[]) {
  if (postIds.length === 0) {
    return new Map<string, CommunityComment[]>();
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("community_comments")
    .select(
      `
        id,
        post_id,
        parent_comment_id,
        content,
        created_at,
        author:profiles!community_comments_author_id_fkey (
          id,
          username,
          display_name,
          avatar_id
        )
      `,
    )
    .in("post_id", postIds)
    .order("created_at", {
      ascending: true,
    });

  if (error || !data) {
    console.error("Failed to fetch comments:", error);
    return new Map<string, CommunityComment[]>();
  }

  const flatCommentsByPostId = new Map<string, FlatCommunityComment[]>();

  for (const comment of data) {
    const author = Array.isArray(comment.author)
      ? comment.author[0]
      : comment.author;

    const item: FlatCommunityComment = {
      id: comment.id,
      postId: comment.post_id,
      parentCommentId: comment.parent_comment_id ?? null,
      content: comment.content,
      createdAt: new Date(comment.created_at).toLocaleDateString("en", {
        month: "short",
        day: "numeric",
      }),
      createdAtIso: comment.created_at,
      author: {
        id: author?.id ?? "",
        username: author?.username ?? "lifetopian",
        displayName: author?.display_name ?? "Lifetopian",
        avatarSrc: `/images/avatars/${author?.avatar_id ?? "avatar-01"}.jpg`,
      },
      replies: [],
    };

    const current = flatCommentsByPostId.get(item.postId) ?? [];
    current.push(item);
    flatCommentsByPostId.set(item.postId, current);
  }

  const commentsByPostId = new Map<string, CommunityComment[]>();

  for (const [postId, comments] of flatCommentsByPostId) {
    commentsByPostId.set(postId, buildCommentTree(comments));
  }

  return commentsByPostId;
}
