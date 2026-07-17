# Auth 6 — Registration UI

## Registration order

The Website registration form now uses four named stages:

1. Identity
2. Security
3. Profile
4. Confirmation

This replaces the previous avatar-first order while preserving the existing
Lifetopia visual identity.

## Data flow

The form no longer calls:

```ts
supabase.auth.signUp()
```

from the browser.

It sends normalized registration data to:

```text
POST /api/auth/register
```

The server remains authoritative for validation, legal versions, username
uniqueness, user creation, and consent finalization.

## Shared validation

Every step uses `packages/services/auth-validation.ts`.

Client-side validation is for immediate feedback only. The API repeats the
entire validation before creating an account.

## Identity stage

- username 4–16;
- lowercase normalization;
- reserved, impersonation, scam, and profanity checks;
- debounced username availability;
- Display Name 2–32.

Username availability is not treated as a guarantee. Database uniqueness is
still authoritative during account creation.

## Security stage

- email normalization;
- password 8–72;
- uppercase, lowercase, number, and symbol;
- password-strength feedback;
- password show/hide;
- Caps Lock warning;
- browser password-manager autocomplete;
- password confirmation.

## Profile stage

- official avatar selection;
- Male or Female;
- country;
- date of birth;
- minimum age 13;
- guardian-consent notice for ages 13–17.

## Confirmation stage

- account summary;
- separate required Terms and Privacy checkboxes;
- exact active legal version;
- legal documents open in a new tab so form state is preserved.

## Success behavior

Auth 6 confirms that the account was created but does not claim that a
verification email has already been sent.

Auth 7 adds:

- verification-email delivery;
- check-email route;
- resend cooldown;
- verified callback and access refresh.

Do not perform a valid production registration test until Auth 7 is ready
unless the test account will be cleaned up manually.
