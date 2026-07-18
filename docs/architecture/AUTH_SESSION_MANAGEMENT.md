# Auth 13 — Session Management

## Central route

```text
/account/sessions
```

This Website route is authenticated and `noindex`.

Community Settings links to the central route because the Website and
Community share the same Lifetopia session cookies.

## Session source

Supabase creates one row in:

```text
auth.sessions
```

for each active account session. The access-token `session_id` claim identifies
the current row.

Auth 13 does not create a duplicate session source of truth.

## Session information

The guarded listing function returns only rows owned by the authenticated user:

```text
session ID
current-device flag
created time
last refresh/activity time
optional expiration
user agent
masked network hint
authentication assurance level
```

Raw IP addresses are never returned to the browser. IPv4 addresses are masked
to `/24`; IPv6 addresses are masked to `/64`.

## Logout scopes

```text
Current device
supabase.auth.signOut({ scope: "local" })

Other devices
supabase.auth.signOut({ scope: "others" })

All devices
supabase.auth.signOut({ scope: "global" })
```

Community's normal Logout button now uses `local`, so it no longer signs the
account out everywhere.

## Specific-device revocation

Supabase JavaScript does not provide a public method for revoking one arbitrary
session by ID.

The guarded function:

```text
revoke_my_lifetopia_session(session_id)
```

therefore deletes only a non-current `auth.sessions` row owned by the caller.

Preflight verifies that:

- the expected Auth session schema exists;
- `auth.refresh_tokens.session_id` exists;
- deleting a session cascades to its refresh tokens;
- authenticated clients cannot read or delete Auth sessions directly.

## JWT limitation

Revoking a session prevents future refreshes. An already-issued access token
may remain valid until its JWT expiration time.

For highly sensitive actions, later QA can additionally verify that the token's
`session_id` still exists.

## Free-plan compatibility

This phase does not require Supabase's Pro-only time-box, inactivity-timeout,
or single-session controls.

## Phase boundary

Auth 13 does not yet add:

- MFA enrollment;
- new-device email alerts;
- trusted-device naming;
- wallet-session controls.
