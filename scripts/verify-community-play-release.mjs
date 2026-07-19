import { existsSync, readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");
const gradle = read("apps/community-android/app/build.gradle.kts");
const ignore = read("apps/community-android/.gitignore");
const example = read("apps/community-android/keystore.properties.example");
const manifest = read("apps/community-android/app/src/main/AndroidManifest.xml");
const strings = read("apps/community-android/app/src/main/res/values/strings.xml");

const checks = [
  ["production application ID", gradle.includes('applicationId = "io.lifetopiaworld.community"')],
  ["API 36 target", gradle.includes("targetSdk = 36") && gradle.includes("compileSdk = 36")],
  ["release version initialized", gradle.includes("versionCode = 1") && gradle.includes('versionName = "1.0.0"')],
  ["release shrinking enabled", gradle.includes("isMinifyEnabled = true") && gradle.includes("isShrinkResources = true")],
  ["release signing from local properties", gradle.includes("keystore.properties") && gradle.includes('getByName("release")')],
  ["release build fails safely without signing", gradle.includes("Release signing is not configured")],
  ["signing secrets ignored", ignore.includes("keystore.properties") && ignore.includes("*.jks") && ignore.includes("*.keystore")],
  ["safe signing template", example.includes("REPLACE_LOCALLY") && !example.includes("storePassword=android")],
  ["CommunityHub label", strings.includes('<string name="app_name">CommunityHub</string>')],
  ["HTTPS-only release", manifest.includes('usesCleartextTraffic="false"')],
  ["release runbook", existsSync(new URL("docs/releases/COMMUNITYHUB_PLAYSTORE_RELEASE.md", root))],
  ["Play Console checklist", existsSync(new URL("docs/releases/COMMUNITYHUB_PLAY_CONSOLE_CHECKLIST.md", root))],
];

let passed = 0;
for (const [name, ok] of checks) {
  console.log(`${ok ? "✓" : "✗"} ${name}`);
  if (ok) passed += 1;
}
console.log(`Community Play release preparation: ${passed}/${checks.length} checks passed.`);
if (passed !== checks.length) process.exit(1);
