import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const checks = [
  ["follow migration", "supabase/community/community-3-profile-follow-search.sql", "create table if not exists public.community_follows"],
  ["self-follow protection", "supabase/community/community-3-profile-follow-search.sql", "community_follows_not_self"],
  ["authenticated toggle", "supabase/community/community-3-profile-follow-search.sql", "to authenticated"],
  ["profile follow UI", "apps/community/components/profile/FollowButton.tsx", "requestAuth"],
  ["guest-readable Explore", "apps/community/app/explore/page.tsx", "searchExplore"],
  ["followers route", "apps/community/app/user/[username]/followers/page.tsx", "getProfileConnections"],
  ["following route", "apps/community/app/user/[username]/following/page.tsx", "getProfileConnections"],
];

let failed = 0;
for (const [name, file, token] of checks) {
  const path = resolve(process.cwd(), file);
  const passed = existsSync(path) && readFileSync(path, "utf8").includes(token);
  console.log(`${passed ? "✓" : "✗"} ${name}`);
  if (!passed) failed += 1;
}
if (failed) process.exit(1);
console.log(`Community Phase 3: ${checks.length}/${checks.length} structural checks passed.`);
