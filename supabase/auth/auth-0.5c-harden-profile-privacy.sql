-- Lifetopia Authentication
-- Auth 0.5C — Harden profile privacy and field permissions
--
-- Run only after auth-0.5c-preflight.sql returns passed = true
-- for every check.
--
-- This migration:
--   1. creates a phase-specific safety snapshot;
--   2. moves exact dates of birth from profiles to profile_private;
--   3. exposes only calculated age through public_profiles;
--   4. restricts direct profile writes to avatar and country fields;
--   5. removes duplicate profile RLS policies;
--   6. updates the signup trigger to create public and private rows.
--
-- It does not change usernames, Display Names, roles, account statuses,
-- consent fields, or Supabase Auth dashboard settings.

begin;

set local lock_timeout = '10s';
set local statement_timeout = '90s';

lock table auth.users
  in share row exclusive mode;

lock table public.profiles
  in share row exclusive mode;

do $snapshot$
declare
  v_snapshot_id uuid;
  v_label constant text :=
    'auth_0_5c_pre_privacy_2026_07_18';
  v_profile_count bigint;
  v_auth_user_count bigint;
  v_schema_object_count bigint;
  v_profiles_checksum text;
begin
  if exists (
    select 1
    from auth_migration_backup.snapshot_runs
    where label = v_label
  ) then
    raise exception
      'Snapshot label "%" already exists. Nothing was overwritten.',
      v_label;
  end if;

  insert into auth_migration_backup.snapshot_runs (
    label,
    notes
  )
  values (
    v_label,
    'Snapshot immediately before Auth 0.5C profile privacy hardening.'
  )
  returning snapshot_id
  into v_snapshot_id;

  insert into auth_migration_backup.profile_rows (
    snapshot_id,
    profile_id,
    row_data
  )
  select
    v_snapshot_id,
    p.id,
    to_jsonb(p)
  from public.profiles p;

  insert into auth_migration_backup.schema_objects (
    snapshot_id,
    object_type,
    object_key,
    definition
  )
  select
    v_snapshot_id,
    'column',
    format(
      'public.profiles.%s',
      c.column_name
    ),
    jsonb_build_object(
      'ordinal_position', c.ordinal_position,
      'column_name', c.column_name,
      'data_type', c.data_type,
      'udt_name', c.udt_name,
      'is_nullable', c.is_nullable,
      'column_default', c.column_default
    )
  from information_schema.columns c
  where c.table_schema = 'public'
    and c.table_name = 'profiles';

  insert into auth_migration_backup.schema_objects (
    snapshot_id,
    object_type,
    object_key,
    definition
  )
  select
    v_snapshot_id,
    'policy',
    format(
      'public.profiles.%s',
      policy_record.policyname
    ),
    jsonb_build_object(
      'policy_name', policy_record.policyname,
      'roles', policy_record.roles,
      'command', policy_record.cmd,
      'using_expression', policy_record.qual,
      'with_check_expression', policy_record.with_check
    )
  from pg_policies policy_record
  where policy_record.schemaname = 'public'
    and policy_record.tablename = 'profiles';

  insert into auth_migration_backup.schema_objects (
    snapshot_id,
    object_type,
    object_key,
    definition
  )
  select
    v_snapshot_id,
    'function',
    format(
      '%s.%s(%s)',
      function_namespace.nspname,
      function_record.proname,
      pg_get_function_identity_arguments(
        function_record.oid
      )
    ),
    jsonb_build_object(
      'function_definition',
        pg_get_functiondef(
          function_record.oid
        )
    )
  from pg_proc function_record
  join pg_namespace function_namespace
    on function_namespace.oid =
      function_record.pronamespace
  where function_namespace.nspname = 'public'
    and function_record.proname in (
      'handle_new_lifetopia_profile',
      'handle_updated_at'
    );

  select count(*)
  into v_profile_count
  from auth_migration_backup.profile_rows
  where snapshot_id = v_snapshot_id;

  select count(*)
  into v_auth_user_count
  from auth.users;

  select count(*)
  into v_schema_object_count
  from auth_migration_backup.schema_objects
  where snapshot_id = v_snapshot_id;

  select md5(
    coalesce(
      string_agg(
        md5(row_data::text),
        ''
        order by profile_id::text
      ),
      ''
    )
  )
  into v_profiles_checksum
  from auth_migration_backup.profile_rows
  where snapshot_id = v_snapshot_id;

  update auth_migration_backup.snapshot_runs
  set
    profile_count = v_profile_count,
    auth_user_count = v_auth_user_count,
    schema_object_count =
      v_schema_object_count,
    profiles_checksum =
      v_profiles_checksum
  where snapshot_id = v_snapshot_id;
end;
$snapshot$;

create table public.profile_private (
  user_id uuid primary key
    references public.profiles(id)
    on delete cascade,
  date_of_birth date not null,
  created_at timestamptz not null
    default now(),
  updated_at timestamptz not null
    default now()
);

comment on table public.profile_private
is
  'Private account data. Exact dates of birth are visible only to the account owner and trusted server-side administration.';

comment on column
  public.profile_private.date_of_birth
is
  'Private exact date of birth. Public consumers receive calculated age only.';

insert into public.profile_private (
  user_id,
  date_of_birth,
  created_at,
  updated_at
)
select
  id,
  date_of_birth,
  created_at,
  updated_at
