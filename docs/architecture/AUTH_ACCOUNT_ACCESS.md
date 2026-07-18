# Auth 10 — Account Access

## Route

```text
/account-access
```

The route is authenticated and `noindex`.

## Required-action order

```text
deleted
suspended
banned
verify_email
accept_legal
choose_username
guardian_consent
ready
```

The order comes from:

```text
get_my_required_account_actions()
```

## Login integration

After successful password authentication:

- suspended and banned accounts receive a read-only status screen;
- active accounts with unfinished setup are redirected to `/account-access`;
- ready accounts continue to the sanitized `next` destination;
- correct-password unverified accounts are redirected to `/check-email`
  without receiving a normal Supabase session.

Public Lifetopia pages remain readable without login.

## Legal re-consent

Existing users explicitly accept the active Terms and Privacy versions.

The server-only function:

```text
complete_lifetopia_legal_reconsent
```

writes auditable `reconsent` records and clears
`legal_reconsent_required`.

## Required username selection

The migration-conflict account replaces its temporary username through:

```text
complete_lifetopia_required_username_selection
```

The function:

- verifies account eligibility;
- updates `profiles.username`;
- synchronizes Auth user metadata;
- writes `account_username_changes`;
- uses `required_selection`;
- does not consume the one free username change;
- clears `requires_username_update`.

## Guardian consent

When the next action becomes `guardian_consent`, Account Access links to the
Auth 8 guardian workflow.

## Security

- client forms cannot insert consent directly;
- client forms cannot update usernames directly;
- shared validators reject reserved and unsafe usernames;
- database uniqueness remains authoritative;
- all `next` destinations use the shared redirect sanitizer.
