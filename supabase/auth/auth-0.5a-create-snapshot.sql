-- Lifetopia Authentication
-- Auth 0.5A — Pre-migration safety snapshot
--
-- PURPOSE
--   Creates a private, append-only snapshot of:
--   1. public.profiles rows
--   2. selected auth.users data without password hashes or auth tokens
--   3. profiles schema objects, policies, grants, triggers, and functions
--
-- SAFETY
--   - Does not modify public.profiles or auth.users.
--   - Does not delete or replace existing application data.
--   - Refuses to overwrite a snapshot with the same label.
--   - Runs inside one transaction.
--
-- IMPORTANT
--   This is a migration safety snapshot, not a replacement for a full
--   Supabase database backup or point-in-time recovery.

begin;

create schema if not exists auth_migration_backup;

revoke all
on schema auth_migration_backup
from public, anon, authenticated;

alter default privileges
in schema auth_migration_backup
revoke all on tables
from public, anon, authenticated;

alter default privileges
in schema auth_migration_backup
revoke all on sequences
from public, anon, authenticated;

alter default privileges
in schema auth_migration_backup
revoke all on functions
from public, anon, authenticated;

create table if not exists auth_migration_backup.snapshot_runs (
  snapshot_id uuid primary key default gen_random_uuid(),
  label text not null unique,
  created_at timestamptz not null default now(),
  created_by text not null default current_user,
  profile_count bigint not null default 0,
  auth_user_count bigint not null default 0,
  schema_object_count bigint not null default 0,
  profiles_checksum text,
  auth_users_checksum text,
  notes text
);

create table if not exists auth_migration_backup.profile_rows (
  snapshot_id uuid not null
    references auth_migration_backup.snapshot_runs(snapshot_id)
    on delete restrict,
  profile_id uuid not null,
  row_data jsonb not null,
  primary key (snapshot_id, profile_id)
);

create table if not exists auth_migration_backup.auth_user_rows (
  snapshot_id uuid not null
    references auth_migration_backup.snapshot_runs(snapshot_id)
    on delete restrict,
  user_id uuid not null,
  row_data jsonb not null,
  primary key (snapshot_id, user_id)
);

create table if not exists auth_migration_backup.schema_objects (
  object_id bigint generated always as identity primary key,
  snapshot_id uuid not null
    references auth_migration_backup.snapshot_runs(snapshot_id)
    on delete restrict,
  object_type text not null,
  object_key text not null,
  definition jsonb not null
);

create index if not exists auth_backup_schema_objects_snapshot_idx
  on auth_migration_backup.schema_objects (
    snapshot_id,
    object_type
  );

revoke all
on all tables in schema auth_migration_backup
from public, anon, authenticated;

revoke all
on all sequences in schema auth_migration_backup
from public, anon, authenticated;

