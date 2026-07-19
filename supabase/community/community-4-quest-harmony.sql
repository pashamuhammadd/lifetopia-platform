begin;

create table if not exists public.harmony_accounts (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  points bigint not null default 0 check (points >= 0),
  level_floor integer not null default 1 check (level_floor between 1 and 100),
  updated_at timestamptz not null default now()
);

create table if not exists public.harmony_ledger (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  amount integer not null check (amount <> 0),
  balance_after bigint not null check (balance_after >= 0),
  source_type text not null check (source_type in ('daily_quest', 'wallet_verification', 'game', 'event', 'moderation_adjustment')),
  source_key text not null,
  description text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (user_id, source_type, source_key)
);
create index if not exists harmony_ledger_user_created_idx on public.harmony_ledger(user_id, created_at desc);

create table if not exists public.community_quest_events (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  event_type text not null check (event_type in ('daily_login', 'post_view')),
  subject_id uuid,
  event_date date not null default (timezone('utc', now()))::date,
  created_at timestamptz not null default now()
);
create unique index if not exists community_quest_events_unique_idx
  on public.community_quest_events(user_id, event_type, event_date, coalesce(subject_id, '00000000-0000-0000-0000-000000000000'::uuid));

create table if not exists public.community_quest_claims (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  quest_code text not null check (quest_code = 'daily_community'),
  period_key date not null,
  reward integer not null check (reward > 0),
  claimed_at timestamptz not null default now(),
  unique (user_id, quest_code, period_key)
);

insert into public.harmony_accounts(user_id)
select id from public.profiles on conflict (user_id) do nothing;

alter table public.harmony_accounts enable row level security;
alter table public.harmony_ledger enable row level security;
alter table public.community_quest_events enable row level security;
alter table public.community_quest_claims enable row level security;
alter table public.harmony_accounts force row level security;
alter table public.harmony_ledger force row level security;
alter table public.community_quest_events force row level security;
alter table public.community_quest_claims force row level security;

revoke all on public.harmony_accounts, public.harmony_ledger, public.community_quest_events, public.community_quest_claims from public, anon, authenticated;
grant select on public.harmony_accounts to anon, authenticated;
grant select on public.harmony_ledger, public.community_quest_events, public.community_quest_claims to authenticated;

create policy harmony_accounts_public_read on public.harmony_accounts for select to anon, authenticated using (true);
create policy harmony_ledger_read_own on public.harmony_ledger for select to authenticated using (auth.uid() = user_id);
create policy community_quest_events_read_own on public.community_quest_events for select to authenticated using (auth.uid() = user_id);
create policy community_quest_claims_read_own on public.community_quest_claims for select to authenticated using (auth.uid() = user_id);

create or replace function public.ensure_harmony_account(p_user_id uuid)
returns void language plpgsql security definer set search_path = pg_catalog, public as $$
begin
  insert into public.harmony_accounts(user_id) values (p_user_id) on conflict (user_id) do nothing;
end; $$;
revoke all on function public.ensure_harmony_account(uuid) from public, anon, authenticated;

create or replace function public.record_community_quest_event(p_event_type text, p_subject_id uuid default null)
returns boolean language plpgsql security definer set search_path = pg_catalog, public as $$
declare v_user uuid := auth.uid(); v_inserted integer;
begin
  if v_user is null then raise exception 'authentication_required' using errcode = '42501'; end if;
  if p_event_type not in ('daily_login', 'post_view') then raise exception 'invalid_event_type' using errcode = '22023'; end if;
  if p_event_type = 'post_view' and (p_subject_id is null or not exists(select 1 from public.community_posts where id = p_subject_id)) then
    raise exception 'invalid_post' using errcode = '22023';
  end if;
  perform public.ensure_harmony_account(v_user);
  insert into public.community_quest_events(user_id, event_type, subject_id)
  values(v_user, p_event_type, case when p_event_type = 'post_view' then p_subject_id else null end)
  on conflict do nothing;
  get diagnostics v_inserted = row_count;
  return v_inserted = 1;
end; $$;

