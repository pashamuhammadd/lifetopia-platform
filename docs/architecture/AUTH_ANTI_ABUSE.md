# Auth 11 — Login Anti-Abuse

## Risk dimensions

The Website creates HMAC-SHA256 hashes for:

```text
normalized username/email
client IP address
IP + identifier pair
```

Raw IP addresses and raw identifiers are never stored in the login security
audit.

Required secret:

```text
AUTH_ABUSE_HASH_SECRET
```

Use at least 32 random characters and keep it stable across deployments.

## Rolling policy

```text
0–2 failed credentials
Normal login

3–4 failed credentials within 15 minutes
Cloudflare Turnstile required

5 failed credentials within 15 minutes
Login cooldown until the rolling window falls below five failures
```

A successful credential result resets pair and identifier risk.

IP-only protection uses higher thresholds:

```text
10 failures
Turnstile required

25 failures
Temporary cooldown
```

The higher IP threshold reduces false positives for homes, schools, offices,
mobile carriers, and other shared networks.

## Audit outcomes

```text
pending
success
invalid_credentials
email_verification_required
restricted
account_unavailable
rate_limited
captcha_required
captcha_failed
system_error
```

## Cloudflare Turnstile

Client site key:

```text
NEXT_PUBLIC_TURNSTILE_SITE_KEY
```

Server secret:

```text
TURNSTILE_SECRET_KEY
```

The login form renders Turnstile only when the server marks the current risk as
suspicious. Every provided token is verified on the server.

Tokens are not trusted from browser state alone.

## API behavior

```text
captcha_required       HTTP 403
captcha_invalid        HTTP 403
too_many_attempts      HTTP 429 + Retry-After
security unavailable   HTTP 503
invalid credentials    HTTP 401 generic message
```

Username-not-found, email-not-found, and wrong-password responses remain
indistinguishable.

## Data access

`account_auth_attempts` is server-only:

- RLS enabled;
- no anonymous privileges;
- no authenticated-client privileges;
- reservation and completion functions are service-role only.

## Retention

Auth 11 keeps the security audit for investigation and later device-security
work. A production retention job should be added during Auth 19 QA after the
final compliance and incident-response retention period is chosen.

## Phase boundary

Auth 11 does not yet add:

- new-device email notifications;
- user-visible device history;
- logout of individual devices;
- password recovery;
- MFA;
- wallet security.
