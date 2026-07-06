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

