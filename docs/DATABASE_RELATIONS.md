# Lifetopia World — Database Relations

> Auto-generated from Supabase PostgreSQL.  
> Do not edit manually.  
> Run `pnpm docs:generate` to update.

---

## Critical Manual Relation

```text
auth.users.id
    ↓
public.profiles.id
```

Important:

```text
profiles.id == auth.users.id
profiles.user_id does not exist
```

---

## Foreign Keys

- `public.community_bookmarks.post_id` → `public.community_posts.id`
- `public.community_bookmarks.user_id` → `public.profiles.id`
- `public.community_comments.author_id` → `public.profiles.id`
- `public.community_comments.post_id` → `public.community_posts.id`
- `public.community_likes.post_id` → `public.community_posts.id`
- `public.community_likes.user_id` → `public.profiles.id`
- `public.community_posts.author_id` → `public.profiles.id`


---

## Table Map

### `public.community_bookmarks`

Outgoing relations:
- `post_id` → `community_posts.id`
- `user_id` → `profiles.id`

Incoming relations:
- None

### `public.community_comments`

Outgoing relations:
- `author_id` → `profiles.id`
- `post_id` → `community_posts.id`

Incoming relations:
- None

### `public.community_likes`

Outgoing relations:
- `post_id` → `community_posts.id`
- `user_id` → `profiles.id`

Incoming relations:
- None

### `public.community_posts`

Outgoing relations:
- `author_id` → `profiles.id`

Incoming relations:
- `community_bookmarks.post_id` → `id`
- `community_comments.post_id` → `id`
- `community_likes.post_id` → `id`

### `public.development_logs`

Outgoing relations:
- None

Incoming relations:
- None

### `public.profiles`

Outgoing relations:
- None

Incoming relations:
- `community_bookmarks.user_id` → `id`
- `community_comments.author_id` → `id`
- `community_likes.user_id` → `id`
- `community_posts.author_id` → `id`

