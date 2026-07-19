-- Run only when the original Community Phase 4 migration was already applied.
begin;

alter table public.community_quest_claims
  drop constraint if exists community_quest_claims_quest_code_check;
alter table public.community_quest_claims
  add constraint community_quest_claims_quest_code_check
  check (quest_code in ('daily_login','read_posts','like_posts','meaningful_comment','create_post','daily_community'));

drop function if exists public.claim_daily_community_quest();

create or replace function public.get_my_community_quests()
returns table (quest_code text,title text,description text,target integer,progress integer,completed boolean,reward integer,claimed boolean,period_ends_at timestamptz,harmony_points bigint,harmony_level integer,level_progress integer,level_target integer)
language sql stable security definer set search_path=pg_catalog,public as $$
with me as(select auth.uid() id),day as(select timezone('utc',now())::date start_date,(timezone('utc',now())::date+1)::timestamptz period_end),metrics as(
 select
 (select count(*) from public.community_quest_events e,me,day where e.user_id=me.id and e.event_type='daily_login' and e.event_date=day.start_date)::int login_count,
 (select count(distinct e.subject_id) from public.community_quest_events e,me,day where e.user_id=me.id and e.event_type='post_view' and e.event_date=day.start_date)::int view_count,
 (select count(distinct l.post_id) from public.community_likes l,me,day where l.user_id=me.id and l.created_at>=day.start_date::timestamptz and l.created_at<day.period_end)::int like_count,
 (select count(*) from public.community_comments c,me,day where c.author_id=me.id and length(trim(c.content))>=20 and c.created_at>=day.start_date::timestamptz and c.created_at<day.period_end)::int comment_count,
 (select count(*) from public.community_posts p,me,day where p.author_id=me.id and p.category='GM / GN' and length(trim(p.content))>=2 and p.created_at>=day.start_date::timestamptz and p.created_at<day.period_end)::int post_count
),account as(select coalesce(a.points,0) points,greatest(coalesce(a.level_floor,1),floor(coalesce(a.points,0)/500.0)::int+1) lvl from me left join public.harmony_accounts a on a.user_id=me.id),quests(code,title,description,target,progress) as(values
 ('daily_login','Visit CommunityHub','Open today’s quest board.',1,(select login_count from metrics)),
 ('read_posts','Read 3 posts','Open three different community posts.',3,(select view_count from metrics)),
 ('like_posts','Like 5 posts','Support five different community posts.',5,(select like_count from metrics)),
 ('meaningful_comment','Write a meaningful comment','Publish one comment with at least 20 characters.',1,(select comment_count from metrics)),
 ('create_post','Share GM or GN','Publish GM or GN in the GM / GN category.',1,(select post_count from metrics))
)
select q.code,q.title,q.description,q.target,least(q.progress,q.target),q.progress>=q.target,4,
 exists(select 1 from public.community_quest_claims c,me where c.user_id=me.id and c.quest_code in(q.code,'daily_community') and c.period_key=d.start_date),d.period_end,
 a.points,a.lvl,(a.points%500)::int,500 from quests q cross join account a cross join day d;
$$;

create or replace function public.claim_daily_community_quest(p_quest_code text)
returns table(awarded integer,balance bigint,harmony_level integer)
language plpgsql security definer set search_path=pg_catalog,public as $$
declare v_user uuid:=auth.uid();v_day date:=timezone('utc',now())::date;v_complete boolean;v_balance bigint;
begin
 if v_user is null then raise exception 'authentication_required' using errcode='42501';end if;
 if p_quest_code not in('daily_login','read_posts','like_posts','meaningful_comment','create_post') then raise exception 'invalid_quest_code' using errcode='22023';end if;
 perform public.ensure_harmony_account(v_user);
 select q.completed into v_complete from public.get_my_community_quests() q where q.quest_code=p_quest_code;
 if not coalesce(v_complete,false) then raise exception 'quest_incomplete' using errcode='22023';end if;
 if exists(select 1 from public.community_quest_claims where user_id=v_user and quest_code in(p_quest_code,'daily_community') and period_key=v_day) then select points into v_balance from public.harmony_accounts where user_id=v_user;return query select 0,v_balance,greatest((select level_floor from public.harmony_accounts where user_id=v_user),floor(v_balance/500.0)::int+1);return;end if;
 update public.harmony_accounts set points=points+4,updated_at=now() where user_id=v_user returning points into v_balance;
 insert into public.community_quest_claims(user_id,quest_code,period_key,reward) values(v_user,p_quest_code,v_day,4);
 insert into public.harmony_ledger(user_id,amount,balance_after,source_type,source_key,description) values(v_user,4,v_balance,'daily_quest',p_quest_code||':'||v_day::text,'Claimed community quest: '||replace(p_quest_code,'_',' '));
 return query select 4,v_balance,greatest((select level_floor from public.harmony_accounts where user_id=v_user),floor(v_balance/500.0)::int+1);
end;$$;

revoke all on function public.claim_daily_community_quest(text) from public,anon;
grant execute on function public.claim_daily_community_quest(text) to authenticated;
commit;
