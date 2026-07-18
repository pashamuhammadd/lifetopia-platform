# Auth 12 — Password Recovery

## Routes

```text
/forgot-password
/reset-password?token=...
```

Both routes are `noindex`.

## APIs

```text
POST /api/auth/password-reset/request
POST /api/auth/password-reset/complete
```

## Privacy

The request API returns the same success message for:

```text
existing email
unknown email
verified email
unverified email
```

This prevents email-account enumeration.

## Reset token

- 32 random bytes;
- raw token is placed only in the email URL;
- database stores SHA-256 hash only;
- expires after 30 minutes;
- single use;
- newer requests replace older active requests;
- request cooldown is 180 seconds.

## Password validation

The completion API uses the shared Auth 4 validator:

```text
8–72 characters
uppercase
lowercase
number
symbol
not equal to username
not equal to email
```

## Delivery

Password reset mail uses the existing Website SMTP variables:

```text
SMTP_HOST
SMTP_PORT
SMTP_SECURE
SMTP_USER
SMTP_PASS
```

Official sender and reply address:

```text
contact@lifetopiaworld.io
```

## Completion

The password is changed with the server-only Supabase Admin client.

The user is not automatically logged in. The success screen returns them to
Login while preserving the original sanitized `next` destination.

## Phase boundary

Auth 12 does not yet provide the user-visible device/session list or explicit
logout of every other active device. That is completed in Auth 13 Session
Management.
