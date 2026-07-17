-- Lifetopia Authentication
-- Auth 0.5D â€” Normalize usernames and identity constraints
--
-- Run only after auth-0.5d-preflight.sql returns passed = true
-- for every check.
--
-- Final rules introduced by this migration:
--
-- Username
--   - 4â€“16 characters
--   - lowercase
--   - letters a-z, numbers, underscore
--   - one or two consecutive underscores allowed
--   - three or more consecutive underscores rejected
--   - unique through the existing citext constraint
--
-- Display Name
--   - 2â€“32 characters
--   - letters, numbers, and spaces
--   - no leading or trailing spaces
--   - not unique
--
-- Conflict decision
--   - the older auth account receives "sent"
--   - the newer account receives temporary username "user_bb6a"
--   - the newer account is marked requires_username_update = true
--
-- This migration does not create the final username-change UI or token
-- economy. Those workflows are implemented later.

begin;

set local lock_timeout = '10s';
set local statement_timeout = '90s';

lock table public.profiles
  in share row exclusive mode;

lock table public.profile_private
  in share row exclusive mode;

do $preconditions$
begin
  if exists (
    select 1
    from auth_migration_backup.snapshot_runs
    where label =
      'auth_0_5d_pre_identity_2026_07_18'
  ) then
    raise exception
      'Auth 0.5D identity snapshot already exists. Nothing was overwritten.';
  end if;

  if not exists (
    select 1
    from public.profiles
    where id =
      'b4c4cc80-69ce-4bb9-9b30-f7627e7049de'::uuid
      and username::text = 'user_b4c4'
  ) then
    raise exception
      'The older conflict account is not in the reviewed temporary state.';
  end if;

  if not exists (
    select 1
    from public.profiles
    where id =
      'bb6a4f2b-debe-44d7-98be-17c4f94acf5f'::uuid
      and username::text = 'Sent'
  ) then
    raise exception
      'The newer conflict account is not in the reviewed Sent state.';
  end if;

  if exists (
    select 1
    from public.profiles
    where lower(username::text) =
      'user_bb6a'
  ) then
    raise exception
      'Temporary username user_bb6a is no longer available.';
  end if;

  if exists (
    select 1
    from (
      select lower(username::text)
      from public.profiles
      group by lower(username::text)
      having count(*) > 1
    ) conflicts
  ) then
    raise exception
      'Unexpected lowercase username collisions exist.';
  end if;
end;
$preconditions$;

do $snapshot$
declare
  v_snapshot_id uuid;
  v_profile_count bigint;
  v_auth_user_count bigint;
  v_schema_object_count bigint;
  v_profiles_checksum text;
begin
  insert into auth_migration_backup.snapshot_runs (
    label,
    notes
  )
  values (
    'auth_0_5d_pre_identity_2026_07_18',
    'Snapshot immediately before username normalization and identity constraints.'
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
    profile.id,
    to_jsonb(profile)
  from public.profiles profile;

  insert into auth_migration_backup.schema_objects (
    snapshot_id,
    object_type,
    object_key,
    definition
  )
  select
    v_snapshot_id,
    'constraint',
    format(
      'public.profiles.%s',
      constraint_record.conname
    ),
    jsonb_build_object(
      'constraint_name',
        constraint_record.conname,
      'constraint_type',
        constraint_record.contype,
      'definition',
        pg_get_constraintdef(
          constraint_record.oid,
          true
        )
    )
  from pg_constraint constraint_record
  join pg_class table_record
    on table_record.oid =
      constraint_record.conrelid
  join pg_namespace table_namespace
    on table_namespace.oid =
      table_record.relnamespace
  where table_namespace.nspname = 'public'
    and table_record.relname = 'profiles';

  insert into auth_migration_backup.schema_objects (
    snapshot_id,
    object_type,
    object_key,
    definition
  )
  select
    v_snapshot_id,
    'function',
    'public.handle_new_lifetopia_profile()',
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
    and function_record.proname =
      'handle_new_lifetopia_profile';

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

alter table public.profile_private
  add column requires_username_update
    boolean not null default false;

comment on column
  public.profile_private.requires_username_update
is
  'Private migration flag. When true, the account must choose a permanent username through a controlled workflow.';

-- Move the newer conflicting account away first, then award the desired
-- username to the older account.
update public.profiles
set username = 'user_bb6a'
where id =
  'bb6a4f2b-debe-44d7-98be-17c4f94acf5f'::uuid
  and username::text = 'Sent';

update public.profiles
set username = 'sent'
where id =
  'b4c4cc80-69ce-4bb9-9b30-f7627e7049de'::uuid
  and username::text = 'user_b4c4';

-- Normalize every remaining legacy username.
update public.profiles
set username = lower(username::text)
where username::text <>
  lower(username::text);

-- Remove harmless leading and trailing spaces from legacy Display Names.
update public.profiles
set display_name = btrim(display_name)
where display_name <>
  btrim(display_name);

update public.profile_private
set requires_username_update = true
where user_id =
  'bb6a4f2b-debe-44d7-98be-17c4f94acf5f'::uuid;

-- Replace only legacy CHECK constraints that reference username or
-- Display Name. Unique and foreign-key constraints remain untouched.
do $drop_legacy_checks$
declare
  constraint_name text;
begin
  for constraint_name in
    select constraint_record.conname
    from pg_constraint constraint_record
    join pg_class table_record
      on table_record.oid =
        constraint_record.conrelid
    join pg_namespace table_namespace
      on table_namespace.oid =
        table_record.relnamespace
    where table_namespace.nspname = 'public'
      and table_record.relname = 'profiles'
      and constraint_record.contype = 'c'
      and (
        pg_get_constraintdef(
          constraint_record.oid,
          true
        ) ilike '%username%'
        or pg_get_constraintdef(
          constraint_record.oid,
          true
        ) ilike '%display_name%'
      )
  loop
    execute format(
      'alter table public.profiles drop constraint %I',
      constraint_name
    );
  end loop;
end;
$drop_legacy_checks$;

alter table public.profiles
  add constraint
    profiles_username_identity_check
  check (
    username::text =
      lower(username::text)
    and char_length(username::text)
      between 4 and 16
    and username::text ~
      '^[a-z0-9_]+$'
    and username::text !~
      '___'
  );

alter table public.profiles
  add constraint
    profiles_display_name_identity_check
  check (
    display_name =
      btrim(display_name)
    and char_length(display_name)
      between 2 and 32
    and display_name ~
      '^[[:alnum:] ]+$'
  );

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
    lower(
      nullif(
        btrim(
          coalesce(
            new.raw_user_meta_data ->> 'username',
            ''
          )
        ),
        ''
      )
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
    date_of_birth,
    requires_username_update
  )
  values (
    new.id,
    v_date_of_birth,
    false
  );

  return new;
end;
$function$;

comment on function
  public.handle_new_lifetopia_profile()
is
  'Creates public and private Lifetopia profile rows. Usernames are normalized to lowercase and client metadata cannot assign roles.';

revoke all
on function public.handle_new_lifetopia_profile()
from public, anon, authenticated;

-- Convert the conflict record into a pending username-selection record
-- for the newer account.
delete from
  auth_migration_backup.pending_username_conflicts
where profile_id =
  'b4c4cc80-69ce-4bb9-9b30-f7627e7049de'::uuid;

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
  'bb6a4f2b-debe-44d7-98be-17c4f94acf5f'::uuid,
  'sent',
  'user_bb6a',
  'b4c4cc80-69ce-4bb9-9b30-f7627e7049de'::uuid,
  'newer_account_must_choose_new_username',
  'pending'
);

