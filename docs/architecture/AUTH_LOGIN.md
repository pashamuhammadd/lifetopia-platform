# Auth 9 — Login Optimization

## Supported credentials

```text
Username + password
Email + password
```

Username input is trimmed and normalized to lowercase before resolution.

## Credential privacy

All username-not-found, email-not-found, and wrong-password outcomes return:

```text
Username/email or password is incorrect.
```

The route does not expose which credential field matched an account.

## Redirects

The login route and form use the shared auth redirect sanitizer.

Fallback:

```text
/
```

Allowed destinations include Lifetopia's approved website, Community, and local
development origins. Exact paths and query strings are preserved.

## Remember Me

Unchecked:

```text
Browser-session cookies
```

Checked:

```text
Maximum cookie lifetime: 7 days
```

The preference cookie is shared across approved Lifetopia subdomains when:

```env
NEXT_PUBLIC_AUTH_COOKIE_DOMAIN=.lifetopiaworld.io
```

## Account states

```text
active      normal access
suspended   login succeeds, read-only mode
banned      login succeeds, read-only mode
deleted     login is rejected
```

The login API resolves the authoritative private account state after successful
Supabase authentication.

## Phase boundary

Auth 9 does not add persistent login-attempt storage, CAPTCHA, device history,
new-device warning email, password recovery, or session-management screens.
Those are handled in later authentication phases.
