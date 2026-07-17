# Auth 2 — Authentication Data Model

## Final primary roles

- `founder`
- `admin`
- `moderator`
- `developer`
- `artist`
- `alpha_tester`
- `beta_tester`
- `lifetopian`

Legacy `player` roles are migrated to `lifetopian`.

## Private account state

`profile_private` now stores:

- account status
- suspension end
- visible restriction reason
- deletion schedule and completion time
- synchronized email verification time
- legal re-consent requirement
- guardian-consent requirement and status
- forced username-selection state
- one-free-username-change state

## Account statuses

- `active`
- `suspended`
- `banned`
- `deleted`

This phase creates the data model only. Community and reward RLS policies are
not yet changed to block interaction.

## Username history

`account_username_changes` stores controlled username changes. Authentication
clients may read their own history but cannot create or modify entries.

Migration changes and required conflict resolution do not consume the one free
username change.

## Guardian consent

`guardian_consents` stores:

- private guardian email
- hashed verification token
- linked legal-document versions
- request and response timestamps
- pending, approved, rejected, revoked, or expired status

Clients cannot create consent records directly.

## Email verification

`profile_private.email_verified_at` mirrors
`auth.users.email_confirmed_at`.

The sync trigger is:

```text
on_auth_user_email_verification_changed
```

## Safe account-state API

Authenticated applications can call:

```text
get_my_account_state()
```

It returns only the current user's account state and does not expose another
user's private data.

## Phase boundary

Auth 2 does not yet:

- enforce interaction blocking;
- create the optimized Registration API;
- create guardian email delivery;
- create Admin moderation actions;
- assign the Founder account;
- add badges;
- implement username-change payments.
