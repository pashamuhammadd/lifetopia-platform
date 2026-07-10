import { NextResponse } from "next/server";
import { createAdminClient } from "@repo/lib/supabase/admin";
import {
  resolveDevelopmentLogAppArea,
  resolveDevelopmentLogCategory,
} from "@repo/services/development-log";
import type { CreateDevelopmentLogInput } from "@repo/types/development-log";

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
  return request.headers.get("x-lifetopia-devlog-secret");
}

function isValidSecret(request: Request) {
  const expectedSecret = process.env.DEVELOPMENT_LOG_SECRET;
  const requestSecret = getRequestSecret(request);

  return Boolean(expectedSecret && requestSecret && requestSecret === expectedSecret);
}

function normalizeChangedFiles(changedFiles: unknown): string[] {
  if (!Array.isArray(changedFiles)) return [];

  return changedFiles.filter(
    (file): file is string => typeof file === "string" && file.trim().length > 0,
  );
}

function normalizeCommitInput(
  repo: string,
  branch: string,
  commit: NonNullable<DevelopmentLogRequestBody["commits"]>[number],
): CreateDevelopmentLogInput | null {
  if (!commit.commit_sha || !commit.commit_message || !commit.pushed_at) {
    return null;
  }

  const changedFiles = normalizeChangedFiles(commit.changed_files);

  return {
    repo,
    branch,
    commit_sha: commit.commit_sha,
    commit_message: commit.commit_message,
    commit_url: commit.commit_url ?? null,
    author_name: commit.author_name ?? null,
    author_username: commit.author_username ?? null,
    app_area: resolveDevelopmentLogAppArea(changedFiles),
    category: resolveDevelopmentLogCategory(commit.commit_message),
    changed_files: changedFiles,
    pushed_at: commit.pushed_at,
  };
}

export async function POST(request: Request) {
  if (!isValidSecret(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: DevelopmentLogRequestBody;

  try {
    body = (await request.json()) as DevelopmentLogRequestBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const repo = body.repo?.trim();
  const branch = body.branch?.trim() || "main";

  if (!repo) {
    return NextResponse.json(
      { error: "Repository name is required." },
      { status: 400 },
    );
  }

  if (!body.commits?.length) {
    return NextResponse.json(
      { error: "No commits provided." },
      { status: 400 },
    );
  }

  const logs = body.commits
    .map((commit) => normalizeCommitInput(repo, branch, commit))
    .filter((commit): commit is CreateDevelopmentLogInput => Boolean(commit));

  if (!logs.length) {
    return NextResponse.json(
      { error: "No valid commits provided." },
      { status: 400 },
    );
  }

  const supabase = createAdminClient();

  const { error } = await supabase.from("development_logs").upsert(logs, {
    onConflict: "repo,commit_sha",
  });

  if (error) {
    return NextResponse.json(
      { error: "Failed to save development logs." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    inserted: logs.length,
  });
}