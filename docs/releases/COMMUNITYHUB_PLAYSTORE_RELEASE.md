# CommunityHub — Google Play release runbook

## Fixed application identity

- App name: `CommunityHub`
- Application ID: `io.lifetopiaworld.community`
- Version code: `1`
- Version name: `1.0.0`
- Target SDK: Android 16 / API 36
- Production origin: `https://community.lifetopiaworld.io`

The application ID and signing identities must not be changed after release.

## 1. Create the upload key once

Run from PowerShell and keep the resulting JKS outside the repository:

```powershell
New-Item -ItemType Directory -Force "$HOME\secure-keys"

& "$env:JAVA_HOME\bin\keytool.exe" -genkeypair -v `
  -keystore "$HOME\secure-keys\communityhub-upload.jks" `
  -alias "communityhub-upload" `
  -keyalg RSA `
  -keysize 4096 `
  -validity 10000
```

Back up the JKS and passwords in a password manager. Loss of the upload key requires an upload-key reset process.

## 2. Configure signing locally

Copy `keystore.properties.example` to `keystore.properties` and replace all placeholders. Both files live in `apps/community-android`; the real file is ignored by Git.

```powershell
Set-Location "C:\Users\mochn\OneDrive\Desktop\lifetopia-platform\apps\community-android"
Copy-Item .\keystore.properties.example .\keystore.properties
notepad .\keystore.properties
```

Never paste the keystore, passwords, or `keystore.properties` into chat, Git, Vercel, or Supabase.

## 3. Produce and verify the release bundle

```powershell
.\gradlew.bat clean lintRelease bundleRelease

Get-Item .\app\build\outputs\bundle\release\app-release.aab |
  Select-Object FullName, Length, LastWriteTime

Get-FileHash .\app\build\outputs\bundle\release\app-release.aab -Algorithm SHA256
```

Upload only `app-release.aab` to Play Console. Do not upload the JKS or debug APK.

## 4. Play Console order

1. Create app `CommunityHub` with application ID `io.lifetopiaworld.community`.
2. Enroll in Play App Signing.
3. Upload the AAB first to Internal testing.
4. Copy the **App signing key certificate SHA-256** from Play Console, not the upload-key fingerprint.
5. Add that Play fingerprint to `ANDROID_APP_SHA256_CERT_FINGERPRINTS` and redeploy the Community website.
6. Verify `/.well-known/assetlinks.json`, install the Play-delivered build, then test fullscreen TWA and App Links.
7. Complete Store listing, App content, Data safety, privacy policy, content rating, ads declaration, target audience, and account-deletion declarations.
8. Move through closed testing when required, then request production access.

## 5. Store assets still supplied by the owner

- High-resolution Play icon: 512 × 512 PNG.
- Feature graphic: 1024 × 500 PNG/JPG.
- At least two representative phone screenshots without test data or secrets.
- Support email and public privacy-policy URL.
- Public account-deletion URL.
- Short and full descriptions that accurately describe current functionality.

## Mandatory release gates

- In-app account deletion and a public deletion-request page work end to end.
- Privacy policy and Data safety answers match actual Supabase, Vercel, wallet, analytics, and notification behavior.
- Production uses the Play App Signing fingerprint; debug fingerprint is removed after testing.
- Registration, login, MFA, Phantom/Solflare return, posting, messaging, notification, and deletion flows pass on the Play-installed build.
- No private key, seed phrase, service-role key, keystore, password, or test-account secret is committed or uploaded.

## Versioning after the first upload

Every new Play upload must increase `versionCode`. Use `versionName` for the user-facing release number. Never reuse a version code already uploaded to any Play track.
