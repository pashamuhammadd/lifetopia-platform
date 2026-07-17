-- Lifetopia Authentication
-- Auth 0.5B v2 — Repair signup and restore the orphan profile safely
--
-- Run only after auth-0.5b-preflight.sql returns passed = true
-- for every check.
--
-- IMPORTANT IDENTITY DECISION
-- The orphan account is older and requested "Sent", but another profile
-- currently owns that username. This phase does not disrupt the existing
-- profile. It restores the orphan as "user_b4c4" and records a private,
-- pending conflict. The later username-migration phase will enforce the
-- agreed rule that the oldest account receives final username priority.
--
-- This migration does not normalize existing usernames, change roles,
-- change profile RLS, or change Supabase Auth dashboard settings.

begin;

set local lock_timeout = '10s';
set local statement_timeout = '60s';

do $precondition$
declare
  v_snapshot_profile_count bigint;
  v_snapshot_auth_user_count bigint;
  v_snapshot_profiles_checksum text;
  v_current_profile_count bigint;
  v_current_auth_user_count bigint;
  v_current_profiles_checksum text;
  v_orphan_count bigint;
begin
  select
    profile_count,
    auth_user_count,
    profiles_checksum
  into
    v_snapshot_profile_count,
    v_snapshot_auth_user_count,
    v_snapshot_profiles_checksum
  from auth_migration_backup.snapshot_runs
  where label =
    'auth_0_5_pre_migration_2026_07_18';

  if not found then
    raise exception
      'Required Auth 0.5A snapshot was not found.';
  end if;

  select
    count(*),
    md5(
      coalesce(
        string_agg(
          md5(to_jsonb(p)::text),
          ''
          order by p.id::text
        ),
        ''
      )
    )
  into
    v_current_profile_count,
    v_current_profiles_checksum
  from public.profiles p;

  select count(*)
  into v_current_auth_user_count
  from auth.users;

  if
    v_current_profile_count <>
      v_snapshot_profile_count
    or v_current_profiles_checksum <>
      v_snapshot_profiles_checksum
  then
    raise exception
      'public.profiles changed after Auth 0.5A. Stop and create a new reviewed snapshot.';
  end if;

  if
    v_current_auth_user_count <>
      v_snapshot_auth_user_count
  then
    raise exception
      'auth.users count changed after Auth 0.5A. Stop and re-audit before continuing.';
  end if;

  select count(*)
  into v_orphan_count
  from auth.users u
  left join public.profiles p
    on p.id = u.id
  where p.id is null;

  if v_orphan_count <> 1 then
    raise exception
      'The orphan-account count no longer matches the reviewed audit.';
  end if;

  if not exists (
    select 1
    from auth.users u
    left join public.profiles p
      on p.id = u.id
    where p.id is null
      and u.id =
        'b4c4cc80-69ce-4bb9-9b30-f7627e7049de'::uuid
      and u.raw_user_meta_data ->> 'username' =
        'Sent'
  ) then
    raise exception
      'The audited orphan account is no longer present.';
  end if;

  if not exists (
    select 1
    from public.profiles p
    where p.id =
      'bb6a4f2b-debe-44d7-98be-17c4f94acf5f'::uuid
      and lower(p.username::text) = 'sent'
  ) then
    raise exception
      'The audited Sent username owner no longer matches the review.';
  end if;

  if exists (
    select 1
    from public.profiles p
    where lower(p.username::text) =
      'user_b4c4'
  ) then
    raise exception
      'Temporary username user_b4c4 is no longer available.';
  end if;

  if not exists (
    select 1
    from auth.users orphan
    join auth.users owner
      on owner.id =
        'bb6a4f2b-debe-44d7-98be-17c4f94acf5f'::uuid
    where orphan.id =
      'b4c4cc80-69ce-4bb9-9b30-f7627e7049de'::uuid
      and orphan.created_at <
        owner.created_at
  ) then
    raise exception
      'Username-priority order no longer matches the reviewed audit.';
  end if;
end;
$precondition$;

lock table auth.users
  in share row exclusive mode;

lock table public.profiles
  in share row exclusive mode;

create table if not exists
  auth_migration_backup.pending_username_conflicts (
    profile_id uuid primary key,
    desired_username text not null,
    temporary_username text not null unique,
    conflicting_profile_id uuid not null,
    priority_basis text not null,
    status text not null default 'pending'
      check (
        status in (
          'pending',
          'resolved'
        )
      ),
    created_at timestamptz not null default now(),
    resolved_at timestamptz
  );

