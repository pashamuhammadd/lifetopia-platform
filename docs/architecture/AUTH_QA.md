# Auth 19 — Authentication QA release gate

Auth 19 validates the complete Lifetopia authentication platform built in Auth 0–18. It adds no production table, function, policy, route, or secret. All SQL in this phase is read-only.

Auth 19 is complete only when:

1. all four SQL suites return `passed = true` for every row;
2. the automated Playwright authentication suite passes;
3. the manual critical-path matrix is signed off;
4. build and type-check commands pass;
5. no production secret or real credential is stored in a test artifact.

## Files

- `supabase/auth/auth-19-preflight.sql` — readiness and Founder continuity.
- `supabase/auth/auth-19-security-regression.sql` — grants, RLS, finalizers, indexes, and immutable triggers.
- `supabase/auth/auth-19-data-integrity.sql` — orphan, uniqueness, wallet timeline, and audit consistency checks.
- `supabase/auth/auth-19-release-gate.sql` — final 15-check database gate.
- `apps/website/playwright.auth.config.ts` — isolated Chromium authentication configuration.
- `apps/website/tests/auth/public-auth-routes.spec.ts` — public route and safe-redirect smoke tests.
- `apps/website/tests/auth/auth-api-boundaries.spec.ts` — Origin, authentication, malformed input, and no-store boundaries.
- `apps/website/tests/auth/wallet-provider-selection.spec.ts` — Phantom/Solflare selection regressions with a hostile generic Trust Wallet injection.

## 1. Extract into the repository root

Run from PowerShell. The current folder must be the real `lifetopia-platform` folder; do not copy the placeholder path from an example.

```powershell
Set-Location "$HOME\OneDrive\Desktop\lifetopia-platform"

Expand-Archive `
  -LiteralPath "$HOME\Downloads\lifetopia-auth-19-qa.zip" `
  -DestinationPath "." `
  -Force

