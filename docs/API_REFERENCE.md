# Lifetopia World — API Reference

> AUTO GENERATED
>
> Source: `apps/website/app/**/route.ts`

---

## API Routes

| Route | Methods | File |
|---|---|---|
| `/.well-known/assetlinks.json` | - | `apps/website/app/.well-known/assetlinks.json/route.ts` |
| `/api/auth/account-access/legal` | `POST` | `apps/website/app/api/auth/account-access/legal/route.ts` |
| `/api/auth/account-access/username` | `POST` | `apps/website/app/api/auth/account-access/username/route.ts` |
| `/api/auth/guardian/request` | `POST` | `apps/website/app/api/auth/guardian/request/route.ts` |
| `/api/auth/guardian/respond` | `POST` | `apps/website/app/api/auth/guardian/respond/route.ts` |
| `/api/auth/login` | `POST` | `apps/website/app/api/auth/login/route.ts` |
| `/api/auth/mfa/challenge` | `POST` | `apps/website/app/api/auth/mfa/challenge/route.ts` |
| `/api/auth/mfa/enroll` | `POST` | `apps/website/app/api/auth/mfa/enroll/route.ts` |
| `/api/auth/mfa/enroll/cancel` | `POST` | `apps/website/app/api/auth/mfa/enroll/cancel/route.ts` |
| `/api/auth/mfa/enroll/verify` | `POST` | `apps/website/app/api/auth/mfa/enroll/verify/route.ts` |
| `/api/auth/mfa/unenroll` | `POST` | `apps/website/app/api/auth/mfa/unenroll/route.ts` |
| `/api/auth/password-reset/complete` | `POST` | `apps/website/app/api/auth/password-reset/complete/route.ts` |
| `/api/auth/password-reset/request` | `POST` | `apps/website/app/api/auth/password-reset/request/route.ts` |
| `/api/auth/register` | `POST` | `apps/website/app/api/auth/register/route.ts` |
| `/api/auth/resend-verification` | `POST` | `apps/website/app/api/auth/resend-verification/route.ts` |
| `/api/auth/sessions/logout-all` | `POST` | `apps/website/app/api/auth/sessions/logout-all/route.ts` |
| `/api/auth/sessions/logout-current` | `POST` | `apps/website/app/api/auth/sessions/logout-current/route.ts` |
| `/api/auth/sessions/logout-others` | `POST` | `apps/website/app/api/auth/sessions/logout-others/route.ts` |
| `/api/auth/sessions/revoke` | `POST` | `apps/website/app/api/auth/sessions/revoke/route.ts` |
| `/api/auth/wallet-login/challenge` | `POST` | `apps/website/app/api/auth/wallet-login/challenge/route.ts` |
| `/api/auth/wallet-login/verify` | `POST` | `apps/website/app/api/auth/wallet-login/verify/route.ts` |
| `/api/auth/wallet/challenge` | `POST` | `apps/website/app/api/auth/wallet/challenge/route.ts` |
| `/api/auth/wallet/unlink` | `POST` | `apps/website/app/api/auth/wallet/unlink/route.ts` |
| `/api/auth/wallet/verify` | `POST` | `apps/website/app/api/auth/wallet/verify/route.ts` |
| `/api/development-log` | `POST` | `apps/website/app/api/development-log/route.ts` |
| `/auth/confirm` | `GET` | `apps/website/app/auth/confirm/route.ts` |


---

## AI Instructions

- Do not invent API routes.
- Use only API routes listed here.
- If a route handler is needed, create it intentionally as `route.ts`.
- Keep auth-related API routes inside `app/api/auth/`.
