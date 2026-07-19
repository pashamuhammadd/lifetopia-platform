import{existsSync,readFileSync}from"node:fs";import{resolve}from"node:path";
const checks=[
 ["restrictive post visibility","supabase/community/community-6-moderation-admin.sql","as restrictive for select"],
 ["immutable audit trigger","supabase/community/community-6-moderation-admin.sql","Moderation events are immutable"],
 ["Founder protection","supabase/community/community-6-moderation-admin.sql","founder_is_protected"],
 ["staff hierarchy","supabase/community/community-6-moderation-admin.sql","staff_target_requires_admin"],
 ["write restriction trigger","supabase/community/community-6-moderation-admin.sql","enforce_community_write_restriction"],
 ["server-side moderation RPC","apps/community/app/actions/community/moderation.ts","moderate_community_report"],
 ["mobile moderation controls","apps/community/components/admin/ReportModerationActions.tsx","grid-cols-2"],
 ["owner-visible reason","apps/community/components/moderation/AccountRestrictionStatus.tsx","restriction.reason"],
 ["private account status route","apps/community/app/account-status/page.tsx","requireCurrentProfile"],
];let failed=0;for(const[name,file,token]of checks){const path=resolve(process.cwd(),file);const passed=existsSync(path)&&readFileSync(path,"utf8").includes(token);console.log(`${passed?"✓":"✗"} ${name}`);if(!passed)failed++;}if(failed)process.exit(1);console.log(`Community Phase 6: ${checks.length}/${checks.length} structural checks passed.`);
