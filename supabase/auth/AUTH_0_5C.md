# Auth 0.5C — Profile Privacy Hardening

## Purpose

Auth 0.5C prevents exact dates of birth and account-controlled security fields
from being exposed or edited through the public `profiles` table.

## New data boundary

### `public.profiles`

Public account identity:

- username
- Display Name
- avatar
- country
- gender
- role
- account type
- join timestamps

The application can continue using existing foreign-key relations to
`profiles` for Community posts and comments.

### `public.profile_private`

Private account information:

- exact date of birth

Authenticated users can read only their own private row. They cannot update
it directly. Future Admin workflows will use trusted server-side operations.

### `public.public_profiles`

Public-safe view containing profile identity plus calculated age. It never
returns an exact date of birth.

## Direct profile update permissions

Authenticated users may directly update only:

- `avatar_id`
- `country_code`
- `country_name`

They cannot directly update:

- username
- Display Name
- gender
- role
- account type
- IDs or timestamps
- exact date of birth

Username, Display Name, gender, role, and birth-date changes require controlled
server or Admin workflows in later phases.

## Execution order

1. Run `auth-0.5c-preflight.sql`.
2. Continue only when every row returns `passed = true`.
3. Run `auth-0.5c-harden-profile-privacy.sql`.
4. Run `auth-0.5c-verify.sql`.
5. Continue only when every verification row returns `passed = true`.

## Safety snapshot

The migration creates:

```text
auth_0_5c_pre_privacy_2026_07_18
```

inside the private `auth_migration_backup` schema before moving any data.

## Phase boundary

Auth 0.5C does not:

- normalize usernames;
- increase username or Display Name limits;
- resolve the pending `Sent` username conflict;
- create Founder/Admin/Moderator roles;
- add account status or consent fields;
- change Supabase Auth dashboard settings.
