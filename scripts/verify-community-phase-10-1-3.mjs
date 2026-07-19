import { readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");
const assetLinks = read("apps/community/app/.well-known/assetlinks.json/route.ts");
const strings = read("apps/community-android/app/src/main/res/values/strings.xml");
const expectedFingerprint = "66:0E:14:31:BF:5C:A9:91:02:5B:1F:9F:0E:31:50:79:E3:D1:14:0C:E3:9F:94:F6:D5:61:A3:33:1D:26:E6:CD";

const checks = [
  ["CommunityHub application label", strings.includes('<string name="app_name">CommunityHub</string>')],
  ["permanent Android package", assetLinks.includes('io.lifetopiaworld.community')],
  ["debug signing fingerprint", assetLinks.includes(expectedFingerprint)],
  ["TWA handle-all-URLs relation", assetLinks.includes('delegate_permission/common.handle_all_urls')],
  ["future release fingerprints remain supported", assetLinks.includes('ANDROID_APP_SHA256_CERT_FINGERPRINTS')],
];

let passed = 0;
for (const [name, ok] of checks) {
  console.log(`${ok ? "✓" : "✗"} ${name}`);
  if (ok) passed += 1;
}
console.log(`Community Phase 10.1.3: ${passed}/${checks.length} checks passed.`);
if (passed !== checks.length) process.exit(1);
