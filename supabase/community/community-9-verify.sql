with checks as(
 select 1 check_order,'Direct conversations exist' check_name,'true' expected,(to_regclass('public.community_direct_conversations')is not null)::text actual
 union all select 2,'Direct messages exist','true',(to_regclass('public.community_direct_messages')is not null)::text
 union all select 3,'Direct read states exist','true',(to_regclass('public.community_direct_reads')is not null)::text
 union all select 4,'Conversation RLS enabled','true',(select relrowsecurity from pg_class where oid='public.community_direct_conversations'::regclass)::text
 union all select 5,'Message RLS enabled','true',(select relrowsecurity from pg_class where oid='public.community_direct_messages'::regclass)::text
 union all select 6,'Conversation pairs remain unique','0',count(*)::text from(select member_low,member_high from public.community_direct_conversations group by 1,2 having count(*)>1)x
 union all select 7,'Conversation pairs remain canonical','0',count(*)::text from public.community_direct_conversations where member_low>=member_high
 union all select 8,'Messages always belong to their sender profile','0',count(*)::text from public.community_direct_messages m left join public.profiles p on p.id=m.sender_id where p.id is null
 union all select 9,'Start RPC exists','true',(to_regprocedure('public.start_community_direct_conversation(text)')is not null)::text
 union all select 10,'Send RPC exists','true',(to_regprocedure('public.send_community_direct_message(uuid,text)')is not null)::text
 union all select 11,'Inbox RPC exists','true',(to_regprocedure('public.get_my_community_direct_conversations()')is not null)::text
 union all select 12,'Thread RPC exists','true',(to_regprocedure('public.get_community_direct_messages(uuid)')is not null)::text
 union all select 13,'Unread RPC exists','true',(to_regprocedure('public.get_unread_community_direct_message_count()')is not null)::text
 union all select 14,'Anon cannot start conversations','false',has_function_privilege('anon','public.start_community_direct_conversation(text)','EXECUTE')::text
 union all select 15,'Anon cannot send messages','false',has_function_privilege('anon','public.send_community_direct_message(uuid,text)','EXECUTE')::text
 union all select 16,'Direct message tables are not granted to anon','true',(not exists(select 1 from information_schema.role_table_grants where table_schema='public'and table_name in('community_direct_conversations','community_direct_messages','community_direct_reads')and grantee='anon'))::text
)
select *,expected=actual passed from checks order by check_order;