revoke all
on auth_migration_backup.pending_username_conflicts
from public, anon, authenticated;

drop trigger if exists
  on_auth_user_created
  on auth.users;

drop trigger if exists
  on_auth_user_created_create_player_profile
  on auth.users;

drop trigger if exists
  on_auth_user_created_create_lifetopia_profile
  on auth.users;

drop function if exists
  public.handle_new_user();

drop function if exists
  public.handle_new_player_profile();

drop function if exists
  public.handle_new_lifetopia_profile();

create function public.handle_new_lifetopia_profile()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog
as $function$
declare
  v_metadata jsonb :=
    coalesce(
      new.raw_user_meta_data,
      '{}'::jsonb
    );
  v_username text :=
    nullif(
      btrim(
        coalesce(
          new.raw_user_meta_data ->> 'username',
          ''
        )
      ),
      ''
    );
  v_display_name text :=
    nullif(
      btrim(
        coalesce(
          new.raw_user_meta_data ->> 'display_name',
          ''
        )
      ),
      ''
    );
  v_gender text :=
    lower(
      nullif(
        btrim(
          coalesce(
            new.raw_user_meta_data ->> 'gender',
            ''
          )
        ),
        ''
      )
    );
  v_avatar_id text :=
    coalesce(
      nullif(
        btrim(
          coalesce(
            new.raw_user_meta_data ->> 'avatar_id',
            ''
          )
        ),
        ''
      ),
      'avatar-01'
    );
  v_country_code text :=
    upper(
      nullif(
        btrim(
          coalesce(
            new.raw_user_meta_data ->> 'country_code',
            new.raw_user_meta_data ->> 'country',
            ''
          )
        ),
        ''
      )
    );
  v_country_name text :=
    nullif(
      btrim(
        coalesce(
          new.raw_user_meta_data ->> 'country_name',
          ''
        )
      ),
      ''
    );
  v_date_of_birth date;
begin
  if v_username is null then
    raise exception
      'Missing required username metadata.';
  end if;

  if v_display_name is null then
    raise exception
      'Missing required display_name metadata.';
  end if;

  if v_gender is null
    or v_gender not in ('male', 'female')
  then
    raise exception
      'Invalid or missing gender metadata.';
  end if;

  if v_country_code is null then
    raise exception
      'Missing required country metadata.';
  end if;

  if v_country_name is null then
    raise exception
      'Missing required country_name metadata.';
  end if;

  if nullif(
    v_metadata ->> 'date_of_birth',
    ''
  ) is null then
    raise exception
      'Missing required date_of_birth metadata.';
  end if;

  begin
    v_date_of_birth :=
      (v_metadata ->> 'date_of_birth')::date;
  exception
    when invalid_datetime_format then
      raise exception
        'Invalid date_of_birth metadata.';
  end;

  insert into public.profiles (
    id,
    username,
    display_name,
    gender,
    avatar_id,
    country_code,
    country_name,
    date_of_birth,
    account_type,
    role
  )
  values (
    new.id,
    v_username,
    v_display_name,
    v_gender,
    v_avatar_id,
    v_country_code,
    v_country_name,
    v_date_of_birth,
    'player',
    'player'
  );

  return new;
end;
$function$;

comment on function
  public.handle_new_lifetopia_profile()
is
  'Creates one Lifetopia profile after auth signup. Role and account type are never accepted from client metadata.';

revoke all
on function public.handle_new_lifetopia_profile()
from public, anon, authenticated;

create trigger
  on_auth_user_created_create_lifetopia_profile
after insert on auth.users
for each row
execute function
  public.handle_new_lifetopia_profile();

insert into public.profiles (
  id,
  username,
  display_name,
  gender,
  avatar_id,
  country_code,
  country_name,
  date_of_birth,
  account_type,
  role,
  created_at,
  updated_at
)
select
  u.id,
  'user_b4c4',
  nullif(
    btrim(
      u.raw_user_meta_data ->> 'display_name'
    ),
    ''
  ),
  lower(
    nullif(
      btrim(
        u.raw_user_meta_data ->> 'gender'
      ),
      ''
    )
  ),
  coalesce(
    nullif(
      btrim(
        u.raw_user_meta_data ->> 'avatar_id'
      ),
      ''
    ),
    'avatar-01'
  ),
  upper(
    coalesce(
      nullif(
        btrim(
          u.raw_user_meta_data ->> 'country_code'
        ),
        ''
      ),
      nullif(
        btrim(
          u.raw_user_meta_data ->> 'country'
        ),
        ''
      )
    )
  ),
  nullif(
    btrim(
      u.raw_user_meta_data ->> 'country_name'
    ),
    ''
  ),
  (
    u.raw_user_meta_data ->> 'date_of_birth'
  )::date,
  'player',
  'player',
  u.created_at,
  u.created_at
