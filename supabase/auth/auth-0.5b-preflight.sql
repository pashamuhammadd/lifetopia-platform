-- Lifetopia Authentication
-- Auth 0.5B v2 — Signup repair preflight
--
-- SAFE: SELECT statements only.
-- Continue only when every row returns passed = true.
--
-- The audited orphan account requested the username "Sent", but that
-- username is already attached to another profile. Username ownership
-- will be resolved in the later identity-migration phase. Auth 0.5B
-- restores the orphan with a temporary unique username and records the
-- pending conflict privately.

with snapshot as (
  select
    snapshot_id,
    profile_count,
    auth_user_count,
    profiles_checksum
  from auth_migration_backup.snapshot_runs
  where label =
    'auth_0_5_pre_migration_2026_07_18'
),
current_profiles as (
  select
    count(*) as profile_count,
    md5(
      coalesce(
        string_agg(
          md5(to_jsonb(p)::text),
          ''
          order by p.id::text
        ),
        ''
      )
    ) as profiles_checksum
  from public.profiles p
),
current_auth_users as (
  select count(*) as auth_user_count
  from auth.users
),
orphan_account as (
  select
    u.id,
    u.created_at,
    u.raw_user_meta_data
  from auth.users u
  left join public.profiles p
    on p.id = u.id
  where p.id is null
    and u.id =
      'b4c4cc80-69ce-4bb9-9b30-f7627e7049de'::uuid
),
conflicting_profile as (
  select
    p.id,
    p.username::text as username,
    u.created_at as auth_created_at
  from public.profiles p
  left join auth.users u
    on u.id = p.id
  where p.id =
    'bb6a4f2b-debe-44d7-98be-17c4f94acf5f'::uuid
    and lower(p.username::text) = 'sent'
),
signup_triggers as (
  select
    tg.tgname as trigger_name,
    function_record.proname as function_name
  from pg_trigger tg
  join pg_class table_record
    on table_record.oid = tg.tgrelid
  join pg_namespace table_namespace
    on table_namespace.oid =
      table_record.relnamespace
  join pg_proc function_record
    on function_record.oid = tg.tgfoid
  where not tg.tgisinternal
    and table_namespace.nspname = 'auth'
    and table_record.relname = 'users'
)
select
  check_order,
  check_name,
  expected,
  actual,
  passed
from (
  select
    1 as check_order,
    'Auth 0.5A snapshot exists' as check_name,
    '1' as expected,
    count(*)::text as actual,
    count(*) = 1 as passed
  from snapshot

  union all

  select
    2,
    'profile count still matches snapshot',
    snapshot.profile_count::text,
    current_profiles.profile_count::text,
    snapshot.profile_count =
      current_profiles.profile_count
  from snapshot
  cross join current_profiles

  union all

  select
    3,
    'auth user count still matches snapshot',
    snapshot.auth_user_count::text,
    current_auth_users.auth_user_count::text,
    snapshot.auth_user_count =
      current_auth_users.auth_user_count
  from snapshot
  cross join current_auth_users

  union all

  select
    4,
    'existing profiles are unchanged after failed migration',
    snapshot.profiles_checksum,
    current_profiles.profiles_checksum,
    snapshot.profiles_checksum =
      current_profiles.profiles_checksum
  from snapshot
  cross join current_profiles

  union all

  select
    5,
    'exactly one orphan auth user exists',
    '1',
    (
      select count(*)::text
      from auth.users u
      left join public.profiles p
        on p.id = u.id
      where p.id is null
    ),
    (
      select count(*)
      from auth.users u
      left join public.profiles p
        on p.id = u.id
      where p.id is null
    ) = 1

  union all

  select
    6,
    'audited orphan account is present',
    'b4c4cc80-69ce-4bb9-9b30-f7627e7049de / Sent',
    coalesce(
      max(
        id::text || ' / ' ||
        (raw_user_meta_data ->> 'username')
      ),
      '<missing>'
    ),
    count(*) = 1
      and max(id::text) =
        'b4c4cc80-69ce-4bb9-9b30-f7627e7049de'
      and max(
        raw_user_meta_data ->> 'username'
      ) = 'Sent'
  from orphan_account

  union all

  select
    7,
    'existing Sent profile conflict is present',
    'bb6a4f2b-debe-44d7-98be-17c4f94acf5f / Sent',
    coalesce(
      max(id::text || ' / ' || username),
      '<missing>'
    ),
    count(*) = 1
      and max(id::text) =
        'bb6a4f2b-debe-44d7-98be-17c4f94acf5f'
      and lower(max(username)) = 'sent'
  from conflicting_profile

  union all

  select
    8,
    'orphan account is older and keeps future username priority',
    'true',
    coalesce(
      (
        select (
          orphan.created_at <
          owner.auth_created_at
        )::text
        from orphan_account orphan
        cross join conflicting_profile owner
      ),
      '<missing>'
    ),
    coalesce(
      (
        select
          orphan.created_at <
          owner.auth_created_at
        from orphan_account orphan
        cross join conflicting_profile owner
      ),
      false
    )

  union all

  select
    9,
    'temporary username is available',
    '0',
    count(*)::text,
    count(*) = 0
  from public.profiles
  where lower(username::text) =
    'user_b4c4'

  union all

  select
    10,
    'both legacy signup triggers still exist',
    '2',
    count(*)::text,
    count(*) = 2
      and bool_and(
        trigger_name in (
          'on_auth_user_created',
          'on_auth_user_created_create_player_profile'
        )
      )
  from signup_triggers

  union all

  select
    11,
    'profiles has country_code column',
    '1',
    count(*)::text,
    count(*) = 1
  from information_schema.columns
  where table_schema = 'public'
    and table_name = 'profiles'
    and column_name = 'country_code'

  union all

  select
    12,
    'profiles does not have obsolete country column',
    '0',
    count(*)::text,
    count(*) = 0
  from information_schema.columns
  where table_schema = 'public'
    and table_name = 'profiles'
    and column_name = 'country'
) checks
order by check_order;
