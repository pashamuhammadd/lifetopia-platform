with checks as(
 select 1 check_order,'Notifications table exists' check_name,'true' expected,(to_regclass('public.community_notifications') is not null)::text actual
 union all select 2,'Announcements table exists','true',(to_regclass('public.community_announcements') is not null)::text
 union all select 3,'Guild table exists','true',(to_regclass('public.community_guilds') is not null)::text
 union all select 4,'Guild members exist','true',(to_regclass('public.community_guild_members') is not null)::text
 union all select 5,'Reply trigger exists','1',count(*)::text from pg_trigger where tgname='notify_comment_reply_after_insert' and not tgisinternal
 union all select 6,'Notification dedupe constraint exists','1',count(*)::text from pg_constraint where conrelid='public.community_notifications'::regclass and contype='u'
 union all select 7,'Anon cannot read private notifications','false',has_table_privilege('anon','public.community_notifications','SELECT')::text
 union all select 8,'Authenticated can read own notifications','true',has_table_privilege('authenticated','public.community_notifications','SELECT')::text
 union all select 9,'Announcement publish RPC exists','true',(to_regprocedure('public.publish_community_announcement(text,text)') is not null)::text
 union all select 10,'Guild creation RPC exists','true',(to_regprocedure('public.create_community_guild(text,text,text,text)') is not null)::text
 union all select 11,'Guild join RPC exists','true',(to_regprocedure('public.join_community_guild(uuid)') is not null)::text
 union all select 12,'Guild approval RPC exists','true',(to_regprocedure('public.review_guild_join_request(uuid,uuid,boolean)') is not null)::text
 union all select 13,'Every guild has one active owner member','0',count(*)::text from public.community_guilds g where(select count(*) from public.community_guild_members m where m.guild_id=g.id and m.user_id=g.owner_id and m.role='owner' and m.status='active')<>1
 union all select 14,'No duplicate guild membership','0',count(*)::text from(select guild_id,user_id from public.community_guild_members group by 1,2 having count(*)>1)x
)
select check_order,check_name,expected,actual,expected=actual passed from checks order by check_order;