create or replace function public.get_my_community_quests()
returns table (
  quest_code text, title text, description text, target integer, progress integer,
  completed boolean, bundle_reward integer, bundle_claimed boolean, period_ends_at timestamptz,
  harmony_points bigint, harmony_level integer, level_progress integer, level_target integer
)
language sql stable security definer set search_path = pg_catalog, public as $$
  with me as (select auth.uid() id), day as (
    select timezone('utc', now())::date start_date,
      (timezone('utc', now())::date + 1)::timestamptz period_end
  ), metrics as (
    select
      (select count(*) from public.community_quest_events e, me, day where e.user_id=me.id and e.event_type='daily_login' and e.event_date=day.start_date)::int login_count,
      (select count(distinct e.subject_id) from public.community_quest_events e, me, day where e.user_id=me.id and e.event_type='post_view' and e.event_date=day.start_date)::int view_count,
      (select count(distinct l.post_id) from public.community_likes l, me, day where l.user_id=me.id and l.created_at >= day.start_date::timestamptz and l.created_at < day.period_end)::int like_count,
      (select count(*) from public.community_comments c, me, day where c.author_id=me.id and length(trim(c.content)) >= 20 and c.created_at >= day.start_date::timestamptz and c.created_at < day.period_end)::int comment_count,
      (select count(*) from public.community_posts p, me, day where p.author_id=me.id and length(trim(p.content)) >= 40 and p.created_at >= day.start_date::timestamptz and p.created_at < day.period_end)::int post_count
  ), account as (
    select coalesce(a.points,0) points, greatest(coalesce(a.level_floor,1), floor(coalesce(a.points,0)/500.0)::int+1) lvl
    from me left join public.harmony_accounts a on a.user_id=me.id
  ), claimed as (
    select exists(select 1 from public.community_quest_claims c, me, day where c.user_id=me.id and c.quest_code='daily_community' and c.period_key=day.start_date) yes
  ), quests(code,title,description,target,progress) as (values
    ('daily_login','Visit CommunityHub','Open today’s quest board.',1,(select login_count from metrics)),
    ('read_posts','Read 3 posts','Open three different community posts.',3,(select view_count from metrics)),
    ('like_posts','Like 5 posts','Support five different community posts.',5,(select like_count from metrics)),
    ('meaningful_comment','Write a meaningful comment','Publish one comment with at least 20 characters.',1,(select comment_count from metrics)),
    ('create_post','Create a community post','Publish one post with at least 40 characters.',1,(select post_count from metrics))
  )
  select q.code,q.title,q.description,q.target,least(q.progress,q.target),q.progress>=q.target,20,c.yes,d.period_end,
    a.points,a.lvl,(a.points%500)::int,500
  from quests q cross join account a cross join claimed c cross join day d;
$$;

create or replace function public.claim_daily_community_quest()
returns table (awarded integer, balance bigint, harmony_level integer)
language plpgsql security definer set search_path = pg_catalog, public as $$
declare v_user uuid:=auth.uid(); v_day date:=timezone('utc',now())::date; v_complete boolean; v_balance bigint;
begin
  if v_user is null then raise exception 'authentication_required' using errcode='42501'; end if;
  perform public.ensure_harmony_account(v_user);
  select bool_and(q.completed) into v_complete from public.get_my_community_quests() q;
  if not coalesce(v_complete,false) then raise exception 'quest_incomplete' using errcode='22023'; end if;
  if exists(select 1 from public.community_quest_claims where user_id=v_user and quest_code='daily_community' and period_key=v_day) then
    select points into v_balance from public.harmony_accounts where user_id=v_user;
    return query select 0,v_balance,greatest((select level_floor from public.harmony_accounts where user_id=v_user),floor(v_balance/500.0)::int+1); return;
  end if;
  update public.harmony_accounts set points=points+20,updated_at=now() where user_id=v_user returning points into v_balance;
  insert into public.community_quest_claims(user_id,quest_code,period_key,reward) values(v_user,'daily_community',v_day,20);
  insert into public.harmony_ledger(user_id,amount,balance_after,source_type,source_key,description)
  values(v_user,20,v_balance,'daily_quest','daily_community:'||v_day::text,'Completed Daily Community Quest');
  return query select 20,v_balance,greatest((select level_floor from public.harmony_accounts where user_id=v_user),floor(v_balance/500.0)::int+1);
end; $$;

revoke all on function public.record_community_quest_event(text,uuid), public.get_my_community_quests(), public.claim_daily_community_quest() from public, anon;
grant execute on function public.record_community_quest_event(text,uuid), public.get_my_community_quests(), public.claim_daily_community_quest() to authenticated;

commit;
