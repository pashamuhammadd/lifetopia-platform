# Auth 7 — Email Verification

## Routes

```text
/check-email
/auth/confirm
/email-verified
/api/auth/resend-verification
```

`/check-email` and `/email-verified` are `noindex`.

## Registration behavior

After the secure Registration API creates and finalizes the account, it
requests a Supabase signup-confirmation email. Register state is stored in
`sessionStorage`, so the email address is not placed in the URL.

The user is redirected to:

```text
/check-email
```

No authenticated session is created by registration itself.

## Verification callback

The Supabase email template links to:

```text
/auth/confirm
```

The route verifies the token hash with `verifyOtp`, creates the cookie-based
session, and redirects to `/email-verified`.

The existing `on_auth_user_email_verification_changed` trigger synchronizes
`auth.users.email_confirmed_at` into
`profile_private.email_verified_at`.

## Resend cooldown

`account_email_verification_deliveries` enforces a database-backed,
server-only 180-second cooldown for each unverified account.

The API always uses a generic response for valid email syntax so it does not
confirm whether an account exists.

## Supabase email template

Set the confirmation email link to:

```html
<a href="{{ .RedirectTo }}&token_hash={{ .TokenHash }}&type=email">
  Verify email address
</a>
```

The Registration and Resend APIs pass `/auth/confirm?next=...` as
`.RedirectTo`.

## Required URL configuration

Production Site URL:

```text
https://lifetopiaworld.io
```

Required redirect URLs:

```text
https://lifetopiaworld.io/auth/confirm
https://lifetopiaworld.io/auth/confirm/**
http://localhost:3000/auth/confirm
http://localhost:3000/auth/confirm/**
```

Exact production paths are preferred.

## Required environment variable

Website:

```text
NEXT_PUBLIC_SITE_URL=https://lifetopiaworld.io
```

Local development:

```text
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## SMTP requirement

Supabase's built-in email service is suitable only for restricted testing.
Production verification delivery requires Custom SMTP.

The official Lifetopia contact email remains:

```text
contact@lifetopiaworld.io
```

Use the official Lifetopia email as the SMTP sender and reply address:

```text
contact@lifetopiaworld.io
```

## Phase boundary

Auth 7 does not yet:

- enforce Community interaction restrictions;
- create guardian-email approval;
- add persistent IP rate limiting or CAPTCHA;
- implement password reset;
- build session management.
