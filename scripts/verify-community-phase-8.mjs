import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const sql = read("supabase/community/community-8-my-world.sql");
const data = read("apps/community/data/my-world.ts");
const page = read("apps/community/app/my-world/page.tsx");
const ui = read("apps/community/components/my-world/MyWorldDashboard.tsx");
const checks = [
  ["authenticated dashboard RPC", sql.includes("get_my_world_dashboard") && sql.includes("authentication_required")],
  ["anon denied", sql.includes("revoke all on function public.get_my_world_dashboard() from public,anon")],
  ["real profile identity", sql.includes("from public.profiles") && ui.includes("View public profile")],
  ["real Harmony summary", sql.includes("harmony_accounts") && ui.includes("CommunityHub progression")],
  ["Unity level disclaimer", ui.includes("not your Unity game level")],
  ["real wallet status", sql.includes("account_wallets") && ui.includes("Manage wallet")],
  ["real community counts", sql.includes("community_follows") && sql.includes("community_posts")],
  ["real quest claims", sql.includes("community_quest_claims")],
  ["real guild memberships", sql.includes("community_guild_members") && ui.includes("My guilds")],
  ["recent real activity", data.includes("harmony_ledger") && data.includes("community_posts")],
  ["protected My World route", page.includes('requireCurrentProfile("/my-world")')],
  ["mobile-safe dashboard", ui.includes("pb-24 md:pb-0") && ui.includes("lg:grid-cols")],
];
let passed = 0;
for (const [name, ok] of checks) { console.log(`${ok ? "✓" : "✗"} ${name}`); if (ok) passed += 1; }
console.log(`Community Phase 8: ${passed}/${checks.length} structural checks passed.`);
if (passed !== checks.length) process.exit(1);
