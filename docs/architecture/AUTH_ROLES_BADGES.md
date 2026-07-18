# Auth 15 — Roles and Badges

## Official primary roles

```text
founder
admin
moderator
developer
artist
alpha_tester
beta_tester
lifetopian
```

Every profile has exactly one primary role in:

```text
profiles.role
```

Legacy `player` values are migrated to `lifetopian`.

## Public badges

A profile can have multiple badges in:

```text
profile_badges
```

The initial badge catalog uses the same eight official identity codes. This
allows combinations such as:

```text
Primary role: developer
Badges: alpha_tester, beta_tester
```

The primary role is displayed separately and a duplicate badge with the same
code should be hidden by the UI.

## Assignment rules

Auth 15 creates service-role-only functions:

```text
assign_lifetopia_primary_role
grant_lifetopia_badge
revoke_lifetopia_badge
```

Rules:

```text
Founder role/badge
Reserved for Auth 16 provisioning

Admin or Moderator role/badge
Founder only

Developer, Artist, Alpha Tester, Beta Tester, Lifetopian
Founder or Admin
```

Moderator cannot assign roles or badges.

## Audit

Private history tables:

```text
account_role_changes
account_badge_changes
```

Public identity tables:

```text
lifetopia_role_catalog
badge_catalog
profile_badges
```

Users can read official roles and public badges, but cannot assign or revoke
them directly.

## Signup compatibility

The existing signup trigger still submits the legacy value `player`.

Auth 15 adds a guarded `BEFORE INSERT OR UPDATE OF role` compatibility trigger
that converts only:

```text
player → lifetopian
```

No client metadata can assign an elevated role.

## Shared TypeScript definitions

```text
packages/lib/identity.ts
```

Website and Community should import role labels and badge definitions from this
single source rather than maintaining separate mappings such as:

```text
admin → World Creator
developer → World Builder
moderator → Guardian
```

Those legacy display mappings are no longer authoritative.

## Community integration

The Community sidebar now:

```text
reads the real primary role
reads public profile badges
removes the dummy Alpha Pioneer badge
uses the shared identity definitions
```

Broader Profile and Feed rendering can reuse:

```text
ProfileIdentityBadges
getLifetopiaRoleLabel
getLifetopiaBadgeDefinition
```

## Founder boundary

Auth 15 intentionally does not create the Founder account or promote an
existing account to Founder.

That one-time provisioning belongs to Auth 16.
