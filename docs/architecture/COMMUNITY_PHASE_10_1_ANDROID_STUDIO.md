# Community Phase 10.1 — Android Studio project

This phase adds a real Android Studio project at `apps/community-android`. It is a Trusted Web Activity around the production PWA, not a generic WebView and not a crypto-wallet application.

## Fixed identity

- Application ID and namespace: `io.lifetopiaworld.community`
- Production origin: `https://community.lifetopiaworld.io`
- Wallet authentication origin: `https://lifetopiaworld.io`
- Native wallet return: `lifetopia-community://wallet-auth`

Changing the application ID after publishing creates a different Play Store app. Do not rename it casually.

## Open in Android Studio

1. Install current stable Android Studio with Android SDK 36.
2. In Android Studio choose **Open**.
3. Select `lifetopia-platform/apps/community-android`.
4. Set Gradle JDK to the embedded JDK 17.
5. Allow Gradle sync to download Gradle 9.3.1, AGP 9.1.0, and Android Browser Helper 2.7.2. This pair matches Android Studio Panda 2 (2025.3.2).
6. Connect an Android phone with USB debugging or create an API 35/36 emulator.
7. Choose the `app` configuration and run the debug build.

Command-line debug build from PowerShell:

```powershell
Set-Location "C:\Users\mochn\OneDrive\Desktop\lifetopia-platform\apps\community-android"
.\gradlew.bat clean assembleDebug
```

Debug APK output:

```text
app/build/outputs/apk/debug/app-debug.apk
```

## Why a toolbar may appear in debug

Trusted Web Activity fullscreen mode requires Digital Asset Links to match the certificate of the installed application. A normal debug APK uses Android's debug certificate, while production `assetlinks.json` must ultimately use the Google Play App Signing certificate. A toolbar during early debug is therefore expected and does not mean the launcher is a WebView.

Do not replace the production fingerprint with a temporary debug fingerprint on the live domain merely to hide the toolbar.

## Wallet return rollout

The activity accepts only the approved Phantom/Solflare callback fields and forwards them to the existing HTTPS cryptographic verifier. It never reads or stores a seed phrase or private key.

Keep normal HTTPS wallet return enabled during mobile web/PWA testing. Set this website environment variable only after an APK containing `MobileWalletCallbackActivity` is installed for the intended test group:

```text
NEXT_PUBLIC_COMMUNITYHUB_WALLET_SCHEME=lifetopia-community
```

Then redeploy `apps/website` and test Phantom and Solflare on a physical Android phone. The sequence must be CommunityHub → wallet app → signature approval → CommunityHub, not the wallet's embedded browser.

## Generate a signed AAB in Android Studio

1. Choose **Build → Generate Signed App Bundle or APK**.
2. Select **Android App Bundle**.
3. Create or select the private upload keystore outside the repository.
4. Store its backup securely. Never commit it, its passwords, or `keystore.properties`.
5. Choose the `release` variant and generate the bundle.

Expected output:

```text
apps/community-android/app/build/outputs/bundle/release/app-release.aab
```

For a new Google Play app, enroll in Play App Signing. The upload-key fingerprint and Play App Signing fingerprint are different identities. Production `ANDROID_APP_SHA256_CERT_FINGERPRINT` must use the **Play App Signing SHA-256 certificate fingerprint** for installs distributed by Play.

## Production App Links

After Play Console exposes the Play App Signing fingerprint, set on both production Vercel projects that serve associated routes:

```text
ANDROID_APP_PACKAGE_NAME=io.lifetopiaworld.community
ANDROID_APP_SHA256_CERT_FINGERPRINT=AA:BB:...:FF
```

Redeploy, then verify:

```text
https://community.lifetopiaworld.io/.well-known/assetlinks.json
https://lifetopiaworld.io/.well-known/assetlinks.json
```

Both must return JSON containing the exact package and Play signing fingerprint.

## Required physical-device acceptance

- Cold launch, back navigation, external links, offline fallback, and session persistence.
- Email registration/login/logout and protected-route return.
- Phantom and Solflare login/linking return to CommunityHub.
- Feed, posting, comments, quests, wallet status, My World, guilds, notifications, and messages.
- App Links opened from Chrome/Gmail return to the installed app.
- No HTTP traffic, seed/private-key request, trading, swap, staking, or custodial-wallet behavior.

This project does not include signing secrets and does not claim Play Store approval.