from auth.users u
where u.id =
  'b4c4cc80-69ce-4bb9-9b30-f7627e7049de'::uuid
  and not exists (
    select 1
    from public.profiles p
    where p.id = u.id
  );

insert into
  auth_migration_backup.pending_username_conflicts (
    profile_id,
    desired_username,
    temporary_username,
    conflicting_profile_id,
    priority_basis,
    status
  )
values (
  'b4c4cc80-69ce-4bb9-9b30-f7627e7049de'::uuid,
  'Sent',
  'user_b4c4',
  'bb6a4f2b-debe-44d7-98be-17c4f94acf5f'::uuid,
  'older_auth_user_keeps_final_username_priority',
  'pending'
)
on conflict (profile_id) do update
set
  desired_username =
    excluded.desired_username,
  temporary_username =
    excluded.temporary_username,
  conflicting_profile_id =
    excluded.conflicting_profile_id,
  priority_basis =
    excluded.priority_basis,
  status = 'pending',
  resolved_at = null;

do $postcondition$
declare
  v_orphan_count bigint;
  v_profile_count bigint;
  v_auth_user_count bigint;
  v_trigger_count bigint;
  v_conflict_count bigint;
begin
  select count(*)
  into v_orphan_count
  from auth.users u
  left join public.profiles p
    on p.id = u.id
  where p.id is null;

  select count(*)
  into v_profile_count
  from public.profiles;

  select count(*)
  into v_auth_user_count
  from auth.users;

  select count(*)
  into v_trigger_count
  from pg_trigger tg
  join pg_class table_record
    on table_record.oid = tg.tgrelid
  join pg_namespace table_namespace
    on table_namespace.oid =
      table_record.relnamespace
  where not tg.tgisinternal
    and table_namespace.nspname = 'auth'
    and table_record.relname = 'users'
    and tg.tgname =
      'on_auth_user_created_create_lifetopia_profile';

  select count(*)
  into v_conflict_count
  from auth_migration_backup.pending_username_conflicts
  where profile_id =
    'b4c4cc80-69ce-4bb9-9b30-f7627e7049de'::uuid
    and desired_username = 'Sent'
    and temporary_username = 'user_b4c4'
    and status = 'pending';

  if v_orphan_count <> 0 then
    raise exception
      'Profile repair failed: orphan auth users remain.';
  end if;

  if v_profile_count <> v_auth_user_count then
    raise exception
      'Profile repair failed: auth user and profile counts differ.';
  end if;

  if v_trigger_count <> 1 then
    raise exception
      'Signup repair failed: canonical trigger is missing.';
  end if;

  if v_conflict_count <> 1 then
    raise exception
      'Pending username conflict was not recorded.';
  end if;

  if not exists (
    select 1
    from public.profiles
    where id =
      'b4c4cc80-69ce-4bb9-9b30-f7627e7049de'::uuid
      and username::text = 'user_b4c4'
  ) then
    raise exception
      'Orphan profile was not restored with its temporary username.';
  end if;

  if not exists (
    select 1
    from public.profiles
    where id =
      'bb6a4f2b-debe-44d7-98be-17c4f94acf5f'::uuid
      and username::text = 'Sent'
  ) then
    raise exception
      'Existing Sent profile was unexpectedly changed.';
  end if;
end;
$postcondition$;

commit;

select
  (select count(*) from auth.users)
    as auth_user_count,
  (select count(*) from public.profiles)
    as profile_count,
  (
    select count(*)
    from auth.users u
    left join public.profiles p
      on p.id = u.id
    where p.id is null
  ) as orphan_user_count,
  (
    select count(*)
    from pg_trigger tg
    join pg_class table_record
      on table_record.oid = tg.tgrelid
    join pg_namespace table_namespace
      on table_namespace.oid =
        table_record.relnamespace
    where not tg.tgisinternal
      and table_namespace.nspname = 'auth'
      and table_record.relname = 'users'
  ) as active_auth_user_trigger_count,
  (
    select count(*)
    from auth_migration_backup.pending_username_conflicts
    where status = 'pending'
  ) as pending_username_conflict_count;
