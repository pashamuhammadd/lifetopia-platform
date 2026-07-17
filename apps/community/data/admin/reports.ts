import { createClient } from "@repo/lib/supabase/server";

import type {
  CommunityReportReason,
  CommunityReportStatus,
  CommunityReportTarget,
} from "@/types/report";

export type ModerationReport = {
  id: string;
  targetType: CommunityReportTarget;
  reason: CommunityReportReason;
  details: string | null;
  status: CommunityReportStatus;
  createdAt: string;
  reporter: {
    username: string;
    displayName: string;
    avatarSrc: string;
  };
  author: {
    username: string;
    displayName: string;
  } | null;
  postId: string;
  contentPreview: string;
  resolutionNote: string | null;
};

type ReportRow = {
  id: string;
  reporter_id: string;
  target_type: CommunityReportTarget;
  post_id: string;
  comment_id: string | null;
  reason: CommunityReportReason;
  details: string | null;
  status: CommunityReportStatus;
  resolution_note: string | null;
  created_at: string;
};

type ProfileRow = {
  id: string;
  username: string;
  display_name: string;
  avatar_id: string;
};

type PostRow = {
  id: string;
  author_id: string;
  content: string;
};

type CommentRow = {
  id: string;
  author_id: string;
  content: string;
};

export async function getModerationReports() {
  const supabase = await createClient();

  const {
    data: reportData,
    error: reportError,
  } = await supabase
    .from("community_reports")
    .select(
      `
        id,
        reporter_id,
        target_type,
        post_id,
        comment_id,
        reason,
        details,
        status,
        resolution_note,
        created_at
      `,
    )
    .order("created_at", {
      ascending: false,
    })
    .limit(100);

  if (
    reportError ||
    !reportData
  ) {
    console.error(
      "Failed to load moderation reports:",
      reportError,
    );

    return [];
  }

  const reports =
    reportData as ReportRow[];

  const postIds = [
    ...new Set(
      reports.map(
        (report) => report.post_id,
      ),
    ),
  ];

  const commentIds = [
    ...new Set(
      reports
        .map(
          (report) =>
            report.comment_id,
        )
        .filter(
          (
            id,
          ): id is string =>
            Boolean(id),
        ),
    ),
  ];

  const [
    postResult,
    commentResult,
  ] = await Promise.all([
    postIds.length
      ? supabase
          .from("community_posts")
          .select(
            "id, author_id, content",
          )
          .in("id", postIds)
      : Promise.resolve({
          data: [] as PostRow[],
          error: null,
        }),
    commentIds.length
      ? supabase
          .from(
            "community_comments",
          )
          .select(
            "id, author_id, content",
          )
          .in("id", commentIds)
      : Promise.resolve({
          data: [] as CommentRow[],
          error: null,
        }),
  ]);

  const posts =
    (postResult.data ??
      []) as PostRow[];

  const comments =
    (commentResult.data ??
      []) as CommentRow[];

  const authorIds = [
    ...new Set([
      ...reports.map(
        (report) =>
          report.reporter_id,
      ),
      ...posts.map(
        (post) => post.author_id,
      ),
      ...comments.map(
        (comment) =>
          comment.author_id,
      ),
    ]),
  ];

  const {
    data: profileData,
    error: profileError,
  } = authorIds.length
    ? await supabase
        .from("profiles")
        .select(
          "id, username, display_name, avatar_id",
        )
        .in("id", authorIds)
    : {
        data: [] as ProfileRow[],
        error: null,
      };

  if (profileError) {
    console.error(
      "Failed to load report profiles:",
      profileError,
    );
  }

  const profiles = new Map(
    (
      (profileData ??
        []) as ProfileRow[]
    ).map((profile) => [
      profile.id,
      profile,
    ]),
  );

  const postsById = new Map(
    posts.map((post) => [
      post.id,
      post,
    ]),
  );

  const commentsById = new Map(
    comments.map((comment) => [
      comment.id,
      comment,
    ]),
  );

  return reports.map(
    (
      report,
    ): ModerationReport => {
      const reporter =
        profiles.get(
          report.reporter_id,
        );

      const target =
        report.target_type ===
        "comment"
          ? commentsById.get(
              report.comment_id ??
                "",
            )
          : postsById.get(
              report.post_id,
            );

      const targetAuthor =
        target
          ? profiles.get(
              target.author_id,
            )
          : null;

      const content =
        target?.content ??
        "Content is no longer available.";

      return {
        id: report.id,
        targetType:
          report.target_type,
        reason: report.reason,
        details: report.details,
        status: report.status,
        createdAt: new Date(
          report.created_at,
        ).toLocaleString(
          "en",
          {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          },
        ),
        reporter: {
          username:
            reporter?.username ??
            "unknown",
          displayName:
            reporter
              ?.display_name ??
            "Unknown Lifetopian",
          avatarSrc: `/images/avatars/${
            reporter?.avatar_id ??
            "avatar-01"
          }.jpg`,
        },
        author: targetAuthor
          ? {
              username:
                targetAuthor.username,
              displayName:
                targetAuthor.display_name,
            }
          : null,
        postId: report.post_id,
        contentPreview:
          content.length > 220
            ? `${content.slice(
                0,
                217,
              )}...`
            : content,
        resolutionNote:
          report.resolution_note,
      };
    },
  );
}
