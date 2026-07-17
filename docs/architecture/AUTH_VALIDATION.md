# Lifetopia Authentication Validation

Auth 4 introduces one shared, dependency-free validation source:

```text
packages/services/auth-validation.ts
```

Website forms, server routes, Community account flows, and future game account
services must use this file instead of defining local regular expressions.

## Username

- normalized with `trim()` and lowercase storage;
- 4–16 characters;
- lowercase letters, numbers, and underscore;
- underscore may be first or last;
- one or two consecutive underscores are allowed;
- three consecutive underscores are rejected;
- protected Lifetopia identity names are reserved;
- obvious scam, impersonation, and profanity patterns are rejected.

Database uniqueness remains authoritative. Availability checks are informative
only; the Registration API must handle the final unique-constraint race.

## Display Name

- normalized outer and repeated whitespace;
- 2–32 characters;
- Unicode letters, numbers, and spaces;
- duplicates are allowed;
- emoji and symbols are rejected.

## Password

- 8–72 characters;
- uppercase;
- lowercase;
- number;
- symbol;
- cannot equal the normalized username or email;
- password strength assessment is available for UI feedback.

Passwords are never trimmed, logged, or returned by an API response.

## Age

- date format `YYYY-MM-DD`;
- impossible and future dates are rejected;
- minimum account age is 13;
- ages 13–17 return `guardianConsentRequired = true`;
- age is calculated in UTC to avoid timezone boundary mistakes.

## Email

Email is normalized to lowercase and validated for basic address, local-part,
and domain-label structure. Final email uniqueness remains authoritative in
Supabase Auth.

## Official avatar, country, and gender

Registration accepts only:

- official avatar IDs `avatar-01` through `avatar-04`;
- two-letter country codes;
- a validated country name;
- `male` or `female`.

## Redirect validation

Allowed production destinations:

```text
https://lifetopiaworld.io
https://www.lifetopiaworld.io
https://community.lifetopiaworld.io
```

Allowed local development destinations:

```text
http://localhost:3000
http://localhost:3001
```

The Grants application is intentionally excluded from shared account sessions
and authentication redirects.

Authentication-loop routes and unsafe external, protocol-relative, control
character, or backslash redirects fall back to `/`.

## Registration API preparation

Auth 5 should call:

```ts
validateRegistrationInput(input)
```

The function returns either normalized registration data or a field-error map.
Client validation improves UX, but Auth 5 server validation remains
authoritative.