do $snapshot$
declare
  v_snapshot_id uuid;
  v_label constant text :=
    'auth_0_5_pre_migration_2026_07_18';
  v_profile_count bigint;
  v_auth_user_count bigint;
  v_schema_object_count bigint;
  v_profiles_checksum text;
  v_auth_users_checksum text;
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
    'Snapshot before Lifetopia Auth 0.5 profile security and signup repair.'
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

  -- Copy auth user information needed for migration recovery.
  -- Password hashes and token fields are deliberately excluded.
  insert into auth_migration_backup.auth_user_rows (
    snapshot_id,
    user_id,
    row_data
  )
  select
    v_snapshot_id,
    u.id,
    (
      to_jsonb(u)
      - array[
          'encrypted_password',
          'confirmation_token',
          'recovery_token',
          'email_change_token_new',
          'email_change_token_current',
          'phone_change_token',
          'reauthentication_token'
        ]::text[]
    )
  from auth.users u;

  -- profiles columns
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
      'column_default', c.column_default,
      'character_maximum_length', c.character_maximum_length
    )
  from information_schema.columns c
  where c.table_schema = 'public'
    and c.table_name = 'profiles';

  -- profiles constraints
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
      'constraint_name', constraint_record.conname,
      'constraint_type', constraint_record.contype,
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
  join pg_namespace namespace_record
    on namespace_record.oid =
      table_record.relnamespace
  where namespace_record.nspname = 'public'
    and table_record.relname = 'profiles';

  -- profiles indexes
  insert into auth_migration_backup.schema_objects (
    snapshot_id,
    object_type,
    object_key,
    definition
  )
  select
    v_snapshot_id,
    'index',
    format(
      'public.profiles.%s',
      index_record.indexname
    ),
    jsonb_build_object(
      'index_name', index_record.indexname,
      'definition', index_record.indexdef
    )
  from pg_indexes index_record
  where index_record.schemaname = 'public'
    and index_record.tablename = 'profiles';

  -- profiles policies
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
      'schema_name', policy_record.schemaname,
      'table_name', policy_record.tablename,
      'policy_name', policy_record.policyname,
      'permissive', policy_record.permissive,
      'roles', policy_record.roles,
      'command', policy_record.cmd,
      'using_expression', policy_record.qual,
      'with_check_expression',
        policy_record.with_check
    )
  from pg_policies policy_record
  where policy_record.schemaname = 'public'
    and policy_record.tablename = 'profiles';

  -- profiles table grants
  insert into auth_migration_backup.schema_objects (
    snapshot_id,
    object_type,
    object_key,
    definition
  )
  select
    v_snapshot_id,
    'table_grant',
    format(
      'public.profiles.%s.%s',
      grant_record.grantee,
      grant_record.privilege_type
    ),
    jsonb_build_object(
      'grantee', grant_record.grantee,
      'privilege_type',
        grant_record.privilege_type,
      'is_grantable',
        grant_record.is_grantable
    )
  from information_schema.role_table_grants grant_record
  where grant_record.table_schema = 'public'
    and grant_record.table_name = 'profiles'
    and grant_record.grantee in (
      'anon',
      'authenticated',
      'service_role',
      'PUBLIC'
    );

  -- profiles column grants
  insert into auth_migration_backup.schema_objects (
    snapshot_id,
    object_type,
    object_key,
    definition
  )
  select
    v_snapshot_id,
    'column_grant',
    format(
      'public.profiles.%s.%s.%s',
      grant_record.grantee,
      grant_record.column_name,
      grant_record.privilege_type
    ),
    jsonb_build_object(
      'grantee', grant_record.grantee,
      'column_name', grant_record.column_name,
      'privilege_type',
        grant_record.privilege_type,
      'is_grantable',
        grant_record.is_grantable
    )
  from information_schema.column_privileges grant_record
  where grant_record.table_schema = 'public'
    and grant_record.table_name = 'profiles'
    and grant_record.grantee in (
      'anon',
      'authenticated',
      'service_role',
      'PUBLIC'
    );

  -- active triggers on auth.users and public.profiles
  insert into auth_migration_backup.schema_objects (
    snapshot_id,
    object_type,
    object_key,
    definition
  )
  select
    v_snapshot_id,
    'trigger',
    format(
      '%s.%s.%s',
      table_namespace.nspname,
      table_record.relname,
      trigger_record.tgname
    ),
    jsonb_build_object(
      'trigger_name', trigger_record.tgname,
      'table_schema', table_namespace.nspname,
      'table_name', table_record.relname,
      'enabled_state',
        trigger_record.tgenabled,
      'trigger_definition',
        pg_get_triggerdef(
          trigger_record.oid,
          true
        ),
      'function_schema',
        function_namespace.nspname,
      'function_name',
        function_record.proname
    )
  from pg_trigger trigger_record
  join pg_class table_record
    on table_record.oid =
      trigger_record.tgrelid
  join pg_namespace table_namespace
    on table_namespace.oid =
      table_record.relnamespace
  join pg_proc function_record
    on function_record.oid =
      trigger_record.tgfoid
  join pg_namespace function_namespace
    on function_namespace.oid =
      function_record.pronamespace
  where not trigger_record.tgisinternal
    and (
      (
        table_namespace.nspname = 'auth'
        and table_record.relname = 'users'
      )
      or (
        table_namespace.nspname = 'public'
        and table_record.relname = 'profiles'
      )
    );

  -- relevant function definitions
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
      'function_schema',
        function_namespace.nspname,
      'function_name',
        function_record.proname,
      'identity_arguments',
        pg_get_function_identity_arguments(
          function_record.oid
        ),
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
      'handle_new_user',
      'handle_new_player_profile',
      'handle_updated_at'
    );

  select count(*)
  into v_profile_count
  from auth_migration_backup.profile_rows
  where snapshot_id = v_snapshot_id;

  select count(*)
  into v_auth_user_count
  from auth_migration_backup.auth_user_rows
  where snapshot_id = v_snapshot_id;

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

  select md5(
    coalesce(
      string_agg(
        md5(row_data::text),
        ''
        order by user_id::text
      ),
      ''
    )
  )
  into v_auth_users_checksum
  from auth_migration_backup.auth_user_rows
  where snapshot_id = v_snapshot_id;

  update auth_migration_backup.snapshot_runs
  set
    profile_count = v_profile_count,
    auth_user_count = v_auth_user_count,
    schema_object_count =
      v_schema_object_count,
    profiles_checksum =
      v_profiles_checksum,
    auth_users_checksum =
      v_auth_users_checksum
  where snapshot_id = v_snapshot_id;
end;
$snapshot$;

commit;

select
  snapshot_id,
  label,
  created_at,
  created_by,
  profile_count,
  auth_user_count,
  schema_object_count,
  profiles_checksum,
  auth_users_checksum,
  notes
from auth_migration_backup.snapshot_runs
where label =
  'auth_0_5_pre_migration_2026_07_18';
