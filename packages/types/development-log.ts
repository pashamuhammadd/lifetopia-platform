export type DevelopmentLogCategory =
  | "Feature"
  | "Fix"
  | "Docs"
  | "Chore"
  | "Refactor"
  | "Security"
  | "Infrastructure"
  | "Update";

export type DevelopmentLogAppArea =
  | "Website"
  | "Community"
  | "Grant Portal"
  | "Docs"
  | "Game"
  | "Shared Platform"
  | "Documentation"
  | "Monorepo";

export type DevelopmentLog = {
  id: string;
  repo: string;
  branch: string;
  commit_sha: string;
  commit_message: string;
  commit_url: string | null;
  author_name: string | null;
  author_username: string | null;
  app_area: DevelopmentLogAppArea | string;
  category: DevelopmentLogCategory | string;
  changed_files: string[];
  is_public: boolean;
  pushed_at: string;
  created_at: string;
};

export type CreateDevelopmentLogInput = {
  repo: string;
  branch: string;
  commit_sha: string;
  commit_message: string;
  commit_url?: string | null;
  author_name?: string | null;
  author_username?: string | null;
  app_area?: DevelopmentLogAppArea;
  category?: DevelopmentLogCategory;
  changed_files?: string[];
  pushed_at: string;
};