import { existsSync, readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");
const migration = read("supabase/community/community-10.3-account-deletion.sql");
const action = read("apps/community/app/actions/account-deletion.ts");
const form = read("apps/community/components/settings/DeleteAccountForm.tsx");
const page = read("apps/community/app/account-deletion/page.tsx");
const navigation = read("apps/community/data/navigation.ts");

const checks = [
  ["transactional migration", migration.startsWith("begin;") && migration.trimEnd().endsWith("commit;")],
  ["authenticated self-delete only", migration.includes("auth.uid()") && migration.includes("grant execute") && migration.includes("to authenticated")],
  ["Founder and staff protected", migration.includes("protected_staff_account") && migration.includes("lifetopia_founder_registry")],
  ["explicit confirmation", migration.includes("p_confirmation is distinct from 'DELETE'")],
  ["guild ownership cleanup", migration.includes("delete from public.community_guilds where owner_id = v_user")],
  ["unlinked wallet audit cleanup", migration.includes("wallet_login_events") && migration.includes("wallet_security_events")],
  ["moderation audit anonymization", migration.includes("target_user_id = case") && migration.includes("Moderation events are immutable")],
  ["PL/pgSQL CASE comparisons are parenthesized", migration.includes("is distinct from (case when old.actor_id") && migration.includes("is distinct from (case when old.target_user_id")],
  ["auth cascade finalization", migration.includes("delete from auth.users where id = v_user")],
  ["private non-identifying receipt", migration.includes("account_deletion_receipts") && migration.includes("deletion_summary")],
  ["server action", action.includes('supabase.rpc("delete_my_lifetopia_account"') && action.includes("signOut")],
  ["destructive confirmation form", form.includes('placeholder="DELETE"') && form.includes("Permanently delete my account")],
  ["public deletion URL", page.includes("Delete your CommunityHub account")],
  ["in-app navigation", navigation.includes('href:"/account-deletion"') && navigation.includes("Trash2")],
  ["completion page", existsSync(new URL("apps/community/app/account-deletion/completed/page.tsx", root))],
  ["SQL verification", existsSync(new URL("supabase/community/community-10.3-account-deletion-verify.sql", root))],
];

let passed = 0;
for (const [name, ok] of checks) {
  console.log(`${ok ? "✓" : "✗"} ${name}`);
  if (ok) passed += 1;
}
console.log(`Community 10.3 account deletion: ${passed}/${checks.length} checks passed.`);
if (passed !== checks.length) process.exit(1);
