with checks as (
 select 1 check_order,'Harmony accounts exist' check_name,'true' expected,(to_regclass('public.harmony_accounts') is not null)::text actual
 union all select 2,'Harmony ledger exists','true',(to_regclass('public.harmony_ledger') is not null)::text
 union all select 3,'Quest events exist','true',(to_regclass('public.community_quest_events') is not null)::text
 union all select 4,'Quest claims exist','true',(to_regclass('public.community_quest_claims') is not null)::text
 union all select 5,'Every profile has a Harmony account',(select count(*)::text from public.profiles),(select count(*)::text from public.harmony_accounts)
 union all select 6,'No negative Harmony balances','0',(select count(*)::text from public.harmony_accounts where points<0)
 union all select 7,'No duplicate ledger rewards','0',(select count(*)::text from (select user_id,source_type,source_key from public.harmony_ledger group by 1,2,3 having count(*)>1) x)
 union all select 8,'No duplicate quest claims','0',(select count(*)::text from (select user_id,quest_code,period_key from public.community_quest_claims group by 1,2,3 having count(*)>1) x)
 union all select 9,'Quest event recorder exists','true',(to_regprocedure('public.record_community_quest_event(text,uuid)') is not null)::text
 union all select 10,'Quest dashboard RPC exists','true',(to_regprocedure('public.get_my_community_quests()') is not null)::text
 union all select 11,'Individual quest claim RPC exists','true',(to_regprocedure('public.claim_daily_community_quest(text)') is not null)::text
 union all select 12,'Harmony ledger is private','true',(not exists(select 1 from information_schema.role_table_grants where table_schema='public' and table_name='harmony_ledger' and grantee='anon'))::text
)
select check_order,check_name,expected,actual,expected=actual passed from checks order by check_order;
