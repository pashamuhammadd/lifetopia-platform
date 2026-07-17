# Auth 3 — Legacy Account Migration

## Purpose

Auth 3 preserves every existing Lifetopia account while recording the actions
required before an account receives full interactive, reward, and wallet
access.

No existing account is deleted or silently considered legally accepted.

## Migration version

```text
legacy_auth_v1_2026_07_18
```

## Legacy migration ledger

`account_legacy_migrations` records:

- original Auth account creation time;
- legacy and final role;
- email-verification requirement;
- legal re-consent requirement;
- guardian-consent state;
- required username selection;
- preservation of the one free username change.

Users can read only their own record. Clients cannot create, update, or delete
migration records.

## Required-actions function

Authenticated products can call:

```text
get_my_required_account_actions()
```

It returns:

- the next required account action;
- email, legal, guardian, and username requirements;
- read eligibility;
- interaction eligibility;
- reward eligibility;
- wallet-link eligibility.

This phase defines eligibility but does not yet enforce it in Community RLS or
the Website interface.

## Existing account behavior

- Unverified accounts can still sign in and read.
- Existing accounts must accept the active Terms and Privacy versions.
- Users aged 13–17 require guardian approval.
- The reviewed temporary username account must choose a permanent username.
- Migration and required username selection do not consume the one free
  username change.
- Suspended and banned accounts are designed to remain readable but cannot
  interact once enforcement is added.

## Phase boundary

Auth 3 does not yet:

- resend verification emails;
- display required-action screens;
- write legal consent;
- send guardian emails;
- enforce Community interaction restrictions;
- create the optimized registration endpoint.
