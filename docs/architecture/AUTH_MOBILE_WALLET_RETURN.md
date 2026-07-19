# Auth 20.2 — Native Mobile Wallet Return

Auth 20.2 is a supplement to the completed Auth 0–20 roadmap. It replaces the Auth 20.1 **browse inside wallet** fallback. It does not change Auth 17 wallet linking, Auth 18 wallet login, Auth 19 QA boundaries, or Auth 20 release controls.

## User outcome

Android users can choose Phantom or Solflare directly. The selected wallet opens only for connection approval and a human-readable message signature. Lifetopia then processes the encrypted callback and returns the user to the original CommunityHub destination.

The Lifetopia platform is never loaded inside Phantom or Solflare's in-wallet browser.

The Android Wallet Standard/MWA chooser remains available as the preferred generic Android transport. Provider-specific deeplinks are the compatibility path when Android cannot discover an installed MWA wallet.

## Security model

1. The browser generates a fresh X25519 keypair and a random 32-byte state for each attempt.
2. Only the public encryption key is sent to Phantom or Solflare.
3. The temporary private encryption key is origin-scoped and removed after completion or expiry.
4. Wallet callback data is authenticated and decrypted with TweetNaCl before any value is trusted.
5. Provider, state, callback stage, challenge expiry, response shape, and 64-byte Ed25519 signature length are validated.
6. The existing Auth 17/18 endpoint creates the one-time challenge and verifies the signature against its original database message.
7. Existing safe-return validation, Supabase session exchange, MFA/AAL2, rate limits, global wallet uniqueness, challenge consumption, and audit records remain authoritative.

The temporary deeplink record expires after ten minutes. The underlying Lifetopia signing challenge keeps its existing shorter expiry and one-time-use rule.

No seed phrase, private key, transaction, transfer, swap, staking approval, or custody permission is requested.

## Files

- `apps/website/lib/auth/mobile-wallet-deeplink.ts` — encrypted connect/signMessage state machine.
- `apps/website/components/auth/MobileWalletCallback.tsx` — fail-closed callback processor UI.
- `apps/website/app/auth/wallet-mobile/callback/page.tsx` — callback page.
- `apps/website/components/auth/WalletLoginPanel.tsx` — direct mobile Phantom/Solflare login.
- `apps/website/components/auth/WalletLinkingPanel.tsx` — direct mobile Phantom/Solflare linking.
- `apps/community/components/auth/GuestAuthModal.tsx` — preserves the Android-app return marker.
- `apps/website/app/.well-known/assetlinks.json/route.ts` — App Links association for the auth origin.
- `apps/community/app/.well-known/assetlinks.json/route.ts` — App Links association for CommunityHub.
- `docs/android/communityhub-mobile-wallet/*` — native return bridge templates.

No SQL migration is required.

## Required packages

Auth 20.2 reuses packages already present in the website app:

```powershell
pnpm --filter website add `
  bs58@^6.0.0 `
  tweetnacl@^1.0.3
```

Keep the Auth 20.1 Wallet Standard packages installed:

```powershell
pnpm --filter website add `
  @solana-mobile/wallet-standard-mobile@0.5.3 `
  @wallet-standard/app@1.1.1
```

## Vercel environment

Configure these on both `website` and `community` where indicated:

```text
# website and community
ANDROID_APP_PACKAGE_NAME=<final Play Store applicationId>
ANDROID_APP_SHA256_CERT_FINGERPRINT=<Play App Signing SHA-256, colon separated>

# website only; enable only after the Android callback activity is installed
NEXT_PUBLIC_COMMUNITYHUB_WALLET_SCHEME=lifetopia-community

# existing values remain
NEXT_PUBLIC_MAIN_APP_URL=https://lifetopiaworld.io
NEXT_PUBLIC_AUTH_COOKIE_DOMAIN=.lifetopiaworld.io
```

The SHA-256 value here is the certificate fingerprint from **Google Play Console → Setup → App integrity → App signing key certificate**. It is not the SHA-256 checksum of this ZIP.

