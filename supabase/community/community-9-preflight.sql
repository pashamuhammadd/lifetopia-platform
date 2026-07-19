with checks as (
 select 1 check_order,'Profiles exist' check_name,'true' expected,(to_regclass('public.profiles') is not null)::text actual
 union all select 2,'Account restrictions exist','true',(to_regclass('public.community_account_restrictions') is not null)::text
 union all select 3,'Direct conversations are not installed','true',(to_regclass('public.community_direct_conversations') is null)::text
 union all select 4,'Direct messages are not installed','true',(to_regclass('public.community_direct_messages') is null)::text
 union all select 5,'Direct read states are not installed','true',(to_regclass('public.community_direct_reads') is null)::text
 union all select 6,'Start conversation RPC is absent','true',(to_regprocedure('public.start_community_direct_conversation(text)') is null)::text
 union all select 7,'Send message RPC is absent','true',(to_regprocedure('public.send_community_direct_message(uuid,text)') is null)::text
)
select *,expected=actual passed from checks order by check_order;
