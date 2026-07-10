import type {
  DevelopmentLogAppArea,
  DevelopmentLogCategory,
} from "@repo/types";

export function resolveDevelopmentLogCategory(
  commitMessage: string,
): DevelopmentLogCategory {
  const message = commitMessage.trim().toLowerCase();

  if (message.startsWith("feat:") || message.startsWith("feature:")) {
    return "Feature";
  }

  if (message.startsWith("fix:")) {
    return "Fix";
  }

  if (message.startsWith("docs:")) {
    return "Docs";
  }

  if (message.startsWith("chore:")) {
    return "Chore";
  }

  if (message.startsWith("refactor:")) {
    return "Refactor";
  }

  if (
    message.includes("security") ||
    message.includes("auth") ||
    message.includes("cookie") ||
    message.includes("rls")
  ) {
    return "Security";
  }

  if (
    message.includes("deploy") ||
    message.includes("vercel") ||
    message.includes("workflow") ||
    message.includes("github action") ||
    message.includes("env")
  ) {
    return "Infrastructure";
  }

  return "Update";
}

export function resolveDevelopmentLogAppArea(
  changedFiles: string[],
): DevelopmentLogAppArea {
  const files = changedFiles.map((file) => file.toLowerCase());

  if (files.some((file) => file.startsWith("apps/community/"))) {
    return "Community";
  }

  if (files.some((file) => file.startsWith("apps/grants/"))) {
    return "Grant Portal";
  }

  if (files.some((file) => file.startsWith("apps/docs/"))) {
    return "Docs";
  }

  if (files.some((file) => file.startsWith("apps/play/"))) {
    return "Game";
  }

  if (files.some((file) => file.startsWith("apps/website/"))) {
    return "Website";
  }

  if (files.some((file) => file.startsWith("packages/"))) {
    return "Shared Platform";
  }

  if (
    files.some(
      (file) =>
        file.startsWith("docs/") ||
        file.endsWith(".md") ||
        file.toLowerCase().includes("readme"),
    )
  ) {
    return "Documentation";
  }

  return "Monorepo";
}

export function getShortCommitSha(commitSha: string) {
  return commitSha.slice(0, 7);
}