from public.profiles;

alter table public.profile_private
  enable row level security;

revoke all
on table public.profile_private
from public, anon, authenticated;

grant select
on table public.profile_private
to authenticated;

grant all
on table public.profile_private
to service_role;

create policy
  "Users can view their own private profile"
on public.profile_private
for select
to authenticated
using (
  auth.uid() = user_id
);

create trigger
  profile_private_updated_at
before update on public.profile_private
for each row
execute function public.handle_updated_at();

create or replace function
  public.handle_new_lifetopia_profile()
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
    'player',
    'player'
  );

  insert into public.profile_private (
    user_id,
    date_of_birth
  )
  values (
    new.id,
    v_date_of_birth
  );

  return new;
end;
$function$;

comment on function
  public.handle_new_lifetopia_profile()
is
  'Creates one public profile and one private profile after auth signup. Client metadata can never assign roles or account type.';

revoke all
on function public.handle_new_lifetopia_profile()
from public, anon, authenticated;

alter table public.profiles
  drop column date_of_birth;

drop policy if exists
  "Players can update their own profile"
on public.profiles;

drop policy if exists
  "Profiles are viewable by everyone"
on public.profiles;

drop policy if exists
  "Public profiles are viewable by everyone"
on public.profiles;

drop policy if exists
  "Users can update their own profile"
on public.profiles;

revoke all
on table public.profiles
from public, anon, authenticated;

grant select
on table public.profiles
to anon, authenticated;

grant update (
  avatar_id,
  country_code,
  country_name
)
on table public.profiles
to authenticated;

grant all
on table public.profiles
to service_role;

create policy
  "Public profiles are viewable by everyone"
on public.profiles
for select
to anon, authenticated
using (true);

create policy
  "Users can update allowed public profile fields"
on public.profiles
for update
to authenticated
using (
  auth.uid() = id
)
with check (
  auth.uid() = id
);

create view public.public_profiles
with (
  security_barrier = true
)
as
select
  profile.id,
  profile.username,
  profile.display_name,
  profile.gender,
  profile.avatar_id,
  profile.country_code,
  profile.country_name,
  profile.account_type,
  profile.role,
  extract(
    year
    from age(
      current_date,
      private_profile.date_of_birth
    )
  )::integer as age,
  profile.created_at,
  profile.updated_at
from public.profiles profile
join public.profile_private private_profile
  on private_profile.user_id =
    profile.id;

comment on view public.public_profiles
is
  'Public-safe Lifetopia profiles. Exact dates of birth are never exposed; only calculated age is returned.';

revoke all
on table public.public_profiles
from public, anon, authenticated;

grant select
on table public.public_profiles
to anon, authenticated, service_role;

do $postcondition$
declare
  v_snapshot_id uuid;
  v_profile_count bigint;
  v_private_count bigint;
  v_mismatch_count bigint;
  v_policy_count bigint;
begin
  select snapshot_id
  into v_snapshot_id
  from auth_migration_backup.snapshot_runs
  where label =
    'auth_0_5c_pre_privacy_2026_07_18';

  select count(*)
  into v_profile_count
  from public.profiles;

  select count(*)
  into v_private_count
  from public.profile_private;

  select count(*)
  into v_mismatch_count
  from auth_migration_backup.profile_rows backup_profile
  left join public.profile_private private_profile
    on private_profile.user_id =
      backup_profile.profile_id
  where backup_profile.snapshot_id =
    v_snapshot_id
    and (
      private_profile.user_id is null
      or private_profile.date_of_birth <>
        (
          backup_profile.row_data
            ->> 'date_of_birth'
        )::date
    );

  select count(*)
  into v_policy_count
  from pg_policies
  where schemaname = 'public'
    and tablename = 'profiles';

  if v_profile_count <> v_private_count then
    raise exception
      'Profile privacy migration failed: public and private row counts differ.';
  end if;

  if v_mismatch_count <> 0 then
    raise exception
      'Profile privacy migration failed: private dates of birth do not match the safety snapshot.';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'profiles'
      and column_name = 'date_of_birth'
  ) then
    raise exception
      'Profile privacy migration failed: date_of_birth remains public.';
  end if;

  if v_policy_count <> 2 then
    raise exception
      'Profile security migration failed: unexpected profiles policy count.';
  end if;

  if has_table_privilege(
    'anon',
    'public.profile_private',
    'SELECT'
  ) then
    raise exception
      'Profile privacy migration failed: anon can read private profiles.';
  end if;

  if has_column_privilege(
    'authenticated',
    'public.profiles',
    'role',
    'UPDATE'
  ) then
    raise exception
      'Profile security migration failed: authenticated users can update roles.';
  end if;
end;
$postcondition$;

commit;

select
  (select count(*) from public.profiles)
    as public_profile_count,
  (select count(*) from public.profile_private)
    as private_profile_count,
  (
    select count(*)
    from pg_policies
    where schemaname = 'public'
      and tablename = 'profiles'
  ) as public_profile_policy_count,
  (
    select count(*)
    from pg_policies
    where schemaname = 'public'
      and tablename = 'profile_private'
  ) as private_profile_policy_count,
  (
    select count(*)
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'profiles'
      and column_name = 'date_of_birth'
  ) as public_date_of_birth_column_count;
