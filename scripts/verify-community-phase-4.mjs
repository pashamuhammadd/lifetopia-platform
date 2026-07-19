import{existsSync,readFileSync}from"node:fs";import{resolve}from"node:path";
const checks=[
 ["Harmony account and ledger","supabase/community/community-4-quest-harmony.sql","create table if not exists public.harmony_ledger"],
 ["idempotent reward key","supabase/community/community-4-quest-harmony.sql","unique (user_id, source_type, source_key)"],
 ["self-owned private history","supabase/community/community-4-quest-harmony.sql","harmony_ledger_read_own"],
 ["individual claim RPC","supabase/community/community-4-quest-harmony.sql","claim_daily_community_quest(p_quest_code text)"],
 ["meaningful comment guard","supabase/community/community-4-quest-harmony.sql","length(trim(c.content)) >= 20"],
 ["GM or GN post guard","supabase/community/community-4-quest-harmony.sql","p.category='GM / GN' and length(trim(p.content)) >= 2"],
 ["per-task reward","supabase/community/community-4-quest-harmony.sql","points=points+4"],
 ["unique post view tracking","apps/community/components/quest/QuestPostViewTracker.tsx","recordQuestPostView"],
 ["real sidebar Harmony","apps/community/components/layout/Sidebar.tsx","profile?.harmonyPoints"],
 ["quest route","apps/community/app/quest/page.tsx","getMyQuestDashboard"],
];let failed=0;for(const[name,file,token]of checks){const path=resolve(process.cwd(),file);const passed=existsSync(path)&&readFileSync(path,"utf8").includes(token);console.log(`${passed?"✓":"✗"} ${name}`);if(!passed)failed++;}if(failed)process.exit(1);console.log(`Community Phase 4: ${checks.length}/${checks.length} structural checks passed.`);
