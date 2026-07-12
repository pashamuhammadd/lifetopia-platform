# Lifetopia World — Database Types

> Auto-generated from Supabase PostgreSQL.  
> Do not edit manually.  
> Run `pnpm docs:generate` to update.

---

## TypeScript Interfaces

export type CommunityBookmark = {
  post_id: string;
  user_id: string;
  created_at: string;
};

export type CommunityComment = {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type CommunityLike = {
  post_id: string;
  user_id: string;
  created_at: string;
};

export type CommunityPost = {
  id: string;
  author_id: string;
  content: string;
  category: string;
  created_at: string;
  updated_at: string;
};

export type DevelopmentLog = {
  id: string;
  repo: string;
  branch: string;
  commit_sha: string;
  commit_message: string;
  commit_url: string | null;
  author_name: string | null;
  author_username: string | null;
  app_area: string;
  category: string;
  changed_files: Record<string, unknown>;
  is_public: boolean;
  pushed_at: string;
  created_at: string;
};

export type Profile = {
  id: string;
  username: string;
  display_name: string;
  gender: string;
  avatar_id: string;
  country_code: string;
  country_name: string;
  date_of_birth: string;
  account_type: string;
  role: string;
  created_at: string;
  updated_at: string;
};

---

## AI Instructions

- Treat these generated types as the source of truth.
- Do not invent fields.
- Do not rename snake_case fields unless explicitly mapping them.
- Use `display_name`, not `displayName`, when reading directly from Supabase.
- Use `country_name`, not `country`.
- Use `avatar_id`, not `avatar`.
- Use `profiles.id`, not `profiles.user_id`.

