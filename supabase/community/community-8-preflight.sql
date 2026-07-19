with checks as (
  select 1 check_order,'Profiles exist' check_name,'true' expected,(to_regclass('public.profiles') is not null)::text actual
  union all select 2,'Community posts exist','true',(to_regclass('public.community_posts') is not null)::text
  union all select 3,'Community follows exist','true',(to_regclass('public.community_follows') is not null)::text
  union all select 4,'Harmony accounts exist','true',(to_regclass('public.harmony_accounts') is not null)::text
  union all select 5,'Harmony ledger exists','true',(to_regclass('public.harmony_ledger') is not null)::text
  union all select 6,'Quest claims exist','true',(to_regclass('public.community_quest_claims') is not null)::text
  union all select 7,'Solana wallets exist','true',(to_regclass('public.account_wallets') is not null)::text
  union all select 8,'Guilds exist','true',(to_regclass('public.community_guilds') is not null)::text
  union all select 9,'Guild members exist','true',(to_regclass('public.community_guild_members') is not null)::text
  union all select 10,'My World RPC is not installed','true',(to_regprocedure('public.get_my_world_dashboard()') is null)::text
)
select *,expected=actual passed from checks order by check_order;
