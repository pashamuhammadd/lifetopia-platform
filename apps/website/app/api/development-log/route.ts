import {
  timingSafeEqual,
} from "node:crypto";

import { NextResponse } from "next/server";

import { createAdminClient } from "@repo/lib/supabase/admin";
import {
  resolveDevelopmentLogAppArea,
  resolveDevelopmentLogCategory,
} from "@repo/services/development-log";
import type {
  CreateDevelopmentLogInput,
} from "@repo/types/development-log";

export const runtime = "nodejs";

const MAX_COMMITS_PER_REQUEST = 50;
const MAX_CHANGED_FILES_PER_COMMIT = 250;
const MAX_COMMIT_MESSAGE_LENGTH = 500;
const MAX_FILE_PATH_LENGTH = 500;

type DevelopmentLogRequestBody = {
  repo?: string;
  branch?: string;
  commits?: Array<{
    commit_sha?: string;
    commit_message?: string;
    commit_url?: string | null;
    author_name?: string | null;
    author_username?: string | null;
    changed_files?: string[];
    pushed_at?: string;
  }>;
};

function getRequestSecret(request: Request) {
  return request.headers.get(
    "x-lifetopia-devlog-secret",
  );
}

function isValidSecret(request: Request) {
  const expectedSecret =
    process.env.DEVELOPMENT_LOG_SECRET;

  const requestSecret =
    getRequestSecret(request);

  if (!expectedSecret || !requestSecret) {
    return false;
  }

  const expectedBuffer =
    Buffer.from(expectedSecret);

  const requestBuffer =
    Buffer.from(requestSecret);

  if (
    expectedBuffer.length !==
    requestBuffer.length
  ) {
    return false;
  }

  return timingSafeEqual(
    expectedBuffer,
    requestBuffer,
  );
}

function normalizeRequiredString(
  value: unknown,
  maximumLength: number,
) {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim();

  if (
    !normalized ||
    normalized.length > maximumLength
  ) {
    return null;
  }

  return normalized;
}

function normalizeOptionalString(
  value: unknown,
  maximumLength: number,
) {
  if (
    value === null ||
    value === undefined
  ) {
    return null;
  }

  return normalizeRequiredString(
    value,
    maximumLength,
  );
}

function normalizeCommitSha(value: unknown) {
  const commitSha =
    normalizeRequiredString(value, 64);

  if (
    !commitSha ||
    !/^[a-f0-9]{7,64}$/i.test(commitSha)
  ) {
    return null;
  }

  return commitSha;
}

function normalizePushedAt(value: unknown) {
  const pushedAt =
    normalizeRequiredString(value, 100);

  if (!pushedAt) {
    return null;
  }

  const parsedDate = new Date(pushedAt);

  if (
    !Number.isFinite(
      parsedDate.getTime(),
    )
  ) {
    return null;
  }

  return parsedDate.toISOString();
}

function normalizeCommitUrl(value: unknown) {
  const commitUrl =
    normalizeOptionalString(value, 500);

  if (!commitUrl) {
    return null;
  }

  try {
    const parsedUrl = new URL(commitUrl);

    if (
      parsedUrl.protocol !== "https:" ||
      parsedUrl.hostname !== "github.com"
    ) {
      return null;
    }

    return parsedUrl.toString();
  } catch {
    return null;
  }
}

function normalizeChangedFiles(
  changedFiles: unknown,
) {
  if (!Array.isArray(changedFiles)) {
    return [];
  }

  return Array.from(
    new Set(
      changedFiles
        .slice(
          0,
          MAX_CHANGED_FILES_PER_COMMIT,
        )
        .map((file) =>
          normalizeRequiredString(
            file,
            MAX_FILE_PATH_LENGTH,
          ),
        )
        .filter(
          (file): file is string =>
            Boolean(file),
        ),
    ),
  );
}

function normalizeCommitInput(
  repo: string,
  branch: string,
  commit: NonNullable<
    DevelopmentLogRequestBody["commits"]
  >[number],
): CreateDevelopmentLogInput | null {
  const commitSha =
    normalizeCommitSha(commit.commit_sha);

  const commitMessage =
    normalizeRequiredString(
      commit.commit_message,
      MAX_COMMIT_MESSAGE_LENGTH,
    );

  const pushedAt =
    normalizePushedAt(commit.pushed_at);

  if (
    !commitSha ||
    !commitMessage ||
    !pushedAt
  ) {
    return null;
  }

  const changedFiles =
    normalizeChangedFiles(
      commit.changed_files,
    );

  return {
    repo,
    branch,
    commit_sha: commitSha,
    commit_message: commitMessage,
    commit_url: normalizeCommitUrl(
      commit.commit_url,
    ),
    author_name: normalizeOptionalString(
      commit.author_name,
      150,
    ),
    author_username:
      normalizeOptionalString(
        commit.author_username,
        100,
      ),
    app_area:
      resolveDevelopmentLogAppArea(
        changedFiles,
      ),
    category:
      resolveDevelopmentLogCategory(
        commitMessage,
      ),
    changed_files: changedFiles,
    pushed_at: pushedAt,
  };
}

export async function POST(
  request: Request,
) {
  if (!isValidSecret(request)) {
    return NextResponse.json(
      {
        error: "Unauthorized.",
      },
      {
        status: 401,
      },
    );
  }

  let body: DevelopmentLogRequestBody;

  try {
    body =
      (await request.json()) as DevelopmentLogRequestBody;
  } catch {
    return NextResponse.json(
      {
        error: "Invalid request body.",
      },
      {
        status: 400,
      },
    );
  }

  const repo =
    normalizeRequiredString(
      body.repo,
      200,
    );

  const branch =
    normalizeOptionalString(
      body.branch,
      200,
    ) ?? "main";

  if (!repo) {
    return NextResponse.json(
      {
        error:
          "Repository name is required.",
      },
      {
        status: 400,
      },
    );
  }

  if (!body.commits?.length) {
    return NextResponse.json(
      {
        error: "No commits provided.",
      },
      {
        status: 400,
      },
    );
  }

  const receivedCommitCount =
    body.commits.length;

  const commitsToProcess =
    body.commits.slice(
      0,
      MAX_COMMITS_PER_REQUEST,
    );

  const logs = commitsToProcess
    .map((commit) =>
      normalizeCommitInput(
        repo,
        branch,
        commit,
      ),
    )
    .filter(
      (
        commit,
      ): commit is CreateDevelopmentLogInput =>
        Boolean(commit),
    );

  if (!logs.length) {
    return NextResponse.json(
      {
        error:
          "No valid commits provided.",
      },
      {
        status: 400,
      },
    );
  }

  try {
    const supabase =
      createAdminClient();

    const { error } = await supabase
      .from("development_logs")
      .upsert(logs, {
        onConflict: "repo,commit_sha",
      });

    if (error) {
      console.error(
        "[development-log] Upsert failed:",
        error.message,
      );

      return NextResponse.json(
        {
          error:
            "Failed to save development logs.",
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json({
      success: true,
      received: receivedCommitCount,
      processed: commitsToProcess.length,
      saved: logs.length,
      truncated:
        receivedCommitCount >
        MAX_COMMITS_PER_REQUEST,
    });
  } catch (error) {
    console.error(
      "[development-log] Unexpected API error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Failed to save development logs.",
      },
      {
        status: 500,
      },
    );
  }
}