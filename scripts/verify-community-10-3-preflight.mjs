import { readFileSync } from "node:fs";

const sql = readFileSync(new URL("../supabase/community/community-10.3-account-deletion-preflight.sql", import.meta.url), "utf8");
const checks = [
  ["read-only preflight", !/\b(insert|update|delete|alter|drop|truncate|create)\s+(into|table|function|policy|trigger|from|auth\.users|public\.)/i.test(sql)],
  ["auth user foreign keys", sql.includes("auth") && sql.includes("users") && sql.includes("confdeltype")],
  ["profile foreign keys", sql.includes("public") && sql.includes("profiles")],
  ["identity-column inventory", sql.includes("identity_column") && sql.includes("owner_id") && sql.includes("actor_id")],
  ["profile shape", sql.includes("profile_column") && sql.includes("pg_attrdef")],
  ["account triggers", sql.includes("pg_trigger") && sql.includes("pg_get_triggerdef")],
  ["storage policies", sql.includes("storage_policy") && sql.includes("pg_policies")],
];

let passed = 0;
for (const [name, ok] of checks) {
  console.log(`${ok ? "✓" : "✗"} ${name}`);
  if (ok) passed += 1;
}
console.log(`Community 10.3 preflight: ${passed}/${checks.length} checks passed.`);
if (passed !== checks.length) process.exit(1);
