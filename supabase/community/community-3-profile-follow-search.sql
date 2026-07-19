begin;

create extension if not exists pg_trgm with schema extensions;

create table if not exists public.community_follows (
  follower_id uuid not null references public.profiles(id) on delete cascade,
  followed_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, followed_id),
  constraint community_follows_not_self check (follower_id <> followed_id)
);

create index if not exists community_follows_followed_created_idx
  on public.community_follows (followed_id, created_at desc);
create index if not exists community_follows_follower_created_idx
  on public.community_follows (follower_id, created_at desc);
create index if not exists profiles_username_search_idx
  on public.profiles using gin ((lower(username)) extensions.gin_trgm_ops);
create index if not exists profiles_display_name_search_idx
  on public.profiles using gin ((lower(display_name)) extensions.gin_trgm_ops);
create index if not exists community_posts_content_search_idx
  on public.community_posts using gin ((lower(content)) extensions.gin_trgm_ops);

alter table public.community_follows enable row level security;
alter table public.community_follows force row level security;

revoke all on public.community_follows from public, anon, authenticated;
grant select on public.community_follows to anon, authenticated;
grant insert, delete on public.community_follows to authenticated;

drop policy if exists community_follows_public_read on public.community_follows;
create policy community_follows_public_read
on public.community_follows for select to anon, authenticated using (true);

drop policy if exists community_follows_insert_own on public.community_follows;
create policy community_follows_insert_own
on public.community_follows for insert to authenticated
with check (auth.uid() = follower_id and follower_id <> followed_id);

drop policy if exists community_follows_delete_own on public.community_follows;
create policy community_follows_delete_own
on public.community_follows for delete to authenticated
using (auth.uid() = follower_id);

create or replace function public.toggle_community_follow(p_target_user_id uuid)
returns boolean
language plpgsql
security invoker
set search_path = pg_catalog, public
as $$
declare
  v_user_id uuid := auth.uid();
begin
  if v_user_id is null then
    raise exception 'authentication_required' using errcode = '42501';
  end if;
  if p_target_user_id is null or p_target_user_id = v_user_id then
    raise exception 'invalid_follow_target' using errcode = '22023';
  end if;
  if not exists (select 1 from public.profiles where id = p_target_user_id) then
    raise exception 'profile_not_found' using errcode = 'P0002';
  end if;

  delete from public.community_follows
  where follower_id = v_user_id and followed_id = p_target_user_id;
  if found then return false; end if;

  insert into public.community_follows (follower_id, followed_id)
  values (v_user_id, p_target_user_id)
  on conflict do nothing;
  return true;
end;
$$;

create or replace function public.get_community_profile_follow_state(p_profile_id uuid)
returns table (followers_count bigint, following_count bigint, viewer_is_following boolean)
language sql stable security invoker
set search_path = pg_catalog, public
as $$
  select
    (select count(*) from public.community_follows where followed_id = p_profile_id),
    (select count(*) from public.community_follows where follower_id = p_profile_id),
    coalesce(exists (
      select 1 from public.community_follows
      where follower_id = auth.uid() and followed_id = p_profile_id
    ), false);
$$;

create or replace function public.search_community_profiles(
  p_query text default '', p_limit integer default 12, p_offset integer default 0
)
returns table (
  id uuid, username text, display_name text, avatar_id text, role text,
  account_type text, followers_count bigint, following_count bigint,
  viewer_is_following boolean
)
language sql stable security invoker
set search_path = pg_catalog, public, extensions
as $$
  select p.id, p.username::text, p.display_name::text, p.avatar_id::text,
    p.role::text, p.account_type::text,
    (select count(*) from public.community_follows f where f.followed_id = p.id),
    (select count(*) from public.community_follows f where f.follower_id = p.id),
    coalesce(exists (
      select 1 from public.community_follows f
      where f.follower_id = auth.uid() and f.followed_id = p.id
    ), false)
  from public.profiles p
  where trim(coalesce(p_query, '')) = ''
     or lower(p.username::text) like '%' || lower(trim(p_query)) || '%'
     or lower(p.display_name::text) like '%' || lower(trim(p_query)) || '%'
  order by
    case when trim(coalesce(p_query, '')) <> '' then
      greatest(similarity(lower(p.username::text), lower(trim(p_query))),
               similarity(lower(p.display_name::text), lower(trim(p_query))))
    else 0 end desc,
    (select count(*) from public.community_follows f where f.followed_id = p.id) desc,
    p.created_at desc
  limit least(greatest(coalesce(p_limit, 12), 1), 50)
  offset greatest(coalesce(p_offset, 0), 0);
