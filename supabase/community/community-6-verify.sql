with checks as(
 select 1 check_order,'Moderation status exists on posts' check_name,'true' expected,exists(select 1 from information_schema.columns where table_schema='public' and table_name='community_posts' and column_name='moderation_status')::text actual
 union all select 2,'Moderation status exists on comments','true',exists(select 1 from information_schema.columns where table_schema='public' and table_name='community_comments' and column_name='moderation_status')::text
 union all select 3,'Restriction table exists','true',(to_regclass('public.community_account_restrictions') is not null)::text
 union all select 4,'Immutable audit table exists','true',(to_regclass('public.community_moderation_events') is not null)::text
 union all select 5,'Moderation RPC exists','true',(to_regprocedure('public.moderate_community_report(uuid,text,text,integer)') is not null)::text
 union all select 6,'Authenticated can request moderated decision','true',has_function_privilege('authenticated','public.moderate_community_report(uuid,text,text,integer)','EXECUTE')::text
 union all select 7,'Anon cannot moderate','false',has_function_privilege('anon','public.moderate_community_report(uuid,text,text,integer)','EXECUTE')::text
 union all select 8,'Restrictive post visibility policy exists','1',count(*)::text from pg_policies where schemaname='public' and tablename='community_posts' and policyname='community_posts_moderation_visibility' and permissive='RESTRICTIVE'
 union all select 9,'Restrictive comment visibility policy exists','1',count(*)::text from pg_policies where schemaname='public' and tablename='community_comments' and policyname='community_comments_moderation_visibility' and permissive='RESTRICTIVE'
 union all select 10,'Write restriction triggers exist','2',count(*)::text from pg_trigger where tgname in('enforce_post_write_restriction','enforce_comment_write_restriction') and not tgisinternal
 union all select 11,'Audit protection trigger exists','1',count(*)::text from pg_trigger where tgname='protect_community_moderation_event_before_change' and not tgisinternal
 union all select 12,'Founder remains unique and protected','1',(select count(*)::text from public.profiles where role='founder')
 union all select 13,'No Founder restriction exists','0',count(*)::text from public.community_account_restrictions r join public.profiles p on p.id=r.user_id where p.role='founder'
 union all select 14,'No expired restriction remains','0',count(*)::text from public.community_account_restrictions where expires_at is not null and expires_at<=now()
)
select check_order,check_name,expected,actual,expected=actual passed from checks order by check_order;
