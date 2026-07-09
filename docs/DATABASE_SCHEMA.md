# Lifetopia World — Database Schema

> Auto-generated from Supabase PostgreSQL.  
> Do not edit manually.  
> Run `pnpm docs:generate` to update.

---

## Critical Auth Rule

```text
profiles.id == auth.users.id
```

The `profiles` table does not have `user_id`.

Correct:

```ts
.eq("id", user.id)
```

Incorrect:

```ts
.eq("user_id", user.id)
```

---

## Table: `public.community_bookmarks`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `post_id` | `uuid` | NO | PK, FK → community_posts.id | `` |
| `user_id` | `uuid` | NO | PK, FK → profiles.id | `` |
| `created_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.community_comments`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `id` | `uuid` | NO | PK | `gen_random_uuid()` |
| `post_id` | `uuid` | NO | FK → community_posts.id | `` |
| `author_id` | `uuid` | NO | FK → profiles.id | `` |
| `content` | `text` | NO |  | `` |
| `created_at` | `timestamp with time zone` | NO |  | `now()` |
| `updated_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.community_likes`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `post_id` | `uuid` | NO | PK, FK → community_posts.id | `` |
| `user_id` | `uuid` | NO | PK, FK → profiles.id | `` |
| `created_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.community_posts`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `id` | `uuid` | NO | PK | `gen_random_uuid()` |
| `author_id` | `uuid` | NO | FK → profiles.id | `` |
| `content` | `text` | NO |  | `` |
| `category` | `text` | NO |  | `'General'::text` |
| `created_at` | `timestamp with time zone` | NO |  | `now()` |
| `updated_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.profiles`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `id` | `uuid` | NO | PK | `` |
| `username` | `citext` | NO |  | `` |
| `display_name` | `text` | NO |  | `` |
| `gender` | `text` | NO |  | `` |
| `avatar_id` | `text` | NO |  | `'avatar-01'::text` |
| `country_code` | `text` | NO |  | `` |
| `country_name` | `text` | NO |  | `` |
| `date_of_birth` | `date` | NO |  | `` |
| `account_type` | `text` | NO |  | `'player'::text` |
| `role` | `text` | NO |  | `'player'::text` |
| `created_at` | `timestamp with time zone` | NO |  | `now()` |
| `updated_at` | `timestamp with time zone` | NO |  | `now()` |

