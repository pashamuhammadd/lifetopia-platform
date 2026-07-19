with checks as(
 select 1 check_order,'Profiles exist' check_name,'true' expected,(to_regclass('public.profiles') is not null)::text actual
 union all select 2,'Comments exist','true',(to_regclass('public.community_comments') is not null)::text
 union all select 3,'Role catalog exists','true',(to_regclass('public.lifetopia_role_catalog') is not null)::text
 union all select 4,'Notifications are not installed','true',(to_regclass('public.community_notifications') is null)::text
 union all select 5,'Announcements are not installed','true',(to_regclass('public.community_announcements') is null)::text
 union all select 6,'Guilds are not installed','true',(to_regclass('public.community_guilds') is null)::text
 union all select 7,'Guild members are not installed','true',(to_regclass('public.community_guild_members') is null)::text
)
select check_order,check_name,expected,actual,expected=actual passed from checks order by check_order;
