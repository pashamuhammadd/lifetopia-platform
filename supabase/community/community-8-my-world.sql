begin;

create or replace function public.get_my_world_dashboard()
returns table(
  profile_id uuid,
  username text,
  display_name text,
  avatar_id text,
  profile_role text,
  account_type text,
  joined_at timestamptz,
  harmony_points bigint,
  harmony_level integer,
  harmony_level_progress integer,
  harmony_level_target integer,
  wallet_linked boolean,
  wallet_address text,
  wallet_linked_at timestamptz,
  posts_count bigint,
  followers_count bigint,
  following_count bigint,
  daily_claims integer,
  guilds jsonb
)
language plpgsql
security definer
set search_path=pg_catalog,public
as $$
declare
  v_user uuid:=auth.uid();
begin
  if v_user is null then
    raise exception 'authentication_required' using errcode='42501';
  end if;

  return query
  select
    p.id,
    p.username::text,
    p.display_name::text,
    p.avatar_id::text,
    p.role::text,
    p.account_type::text,
    p.created_at,
    coalesce(h.points,0)::bigint,
    greatest(coalesce(h.level_floor,1),floor(coalesce(h.points,0)/500.0)::integer+1),
    (coalesce(h.points,0)%500)::integer,
    500,
    (w.address is not null),
    w.address::text,
    w.linked_at,
    (select count(*) from public.community_posts post where post.author_id=v_user),
    (select count(*) from public.community_follows edge where edge.followed_id=v_user),
    (select count(*) from public.community_follows edge where edge.follower_id=v_user),
    (select count(*)::integer from public.community_quest_claims claim where claim.user_id=v_user and claim.period_key=(now() at time zone 'utc')::date and claim.quest_code<>'daily_community'),
    coalesce((
      select jsonb_agg(jsonb_build_object(
        'id',g.id,
        'slug',g.slug,
        'name',g.name,
        'role',member.role,
        'status',member.status,
        'memberCount',(select count(*) from public.community_guild_members gm where gm.guild_id=g.id and gm.status='active')
      ) order by g.name)
      from public.community_guild_members member
      join public.community_guilds g on g.id=member.guild_id
      where member.user_id=v_user
    ),'[]'::jsonb)
  from public.profiles p
  left join public.harmony_accounts h on h.user_id=p.id
  left join lateral (
    select wallet.address,wallet.linked_at
    from public.account_wallets wallet
    where wallet.user_id=p.id and wallet.chain='solana'
    order by wallet.linked_at desc
    limit 1
  ) w on true
  where p.id=v_user;
end;
$$;

revoke all on function public.get_my_world_dashboard() from public,anon;
grant execute on function public.get_my_world_dashboard() to authenticated;

comment on function public.get_my_world_dashboard() is
'Authenticated CommunityHub My World summary. Harmony is off-chain community progression and must not be presented as Unity game level or XP.';

commit;
