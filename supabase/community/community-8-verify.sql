with checks as (
  select 1 check_order,'My World RPC exists' check_name,'true' expected,(to_regprocedure('public.get_my_world_dashboard()') is not null)::text actual
  union all select 2,'Authenticated can execute My World RPC','true',has_function_privilege('authenticated','public.get_my_world_dashboard()','EXECUTE')::text
  union all select 3,'Anon cannot execute My World RPC','false',has_function_privilege('anon','public.get_my_world_dashboard()','EXECUTE')::text
  union all select 4,'Public cannot execute My World RPC','false',has_function_privilege('public','public.get_my_world_dashboard()','EXECUTE')::text
  union all select 5,'Every profile has a Harmony account','0',count(*)::text from public.profiles p left join public.harmony_accounts h on h.user_id=p.id where h.user_id is null
  union all select 6,'Harmony balances remain non-negative','0',count(*)::text from public.harmony_accounts where points<0
  union all select 7,'Wallet addresses remain globally unique','0',count(*)::text from(select chain,address from public.account_wallets group by 1,2 having count(*)>1)x
  union all select 8,'Follow edges do not point to self','0',count(*)::text from public.community_follows where follower_id=followed_id
  union all select 9,'Guild membership remains unique','0',count(*)::text from(select guild_id,user_id from public.community_guild_members group by 1,2 having count(*)>1)x
  union all select 10,'Guild owners keep active owner membership','0',count(*)::text from public.community_guilds g where not exists(select 1 from public.community_guild_members m where m.guild_id=g.id and m.user_id=g.owner_id and m.role='owner' and m.status='active')
  union all select 11,'Quest claims remain unique','0',count(*)::text from(select user_id,quest_code,period_key from public.community_quest_claims group by 1,2,3 having count(*)>1)x
  union all select 12,'Harmony ledger remains private from anon','true',(not exists(select 1 from information_schema.role_table_grants where table_schema='public' and table_name='harmony_ledger' and grantee='anon'))::text
)
select *,expected=actual passed from checks order by check_order;
