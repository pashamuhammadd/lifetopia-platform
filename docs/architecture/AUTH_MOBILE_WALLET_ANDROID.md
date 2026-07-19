# Auth 20.1 — Mobile Wallet and Android Readiness

Auth 20.1 is a supplementary completion package for the existing 21-phase authentication roadmap. It does not create Auth 21 or replace the completed Auth 17–20 wallet security work.

## Outcome

- Desktop keeps explicit Phantom and Solflare buttons.
- Generic `window.solana` providers, including Trust Wallet injection, are not selected automatically.
- Android users receive a separate **Continue with a mobile wallet** action.
- The Android action uses Solana Mobile Wallet Adapter through Wallet Standard.
- Android also receives explicit **Open in Phantom** and **Open in Solflare** fallbacks. These use each wallet's official browse deeplink and preserve the current login return URL.
- Community guests can start wallet login from `community.lifetopiaworld.io` and return to the exact safe Community URL after authentication.
- Existing one-time challenge, Ed25519 signature verification, internal Supabase session exchange, MFA, rate limits, and audit records remain unchanged.

This flow signs a human-readable authentication message only. It never asks for a seed phrase, private key, transfer, transaction, swap, staking approval, or custody permission.

The Wallet Standard output may contain either the raw signed message or the Mobile Wallet Adapter `message + 64-byte signature` payload. The client accepts only those two exact layouts and the server still verifies the extracted Ed25519 signature against the original one-time challenge.

## Installation

From the repository root:

```powershell
pnpm --filter website add `
  @solana-mobile/wallet-standard-mobile@0.5.3 `
  @wallet-standard/app@1.1.1
```

The command updates `apps/website/package.json` and `pnpm-lock.yaml`.

## Production environment

Keep these values configured on the relevant Vercel projects:

```text
NEXT_PUBLIC_MAIN_APP_URL=https://lifetopiaworld.io
NEXT_PUBLIC_AUTH_COOKIE_DOMAIN=.lifetopiaworld.io
```

The shared cookie domain is required so the authenticated session created on `lifetopiaworld.io` is available after the safe redirect back to `community.lifetopiaworld.io`.

## Android application requirement

Package CommunityHub as a Progressive Web App / Trusted Web Activity using the production HTTPS origin. Do not place this authentication flow inside a generic Android WebView: Solana Mobile Wallet Adapter officially supports Android Chrome and compatible PWAs, while an arbitrary embedded WebView is not a supported wallet transport.

Current mobile scope is Android. Solana Mobile Wallet Adapter does not currently support iOS.

Official references:

- <https://docs.solanamobile.com/developers/mobile-wallet-adapter>
- <https://docs.solanamobile.com/get-started/web/installation>
- <https://docs.solanamobile.com/get-started/web/apps>
- <https://docs.solanamobile.com/recipes/mobile-wallet-adapter/migrating-to-wallet-standard>
- <https://docs.phantom.com/phantom-deeplinks/other-methods/browse>
- <https://docs.solflare.com/solflare/technical/deeplinks/other-methods/browse>

## Automated verification

Run the existing auth suite, including the new Android entry and desktop regression tests:

```powershell
pnpm --filter website exec playwright test `
  --config=playwright.auth.config.ts `
  --workers=1 `
  --reporter=list
```

The browser suite verifies that:

1. Android receives the mobile-wallet action.
2. Desktop does not receive that action.
3. A generic Trust Wallet injection is still rejected when Phantom is selected.

Playwright cannot emulate Android operating-system wallet intents. Complete the device verification below before production release.

## Android device verification

Use a real Android device with the current Phantom and/or Solflare app installed.

1. Open `https://community.lifetopiaworld.io` in Android Chrome or the CommunityHub PWA/TWA.
2. Open an authenticated community action and choose **Continue with wallet**.
3. Confirm the browser opens `https://lifetopiaworld.io/wallet-login` with a Community `next` URL.
4. Confirm **Continue with a mobile wallet** is visible.
5. Tap it and select Phantom or Solflare in the Android wallet chooser.
6. If Android reports that it cannot find a wallet, close the message and use **Open in Phantom** or **Open in Solflare**. Confirm the same Lifetopia wallet page opens inside the selected wallet's browser.
7. Approve the human-readable message signature. Reject any unexpected transaction request.
8. Confirm the existing MFA challenge still appears when the account requires AAL2.
9. Confirm the flow returns to the original safe Community URL with an authenticated session.
10. Repeat from `https://lifetopiaworld.io/account/wallet` with an unlinked test account to verify mobile wallet linking.
11. Re-run desktop Phantom and Solflare login to confirm both explicit provider buttons still work.

## Deployment order

1. Deploy `website` first because it owns the wallet login and signing UI.
2. Deploy `community` second because its guest dialog adds the wallet entry.
3. Verify both production domains over HTTPS.
4. Only then publish or update the CommunityHub Android PWA/TWA package.

No SQL migration is included because this package reuses the already verified Auth 17 wallet tables, challenges, routes, policies, and audit events.