Do not configure `NEXT_PUBLIC_COMMUNITYHUB_WALLET_SCHEME` for production until the matching Android intent filter and `MobileWalletCallbackActivity` have shipped. Without that native handler, use the HTTPS callback path.

## Android wrapper

1. Copy `MobileWalletCallbackActivity.kt.template` into the Android wrapper source and replace its package declaration with the final applicationId.
2. Merge `AndroidManifest.mobile-wallet.xml` into the existing CommunityHub TWA/native manifest. Do not duplicate the existing `LauncherActivity` declaration; merge only its HTTPS intent filter.
3. Ensure the wrapper launches CommunityHub with `?androidApp=1` at least once. The Community app stores the marker and includes it when starting wallet login.
4. Add both `https://community.lifetopiaworld.io` and the Lifetopia callback origin to the wrapper's trusted origins.
5. Set the Vercel variables above, deploy, and verify:
   - `https://community.lifetopiaworld.io/.well-known/assetlinks.json`
   - `https://lifetopiaworld.io/.well-known/assetlinks.json`
6. The files must respond with HTTP 200, `application/json`, the exact applicationId, and the Play App Signing SHA-256 fingerprint.

## Callback behavior

- Normal mobile web/PWA: wallet redirects to the HTTPS callback. The platform reopens in the regular browser/PWA, never inside the wallet browser.
- CommunityHub Android wrapper with native scheme enabled: wallet redirects to `lifetopia-community://wallet-auth`; the callback activity allowlists query fields and forwards them to the HTTPS callback inside the CommunityHub package.
- Rejection, expired state, mismatched provider, invalid encryption, malformed response, wrong signature length, or consumed challenge stops the flow without creating a session or wallet link.

## Automated verification

```powershell
pnpm --filter website exec playwright test `
  tests/auth/mobile-wallet-entry.spec.ts `
  --config=playwright.auth.config.ts `
  --workers=1 `
  --reporter=list
```

The suite verifies Android entry controls, absence of wallet-browser browse URLs, the official provider connect URL shape, callback fail-closed behavior, and the existing desktop Trust Wallet regression.

Then run the complete auth regression suite:

```powershell
pnpm --filter website exec playwright test `
  --config=playwright.auth.config.ts `
  --workers=1 `
  --reporter=list
```

## Real Android acceptance test

1. Install current Phantom and Solflare plus the current CommunityHub Android build.
2. Start wallet login from a protected Community action.
3. Select Phantom directly. Confirm Lifetopia is not displayed inside Phantom's browser.
4. Approve connect, then approve the human-readable signature.
5. Confirm CommunityHub resumes and the exact safe `next` destination opens authenticated.
6. Sign out and repeat with Solflare.
7. Sign in with email on an unlinked test account, open `/account/wallet`, and repeat linking with each provider.
8. Reject each stage once and confirm no session or wallet record is created.
9. Wait beyond challenge expiry and confirm the callback fails closed.
10. Re-run desktop Phantom/Solflare login and confirm generic Trust Wallet injection is still rejected.

## Deployment order

1. Extract and install dependencies.
2. Run focused and full auth tests.
3. Deploy `website` first.
4. Deploy `community` second.
5. Verify both `assetlinks.json` endpoints.
6. Publish the Android wrapper containing the callback activity.
7. Only after that Android build is available, enable `NEXT_PUBLIC_COMMUNITYHUB_WALLET_SCHEME` and redeploy `website`.

Official protocol references:

- <https://docs.phantom.com/phantom-deeplinks/provider-methods/connect>
- <https://docs.phantom.com/phantom-deeplinks/provider-methods/signmessage>
- <https://docs.phantom.com/phantom-deeplinks/encryption>
- <https://docs.phantom.com/phantom-deeplinks/specifying-redirects>
- <https://docs.solflare.com/solflare/technical/deeplinks/provider-methods/connect>
- <https://docs.solflare.com/solflare/technical/deeplinks/provider-methods/signmessage>
- <https://docs.solflare.com/solflare/technical/deeplinks/encryption>
- <https://docs.solflare.com/solflare/technical/deeplinks/specifying-redirects>
