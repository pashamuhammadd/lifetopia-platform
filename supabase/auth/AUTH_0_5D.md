# Auth 0.5D — Identity Normalization

## Final username policy

- 4–16 characters
- lowercase storage
- letters `a-z`
- numbers `0-9`
- underscore
- underscores may appear at the beginning or end
- up to two consecutive underscores
- three or more consecutive underscores are rejected
- uniqueness remains case-insensitive through PostgreSQL `citext`

## Final Display Name policy

- 2–32 characters
- letters, numbers, and spaces
- no leading or trailing spaces
- Display Names do not need to be unique

## Legacy normalization

Every existing username is converted to lowercase.

## `Sent` conflict resolution

The audit showed two accounts associated with the requested username `Sent`.

The agreed migration policy gives priority to the oldest auth account.

Final result:

```text
older account: sent
newer account: user_bb6a
```

The newer account receives the private flag:

```text
requires_username_update = true
```

The pending selection is also recorded in:

```text
auth_migration_backup.pending_username_conflicts
```

The temporary username is not a permanent product decision. A controlled
username-selection experience will be added before the platform is declared
production-ready.

## Important login note

The newer conflict account should use its email address until it selects a
permanent username. Attempting to log in with `sent` now targets the older
account, as required by the priority decision.

## Execution order

1. Run `auth-0.5d-preflight.sql`.
2. Continue only when every row returns `passed = true`.
3. Run `auth-0.5d-normalize-identities.sql`.
4. Run `auth-0.5d-verify.sql`.
5. Continue only when every verification row returns `passed = true`.

## Safety snapshot

Before changing identities, the migration creates:

```text
auth_0_5d_pre_identity_2026_07_18
```

## Phase boundary

Auth 0.5D does not yet implement:

- the username-update UI;
- the one-free-change rule;
- username-change marketplace items;
- reserved-word or profanity filtering;
- Founder/Admin/Moderator roles;
- Terms or Privacy consent;
- optimized Register and Login forms.
