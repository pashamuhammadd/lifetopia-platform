# Auth 20 — Authentication production release

Auth 20 is the final phase of the 21-phase Lifetopia authentication program. It promotes the Auth 0–19 implementation through an explicit production release gate, verifies both Lifetopia domains, and records a reversible deployment decision.

Auth 20 introduces no database migration and no production data mutation. Both SQL files are read-only. A successful extraction is not a release; every gate below must pass.

## Added release controls

- `scripts/auth/auth-20-release-gate.mjs` — local build, type-check, and authentication test orchestrator.
- `.github/workflows/auth-production-smoke.yml` — manually triggered production smoke workflow against `https://lifetopiaworld.io`.
- `supabase/auth/auth-20-release-readiness.sql` — 20 pre-release database invariants.
- `supabase/auth/auth-20-post-deploy-verify.sql` — 12 post-deployment invariants.
- `docs/releases/AUTH_RELEASE_SIGNOFF_TEMPLATE.md` — evidence and release decision template.

## 1. Extract from the real repository root

```powershell
Set-Location "C:\Users\mochn\OneDrive\Desktop\lifetopia-platform"

Expand-Archive `
  -LiteralPath "$HOME\Downloads\lifetopia-auth-20-release.zip" `
  -DestinationPath "." `
  -Force

Get-ChildItem .\supabase\auth\auth-20*
Get-ChildItem .\scripts\auth\auth-20*
Get-ChildItem .\.github\workflows\auth-production-smoke.yml
```

## 2. Preserve the last known-good deployment

Before pushing:

1. Open both Vercel projects.
2. Record the current production deployment URL and Git commit for the website.
3. Record the current production deployment URL and Git commit for the community platform.
4. Confirm both deployments are still retained and eligible for rollback.
5. Copy the values into the sign-off template.

Do not delete the previous production deployments during the release window.

## 3. Review production configuration without exposing values

Confirm that the Vercel Production environment contains the required variables for each consumer. Check names and environment scope; never paste secret values into issues, logs, screenshots, or the repository.

Website project:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `DATABASE_URL` if consumed by the current build
- `NEXT_PUBLIC_SITE_URL=https://lifetopiaworld.io`

Community project:

- the same Supabase project URL and public key;
- server-side secrets required by the existing community data layer;
- the intended community site URL and cookie/domain configuration.

Also confirm:

- Supabase Auth Site URL is `https://lifetopiaworld.io`;
- approved redirect URLs contain only intended production and local development routes;
- the verified Lifetopia email-sending domain remains active;
- no service-role key is exposed through a `NEXT_PUBLIC_` variable;
- Preview and Production values are not accidentally swapped.

## 4. Run the local code release gate

From the repository root:

```powershell
node .\scripts\auth\auth-20-release-gate.mjs
```

The script stops immediately if any of these fail:

1. `git diff --check`
2. website TypeScript check
3. complete monorepo production build
4. all 18 Auth 19 Playwright tests

The existing Next.js image-quality warning is not an authentication failure, but any build or test error blocks release.

## 5. Run the database readiness gate

Open the production Supabase SQL Editor and run:

```text
supabase/auth/auth-20-release-readiness.sql
```

Required result: **20 / 20 rows with `passed = true`**.

Stop if any row is false or the query errors. Do not manually alter protected Founder, role, badge, MFA, wallet, challenge, or audit rows to force a pass.

## 6. Commit and push the production candidate

Review exactly what will ship:

```powershell
git status --short
git diff --check
git diff --stat
```

Commit the final phase:

```powershell
git add .github/workflows/auth-production-smoke.yml `
  scripts/auth/auth-20-release-gate.mjs `
  docs/architecture/AUTH_RELEASE.md `
  docs/releases/AUTH_RELEASE_SIGNOFF_TEMPLATE.md `
  supabase/auth/auth-20-release-readiness.sql `
  supabase/auth/auth-20-post-deploy-verify.sql

git commit -m "release: complete Lifetopia authentication platform"
git push origin main
```

The push should trigger the Vercel projects connected to the production branch. Do not create the final release tag yet.

## 7. Verify Vercel deployment

For both website and community projects:

1. Confirm the deployment uses the release commit SHA.
2. Confirm Build status is Ready with no TypeScript error.
3. Confirm the intended Production environment variables were selected.
4. Confirm the custom domain points to the new deployment.
5. Keep the previous production deployment available.

Expected production domains:

- `https://lifetopiaworld.io`
- `https://community.lifetopiaworld.io`

