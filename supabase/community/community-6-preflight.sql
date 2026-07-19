with checks as(
 select 1 check_order,'Community reports exist' check_name,'true' expected,(to_regclass('public.community_reports') is not null)::text actual
 union all select 2,'Community posts exist','true',(to_regclass('public.community_posts') is not null)::text
 union all select 3,'Community comments exist','true',(to_regclass('public.community_comments') is not null)::text
 union all select 4,'Official role catalog exists','true',(to_regclass('public.lifetopia_role_catalog') is not null)::text
 union all select 5,'Founder registry exists','true',(to_regclass('public.lifetopia_founder_registry') is not null)::text
 union all select 6,'Exactly one Founder exists','1',(select count(*)::text from public.profiles where role='founder')
 union all select 7,'Moderation audit is not installed','true',(to_regclass('public.community_moderation_events') is null)::text
 union all select 8,'Community restrictions are not installed','true',(to_regclass('public.community_account_restrictions') is null)::text
)
select check_order,check_name,expected,actual,expected=actual passed from checks order by check_order;
