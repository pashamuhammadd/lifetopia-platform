# Auth 1 — Terms, Privacy, and Consent Foundation

## Website routes

```text
/terms
/privacy
```

Both routes are public and indexable.

Current document version:

```text
2026.07.18
```

## Database tables

### `legal_document_versions`

Public registry for Terms and Privacy versions.

Only the service role can create or modify versions. Published documents are
readable by guests and authenticated users.

### `account_legal_consents`

Private, append-only-style consent history linking an account to the exact
document version it accepted.

Users may read their own consent history through RLS. Clients cannot insert,
update, or delete consent records directly. The secure Registration API and
future re-consent flow will write records through trusted server-side code.

## Existing users

Auth 1 does not silently mark existing users as accepted. They will be asked to
accept the active versions through a later controlled re-consent experience.

## Current boundary

Auth 1 does not yet:

- modify the Register form;
- write consent during signup;
- block interactions for missing consent;
- implement guardian consent;
- add optional marketing email consent.
