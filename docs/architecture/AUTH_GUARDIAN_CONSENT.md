# Auth 8 — Guardian Consent

## Account route

```text
/guardian-consent
```

The signed-in account submits a private parent or guardian email.

## Guardian route

```text
/guardian-consent/confirm?token=...
```

Opening the email does not approve the account. The guardian must explicitly:

- review the account identity;
- review the current Terms;
- review the current Privacy Policy;
- approve or decline.

This avoids accidental approval by email-link scanners.

## APIs

```text
POST /api/auth/guardian/request
POST /api/auth/guardian/respond
```

## Eligibility

A guardian request is accepted only when:

- the account is active;
- email is verified;
- current legal documents are accepted;
- required username selection is complete;
- exact age data indicates guardian consent is required;
- guardian approval is not already complete.

## Tokens

- 32 random bytes;
- raw token exists only in the email URL;
- database stores SHA-256 hash only;
- link expires after seven days;
- only one pending request exists per user;
- request cooldown is 180 seconds.

## SMTP

The Website sends guardian mail through generic SMTP using:

```text
SMTP_HOST
SMTP_PORT
SMTP_SECURE
SMTP_USER
SMTP_PASS
```

The sender and reply address are:

```text
contact@lifetopiaworld.io
```

These credentials may match the SMTP provider configured for Supabase Auth,
but they must also be available to the Website server environment.

## Access after approval

`profile_private.guardian_consent_status` becomes `approved` and
`guardian_consent_verified_at` receives the approval time.

The existing `get_my_required_account_actions()` function will then allow the
account to become interaction, reward, and wallet eligible when no other
requirements remain.

## Phase boundary

Auth 8 does not yet:

- enforce Community write restrictions;
- add persistent IP abuse controls or CAPTCHA;
- implement password reset;
- create the session-management interface.
