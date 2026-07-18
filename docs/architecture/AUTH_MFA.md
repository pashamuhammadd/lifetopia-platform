# Auth 14 — Optional TOTP MFA

## Product policy

MFA is optional for Lifetopia accounts.

When at least one verified factor exists:

```text
Password login
→ AAL1 session
→ TOTP challenge
→ AAL2 session
→ account access checks
→ destination
```

## Routes

```text
/mfa-challenge
/mfa-recovery
/account/security/mfa
```

All routes are `noindex`.

## Supabase source of truth

Supabase Auth remains authoritative for:

```text
factor enrollment
factor verification
factor removal
TOTP secrets
challenges
AAL1 / AAL2
session refresh
```

Lifetopia never stores a TOTP secret, QR code, six-digit code, or password in a
public table.

## Enrollment

The settings flow calls:

```text
mfa.enroll({ factorType: "totp" })
mfa.challengeAndVerify(...)
```

Enrollment returns a QR code and manual secret only to the authenticated
browser response.

After a factor is verified, Supabase promotes the current session to AAL2 and
logs out the account's other sessions.

## Login challenge

After successful password authentication:

```text
currentLevel = aal1
nextLevel = aal2
```

causes the Website to redirect to:

```text
/mfa-challenge
```

The destination path and query are preserved.

## Recovery

Supabase does not provide MFA recovery codes.

Lifetopia therefore supports:

```text
multiple verified authenticator factors
second factor as backup
support-assisted recovery if every factor is lost
```

Support contact:

```text
contact@lifetopiaworld.io
```

Support does not remove MFA based only on a username, wallet address, or social
message.

## Removing a factor

Removing a verified factor requires:

```text
current password
current TOTP code from any verified factor
AAL2 verification
```

After removal, the Website calls `refreshSession()` so the AAL claim is updated
without waiting for the normal refresh interval.

## Sensitive routes

When MFA is enrolled, these central account-security operations require AAL2:

```text
/account/security/mfa
/account/sessions
specific session revocation
logout other devices
logout all devices
```

Normal local logout remains available without an extra challenge.

## Audit

`account_mfa_events` stores only:

```text
user ID
factor ID
event type
success/failure
short error code
timestamp
```

It never stores secrets or verification codes.

## Dashboard dependency

Supabase Dashboard must keep TOTP enrollment and TOTP verification enabled.

No new Website environment variables or npm packages are required.
