# Lifetopia Authentication SQL

This directory stores reviewed, manually executed SQL for the Lifetopia
authentication migration.

## Auth 0.5B v2 — Signup trigger repair

The first Auth 0.5B attempt rolled back safely because the orphan auth user
requested the username `Sent`, which was already attached to another profile.

The diagnosis confirmed:

- orphan account ID:
  `b4c4cc80-69ce-4bb9-9b30-f7627e7049de`;
- existing `Sent` profile ID:
  `bb6a4f2b-debe-44d7-98be-17c4f94acf5f`;
- the orphan auth account is older;
- both legacy triggers remained active after rollback;
- the canonical replacement function did not persist.

Auth 0.5B v2 deliberately avoids disrupting the existing profile during the
signup-repair phase.

It restores the orphan profile with:

```text
user_b4c4
```

and privately records:

```text
desired username: Sent
priority: older auth account
status: pending
```

The later identity-migration phase will resolve this conflict according to
the agreed rule that the oldest account receives final username priority.

## Required execution order

1. `auth-0.5b-preflight.sql`
2. Continue only when every row has `passed = true`.
3. `auth-0.5b-repair-signup.sql`
4. `auth-0.5b-verify.sql`
5. Continue only when every row has `passed = true`.

## Result of the migration

- one canonical signup trigger;
- obsolete trigger functions removed;
- orphan profile restored;
- existing `Sent` profile unchanged;
- username conflict recorded privately;
- role and account type cannot be supplied from signup metadata.

## Phase boundary

Auth 0.5B does not:

- assign final ownership of the conflicting username;
- normalize usernames;
- expand username or Display Name limits;
- create new roles;
- change profile privacy or RLS;
- change Supabase dashboard authentication settings.