do $postconditions$
declare
  v_invalid_username_count bigint;
  v_invalid_display_name_count bigint;
  v_lowercase_conflict_count bigint;
begin
  select count(*)
  into v_invalid_username_count
  from public.profiles
  where
    username::text <>
      lower(username::text)
    or char_length(username::text)
      not between 4 and 16
    or username::text !~
      '^[a-z0-9_]+$'
    or username::text ~
      '___';

  select count(*)
  into v_invalid_display_name_count
  from public.profiles
  where
    display_name <>
      btrim(display_name)
    or char_length(display_name)
      not between 2 and 32
    or display_name !~
      '^[[:alnum:] ]+$';

  select count(*)
  into v_lowercase_conflict_count
  from (
    select lower(username::text)
    from public.profiles
    group by lower(username::text)
    having count(*) > 1
  ) conflicts;

  if v_invalid_username_count <> 0 then
    raise exception
      'Identity migration failed: invalid usernames remain.';
  end if;

  if v_invalid_display_name_count <> 0 then
    raise exception
      'Identity migration failed: invalid Display Names remain.';
  end if;

  if v_lowercase_conflict_count <> 0 then
    raise exception
      'Identity migration failed: lowercase username conflicts remain.';
  end if;

  if not exists (
    select 1
    from public.profiles
    where id =
      'b4c4cc80-69ce-4bb9-9b30-f7627e7049de'::uuid
      and username::text = 'sent'
  ) then
    raise exception
      'Identity migration failed: the older account did not receive sent.';
  end if;

  if not exists (
    select 1
    from public.profiles
    where id =
      'bb6a4f2b-debe-44d7-98be-17c4f94acf5f'::uuid
      and username::text =
        'user_bb6a'
  ) then
    raise exception
      'Identity migration failed: newer account temporary username is missing.';
  end if;

  if not exists (
    select 1
    from public.profile_private
    where user_id =
      'bb6a4f2b-debe-44d7-98be-17c4f94acf5f'::uuid
      and requires_username_update
  ) then
    raise exception
      'Identity migration failed: pending username update flag is missing.';
  end if;
end;
$postconditions$;

commit;

select
  count(*) as profile_count,
  count(*) filter (
    where username::text =
      lower(username::text)
  ) as lowercase_username_count,
  count(*) filter (
    where char_length(username::text)
      between 4 and 16
  ) as valid_username_length_count,
  count(*) filter (
    where char_length(display_name)
      between 2 and 32
  ) as valid_display_name_length_count,
  count(*) filter (
    where exists (
      select 1
      from public.profile_private private_profile
      where private_profile.user_id =
        profiles.id
        and private_profile.requires_username_update
    )
  ) as accounts_requiring_username_update
from public.profiles;

