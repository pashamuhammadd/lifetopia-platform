# Community Phase 10 — PWA and Android foundation

## Delivered

- Installable production manifest with standalone display, shortcuts, theme, and generated 192/512 icons.
- Service worker registration and a privacy-safe offline page.
- Only public static assets are cached. Authenticated HTML, APIs, wallet callbacks, messages, account data, and Supabase responses are never placed in the offline cache.
- Environment-backed Android Digital Asset Links.
- Android intent-filter merge template and Play Store data-safety worksheet.
- Production endpoint smoke script.

## Wallet return contract

Normal mobile web/PWA sends the Phantom or Solflare return to the HTTPS callback and reopens CommunityHub in the regular browser/PWA, never inside the wallet browser. The future Android package may use `lifetopia-community://wallet-auth`; its callback activity must allowlist and forward the approved wallet response fields to the existing HTTPS callback. Do not replace the Auth 20.2 cryptographic validation.

## Install and verify

There is no Supabase SQL migration in this phase.

```powershell
node scripts/verify-community-phase-10.mjs
pnpm --filter community check-types
pnpm --filter community build
```

After deploying production:

```powershell
node scripts/check-community-pwa.mjs https://community.lifetopiaworld.io
```

Expected production endpoints: manifest, service worker, offline page, both icons, and `assetlinks.json` all return 2xx. `assetlinks.json` returns 503 until both Android variables contain the real package and release-certificate SHA-256 fingerprint.

Recommended stable package name: `io.lifetopiaworld.community`. Set in Vercel for Production and Preview only when the Android package/signing identity is finalized:

- `ANDROID_APP_PACKAGE_NAME`
- `ANDROID_APP_SHA256_CERT_FINGERPRINT`

The certificate fingerprint uses colon-separated uppercase SHA-256 bytes. It is not the ZIP checksum and must never be guessed.

## Android packaging sequence

1. Deploy and pass the PWA endpoint smoke check.
2. Run Chrome Lighthouse PWA checks on production.
3. Finalize the permanent application ID and Play App Signing ownership.
4. Generate the Trusted Web Activity project from `https://community.lifetopiaworld.io/manifest.webmanifest` using Bubblewrap in a separate `apps/community-android` directory.
5. Merge `docs/android/communityhub/AndroidManifest.app-links.xml` and the existing Auth 20.2 wallet callback activity.
6. Set the release fingerprint in Vercel, redeploy, and confirm Digital Asset Links verification.
7. Test email auth, PWA session persistence, Phantom, Solflare, deep-link return, posts, moderation, guilds, and messages on a physical Android device.
8. Build a signed AAB only after release blockers are closed.

## Release blockers

- A real Play App Signing key/fingerprint and verified developer ownership.
- In-app and web account deletion flows required for an app that creates accounts.
- Final privacy policy and honest Data Safety answers.
- UGC safety review, including direct-message blocking/reporting if Messages ships in the Android release.
- Production moderation contact and response process.
- Final store icon, feature graphic, screenshots, content rating, age audience, and support URL.
- Firebase configuration and consent decisions before any native push-notification claim.

This phase does not claim an APK/AAB, push notifications, native offline data, or Play approval.
