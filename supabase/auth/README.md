# Lifetopia Authentication SQL

This directory stores reviewed, manually executed SQL for the Lifetopia
authentication migration.

## Auth 0.5A — Backup and migration safety

Files:

- `auth-0.5a-create-snapshot.sql`
- `auth-0.5a-verify-snapshot.sql`
- `auth-0.5a-inspect-snapshot.sql`

### Purpose

Auth 0.5A creates a private database snapshot before repairing the signup
triggers, profile security, roles, and username constraints.

It captures:

- every current `public.profiles` row;
- selected `auth.users` data required for migration recovery;
- current `profiles` columns, constraints, indexes, policies, and grants;
- active triggers on `auth.users` and `public.profiles`;
- relevant function definitions.

The auth-user snapshot deliberately excludes password hashes and token fields.

### Execution order

1. Run `auth-0.5a-create-snapshot.sql` once in Supabase SQL Editor.
2. Run `auth-0.5a-verify-snapshot.sql`.
3. Continue only when every verification row shows `passed = true`.
4. Keep `auth-0.5a-inspect-snapshot.sql` as a read-only recovery reference.

### Snapshot label

```text
auth_0_5_pre_migration_2026_07_18
```

The creation script refuses to overwrite an existing snapshot with that label.

### Security

The backup schema is:

```text
auth_migration_backup
```

Schema access is revoked from:

```text
PUBLIC
anon
authenticated
```

The application must never query or expose this schema.

### Important limitation

This snapshot is a focused migration safety measure. It is not a replacement
for a full database backup or Supabase point-in-time recovery.

### Current phase boundary

Auth 0.5A does not:

- change `profiles`;
- repair signup triggers;
- restore the orphan account;
- normalize usernames;
- change role constraints;
- change Supabase Auth dashboard settings.

Those changes belong to later Auth 0.5 phases.
