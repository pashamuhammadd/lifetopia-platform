import { createClient } from "@repo/lib/supabase/server";

export type CommunityComment = {
  id: string;
  postId: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    username: string;
    displayName: string;
    avatarSrc: string;
  };
};

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
    .order("created_at", { ascending: true });

  if (error || !data) {
    console.error("Failed to fetch comments:", error);
    return new Map<string, CommunityComment[]>();
  }

  const commentsByPostId = new Map<string, CommunityComment[]>();

  data.forEach((comment) => {
    const author = Array.isArray(comment.author)
      ? comment.author[0]
      : comment.author;

    const item: CommunityComment = {
      id: comment.id,
      postId: comment.post_id,
      content: comment.content,
      createdAt: new Date(comment.created_at).toLocaleDateString("en", {
        month: "short",
        day: "numeric",
      }),
      author: {
        id: author?.id ?? "",
        username: author?.username ?? "lifetopian",
        displayName: author?.display_name ?? "Lifetopian",
        avatarSrc: `/images/avatars/${author?.avatar_id ?? "avatar-01"}.jpg`,
      },
    };

    const current = commentsByPostId.get(item.postId) ?? [];
    commentsByPostId.set(item.postId, [...current, item]);
  });

  return commentsByPostId;
}