Get-ChildItem .\supabase\auth\auth-19*
Get-ChildItem .\apps\website\tests\auth
```

If the project lives elsewhere, first open it in VS Code and run `Get-Location`; use that exact path in `Set-Location`.

## 2. Install the QA runner

From the repository root:

```powershell
pnpm --filter website add -D @playwright/test
pnpm --filter website exec playwright install chromium
```

Only Chromium is required for the automated gate. Cross-browser behavior remains part of the manual matrix below.

## 3. Run database QA in Supabase

Open the Supabase SQL Editor for the production project. Run these files one at a time and in this order:

1. `auth-19-preflight.sql`
2. `auth-19-security-regression.sql`
3. `auth-19-data-integrity.sql`
4. `auth-19-release-gate.sql`

Every returned row must show `passed = true`. Stop on the first false or SQL error. Do not continue to Auth 20 until the cause is understood and fixed.

These queries are deliberately read-only. They do not create temporary users, overwrite Founder data, consume a challenge, or increment a wallet counter.

Expected totals:

| File | Required result |
| --- | --- |
| `auth-19-preflight.sql` | 12 / 12 true |
| `auth-19-security-regression.sql` | 21 / 21 true |
| `auth-19-data-integrity.sql` | 20 / 20 true |
| `auth-19-release-gate.sql` | 15 / 15 true |

## 4. Run automated website QA

Local run, with Playwright starting the website automatically:

```powershell
pnpm --filter website exec playwright test --config=playwright.auth.config.ts
```

Run against the deployed production website without starting a local server:

```powershell
$env:AUTH_QA_BASE_URL = "https://lifetopiaworld.io"
pnpm --filter website exec playwright test --config=playwright.auth.config.ts
Remove-Item Env:AUTH_QA_BASE_URL
```

The suite uses only public routes, invalid requests, and mocked browser wallets. It must never contain a real password, TOTP seed, service-role key, private key, seed phrase, or production session cookie.

If a test fails, open the report:

```powershell
pnpm --filter website exec playwright show-report playwright-report/auth
```

## 5. Build gate

```powershell
pnpm --filter website exec tsc --noEmit
pnpm --filter website build
pnpm turbo run build
```

Warnings about environment variables missing from `turbo.json` must still be reviewed, but any TypeScript or build error blocks the release.

## 6. Manual critical-path matrix

Use dedicated QA accounts except where the row explicitly names the Founder. Never weaken RLS or manually edit protected tables to make a test pass.

| Phase | Manual scenario | Pass condition |
| --- | --- | --- |
| Auth 1 | Open Terms and Privacy | Current legal documents render and registration links to them. |
| Auth 5–7 | Register an adult account and confirm email | Validation is enforced, email arrives, `/auth/confirm` succeeds once, and the profile becomes verified. |
| Auth 8 | Exercise an underage registration path | Guardian consent is required and cannot be bypassed by editing the client request. |
| Auth 9 | Login with valid and invalid password | Valid login succeeds; invalid login is generic and does not enumerate an account. |
| Auth 10 | Test inactive, suspended, and incomplete account access | Each account is routed to its permitted recovery path and blocked from protected pages. |
| Auth 11 | Repeat invalid login/registration requests | Rate limiting and anti-abuse responses activate without exposing private account state. |
| Auth 12 | Request and complete password reset | Email link is single-use, redirect is local, and old password no longer works. |
| Auth 13 | Create two sessions and revoke one device | Revoked session loses access while the retained session remains valid. |
| Auth 14 | Enrol primary and backup TOTP | Both show verified; AAL1 is challenged; valid TOTP reaches AAL2; removal requires reauthentication. |
| Auth 15 | View a role and badge from website/community | Public role/badge display agrees with database state; client cannot self-promote. |
| Auth 16 | Inspect `pashamuhammad` | Exactly one Founder role and badge remain, account is active, and verified TOTP remains enabled. |
| Auth 17 | Unlink and relink a QA Solana wallet | Explicit Phantom/Solflare selection works, one signature links once, and duplicate ownership is rejected. Do not unlink the Founder wallet for routine QA. |
| Auth 18 | Sign out, then login with the linked QA wallet | Explicit provider choice appears; Trust Wallet is not auto-selected; signature creates AAL1; MFA account must still complete AAL2. |
| Redirects | Try external `next` values on login, reset, MFA, and wallet login | Navigation falls back to a local safe route. |
| Cookies | Inspect auth cookies in browser developer tools | Production cookies are Secure, HttpOnly where applicable, and have the intended SameSite/path scope. |
| Responsive | Repeat login, MFA, wallet link, and wallet login on a narrow viewport | Controls remain visible, tappable, and keyboard reachable. |
| Browsers | Repeat the critical public and wallet flows in current Chrome, Edge, and Firefox | No browser-specific blocker; extension flow is tested in its supported browser. |
| Domains | Test website and community navigation | Authentication state is consistent with the intended domain/cookie architecture and no redirect loop occurs. |

Record the date, environment, browser, tester, result, and evidence link for every row. A known failure needs an issue owner and a release-blocking decision; silence is not a pass.

## 7. Secret and diff review

```powershell
git status --short
git diff --check
git diff --stat
git grep -n -E "service_role|SUPABASE_SERVICE_ROLE_KEY|seed phrase|private key" -- apps/website/tests docs/architecture/AUTH_QA.md
```

The SQL legitimately contains the database role name `service_role`; the package must not contain the key value. Review every match before committing.

## 8. Commit and push

After all gates pass:

```powershell
git add apps/website/playwright.auth.config.ts `
  apps/website/tests/auth `
  docs/architecture/AUTH_QA.md `
  supabase/auth/auth-19-preflight.sql `
  supabase/auth/auth-19-security-regression.sql `
  supabase/auth/auth-19-data-integrity.sql `
  supabase/auth/auth-19-release-gate.sql `
  apps/website/package.json `
  pnpm-lock.yaml

git commit -m "chore: add comprehensive authentication QA gate"
git push origin main
```

Use the actual working branch instead of `main` if the repository workflow requires a feature branch. The approved Lifetopia commit prefixes are `feat:`, `fix:`, `style:`, `refactor:`, `docs:`, `chore:`, and `release:`.

## Handoff to Auth 20

Send these results before proceeding:

- `12/12`, `21/21`, `20/20`, and `15/15` SQL checks true;
- Playwright test summary;
- website and monorepo build status;
- completed manual critical-path matrix;
- commit SHA and successful Vercel deployment URL.

Auth 20 is the release phase. Do not treat extraction alone as Auth 19 completion.