## 8. Run production automated smoke tests

Local production smoke:

```powershell
node .\scripts\auth\auth-20-release-gate.mjs `
  --production https://lifetopiaworld.io
```

This repeats the build gate and runs the public/mocked authentication tests against production. It does not use a real password, TOTP secret, wallet private key, or service-role key.

The same public smoke suite can be run from GitHub:

1. Open the repository **Actions** tab.
2. Select **Authentication production smoke**.
3. Choose **Run workflow** on the production branch.
4. Require the workflow to finish successfully.

## 9. Manual production smoke

Use a dedicated adult QA account for destructive or state-changing scenarios. The Founder account is for non-destructive continuity checks only.

| Area | Production check | Pass condition |
| --- | --- | --- |
| Public routes | Open login, register, forgot password, terms, privacy, and wallet login | Pages render without a redirect loop or server error. |
| Email login | Sign in with the QA account | Correct account is authenticated and safe `next` redirect is honored. |
| MFA | Sign in to an MFA-enabled QA account | Session starts at AAL1 and protected navigation requires valid TOTP to reach AAL2. |
| Wallet login | Sign out and choose Phantom, then repeat with Solflare if available | Explicit provider choice is respected; Trust Wallet is never selected automatically. |
| Wallet safety | Inspect the signing prompt | Human-readable message only; no transaction, seed phrase, private key, or fund approval. |
| Founder continuity | Sign in as `pashamuhammad` without changing security factors | Founder role/badge, verified primary and backup TOTP, and linked Solana wallet remain visible. |
| Community session | Navigate from website to community after login | Intended authentication state is recognized without a loop or accidental privilege elevation. |
| Sign out | Sign out through the supported control | Protected website/community pages no longer expose the authenticated session. |
| Responsive | Repeat login, MFA, and wallet choice on a narrow viewport | Every control is visible, keyboard reachable, and tappable. |

Never unlink the Founder wallet, remove Founder TOTP, reset the Founder password, or suspend the Founder account as routine release QA.

## 10. Run post-deployment database verification

After automated and manual production smoke tests, run:

```text
supabase/auth/auth-20-post-deploy-verify.sql
```

Required result: **12 / 12 rows with `passed = true`**.

Complete `docs/releases/AUTH_RELEASE_SIGNOFF_TEMPLATE.md` outside the release commit or copy it into the GitHub Release notes. Include only URLs, counts, commit SHA, timestamps, and non-sensitive evidence.

## 11. Release decision and tag

Release is accepted only when:

- Auth 19 remains 18 / 18;
- Auth 20 readiness is 20 / 20;
- website and community Vercel deployments are Ready;
- production automated smoke is 18 / 18;
- manual production matrix passes;
- post-deploy SQL is 12 / 12;
- no unresolved Sev-1 or Sev-2 authentication issue exists.

After acceptance, tag the exact deployed commit:

```powershell
git status --short
git log -1 --oneline
git tag -a auth-v1.0.0 -m "Lifetopia authentication platform v1.0.0"
git push origin auth-v1.0.0
```

Create a GitHub Release from `auth-v1.0.0` and paste the completed sign-off evidence into its notes.

## 12. Rollback

Rollback is authorized if login, MFA, account access enforcement, Founder continuity, wallet ownership, wallet login, session revocation, or community authentication is materially broken.

1. Pause further release changes.
2. In each affected Vercel project, use Instant Rollback to restore its recorded last known-good production deployment.
3. Ensure website and community are aligned to compatible commits.
4. Remember that Instant Rollback restores the previous build; changed environment variables are not rebuilt automatically. Recheck Production variables separately.
5. Run the production Playwright smoke suite again.
6. Run `auth-20-post-deploy-verify.sql` again.
7. Record the incident and rollback deployment URLs.

Do not reverse Auth 15–18 database structures as part of an application rollback. Auth 20 performs no database mutation, and destructive SQL rollback could damage Founder, MFA, wallet, and audit data.

## Completion

When the release tag and GitHub Release exist with all evidence, Auth 20 is complete. At that point all 21 Lifetopia authentication phases—Auth 0 through Auth 20—are complete.