$$;

create or replace function public.search_community_posts(
  p_query text default '', p_limit integer default 12, p_offset integer default 0
)
returns table (
  id uuid, content text, category text, created_at timestamptz,
  author_id uuid, username text, display_name text, avatar_id text,
  likes_count bigint, comments_count bigint
)
language sql stable security invoker
set search_path = pg_catalog, public
as $$
  select post.id, post.content::text, post.category::text, post.created_at,
    profile.id, profile.username::text, profile.display_name::text, profile.avatar_id::text,
    (select count(*) from public.community_likes l where l.post_id = post.id),
    (select count(*) from public.community_comments c where c.post_id = post.id)
  from public.community_posts post
  join public.profiles profile on profile.id = post.author_id
  where trim(coalesce(p_query, '')) = ''
     or lower(post.content::text) like '%' || lower(trim(p_query)) || '%'
     or lower(post.category::text) like '%' || lower(trim(p_query)) || '%'
  order by
    ((select count(*) from public.community_likes l where l.post_id = post.id)
      + (select count(*) from public.community_comments c where c.post_id = post.id)) desc,
    post.created_at desc
  limit least(greatest(coalesce(p_limit, 12), 1), 50)
  offset greatest(coalesce(p_offset, 0), 0);
$$;

create or replace function public.get_community_profile_connections(
  p_profile_id uuid, p_kind text, p_limit integer default 24, p_offset integer default 0
)
returns table (
  id uuid, username text, display_name text, avatar_id text, role text,
  account_type text, followers_count bigint, viewer_is_following boolean
)
language sql stable security invoker
set search_path = pg_catalog, public
as $$
  select p.id, p.username::text, p.display_name::text, p.avatar_id::text,
    p.role::text, p.account_type::text,
    (select count(*) from public.community_follows totals where totals.followed_id = p.id),
    coalesce(exists (
      select 1 from public.community_follows mine
      where mine.follower_id = auth.uid() and mine.followed_id = p.id
    ), false)
  from public.community_follows edge
  join public.profiles p on p.id = case
    when p_kind = 'followers' then edge.follower_id else edge.followed_id end
  where p_kind in ('followers', 'following')
    and case when p_kind = 'followers'
      then edge.followed_id = p_profile_id else edge.follower_id = p_profile_id end
  order by edge.created_at desc
  limit least(greatest(coalesce(p_limit, 24), 1), 50)
  offset greatest(coalesce(p_offset, 0), 0);
$$;

revoke all on function public.toggle_community_follow(uuid) from public, anon;
revoke all on function public.get_community_profile_follow_state(uuid) from public;
revoke all on function public.search_community_profiles(text, integer, integer) from public;
revoke all on function public.search_community_posts(text, integer, integer) from public;
revoke all on function public.get_community_profile_connections(uuid, text, integer, integer) from public;
grant execute on function public.toggle_community_follow(uuid) to authenticated;
grant execute on function public.get_community_profile_follow_state(uuid) to anon, authenticated;
grant execute on function public.search_community_profiles(text, integer, integer) to anon, authenticated;
grant execute on function public.search_community_posts(text, integer, integer) to anon, authenticated;
grant execute on function public.get_community_profile_connections(uuid, text, integer, integer) to anon, authenticated;

commit;
