import { readFileSync } from "node:fs";

const settings = readFileSync(new URL("../apps/community/components/settings/Settings.tsx", import.meta.url), "utf8");
const checks = [
  ["Danger Zone is present", settings.includes('title="Danger Zone"')],
  ["deletion route is linked", settings.includes('href="/account-deletion"')],
  ["mobile full-width action", settings.includes("w-full") && settings.includes("sm:w-auto")],
  ["destructive styling", settings.includes("bg-[#c12626]") && settings.includes("Trash2")],
  ["existing logout remains", settings.includes("<LogoutSection />")],
  ["existing identity and security remain", settings.includes('title="Current Identity"') && settings.includes('title="Security Features"')],
];

let passed = 0;
for (const [name, ok] of checks) {
  console.log(`${ok ? "✓" : "✗"} ${name}`);
  if (ok) passed += 1;
}
console.log(`Community 10.3.2 mobile deletion entry: ${passed}/${checks.length} checks passed.`);
if (passed !== checks.length) process.exit(1);
