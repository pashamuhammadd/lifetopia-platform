-- Lifetopia Authentication
-- Auth 2 — Authentication data model
--
-- Run only after auth-2-preflight.sql returns passed = true
-- for every check.
--
-- This migration adds:
--   - final primary account roles;
--   - account status and suspension fields;
--   - email verification state synchronized from auth.users;
--   - legal re-consent state;
--   - guardian-consent foundation;
--   - username-change history and one-free-change state;
--   - private account-status audit history;
--   - a safe authenticated account-state function.
--
-- It does not enforce Community interaction blocking yet.

begin;

set local lock_timeout = '10s';
set local statement_timeout = '120s';

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
      'auth_2_pre_data_model_2026_07_18'
  ) then
    raise exception
      'Auth 2 safety snapshot already exists. Nothing was overwritten.';
  end if;

  if (
    select count(*)
    from auth.users
  ) <> (
    select count(*)
    from public.profiles
  ) then
    raise exception
      'Auth 2 stopped: auth user and profile counts differ.';
  end if;

  if (
    select count(*)
    from public.profiles
  ) <> (
    select count(*)
    from public.profile_private
  ) then
    raise exception
      'Auth 2 stopped: public and private profile counts differ.';
  end if;

  if exists (
    select 1
    from public.profiles
    where role not in (
      'player',
      'founder',
      'admin',
      'moderator',
      'developer',
      'artist',
      'alpha_tester',
      'beta_tester',
      'lifetopian'
    )
  ) then
    raise exception
      'Auth 2 stopped: an unknown legacy role exists.';
  end if;
end;
$preconditions$;

create table if not exists
  auth_migration_backup.profile_private_rows (
    snapshot_id uuid not null
      references auth_migration_backup.snapshot_runs(snapshot_id)
      on delete cascade,
    user_id uuid not null,
    row_data jsonb not null,
    primary key (
      snapshot_id,
      user_id
    )
  );

revoke all
on table auth_migration_backup.profile_private_rows
from public, anon, authenticated;

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
    'auth_2_pre_data_model_2026_07_18',
    'Snapshot immediately before Auth 2 authentication data model.'
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

  insert into
    auth_migration_backup.profile_private_rows (
      snapshot_id,
      user_id,
      row_data
    )
  select
    v_snapshot_id,
    private_profile.user_id,
    to_jsonb(private_profile)
  from public.profile_private private_profile;

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
      'public.%s.%s',
      column_record.table_name,
      column_record.column_name
    ),
    jsonb_build_object(
      'ordinal_position',
        column_record.ordinal_position,
      'data_type',
        column_record.data_type,
      'udt_name',
        column_record.udt_name,
      'is_nullable',
        column_record.is_nullable,
      'column_default',
        column_record.column_default
    )
  from information_schema.columns column_record
  where column_record.table_schema = 'public'
    and column_record.table_name in (
      'profiles',
      'profile_private'
    );

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
    and table_record.relname in (
      'profiles',
      'profile_private'
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

alter table public.profile_private
  add column account_status text
    not null default 'active',
  add column status_updated_at timestamptz
    not null default now(),
  add column suspended_until timestamptz,
  add column restriction_reason text,
  add column deletion_scheduled_for timestamptz,
  add column deleted_at timestamptz,
  add column email_verified_at timestamptz,
  add column legal_reconsent_required boolean
    not null default true,
  add column guardian_consent_required boolean
    not null default false,
  add column guardian_consent_status text
    not null default 'not_required',
  add column guardian_consent_verified_at timestamptz,
  add column free_username_change_used boolean
    not null default false;

comment on column
  public.profile_private.account_status
is
  'Current account state: active, suspended, banned, or deleted.';

comment on column
  public.profile_private.restriction_reason
is
  'User-visible reason for a suspension or ban.';

comment on column
  public.profile_private.email_verified_at
is
  'Mirrors auth.users.email_confirmed_at for application access decisions.';

comment on column
  public.profile_private.legal_reconsent_required
is
  'When true, interactive features may require acceptance of current legal documents.';

comment on column
  public.profile_private.free_username_change_used
is
  'Tracks whether the one free permanent username change has been consumed.';

alter table public.profile_private
  add constraint
    profile_private_account_status_check
  check (
    account_status in (
      'active',
      'suspended',
      'banned',
      'deleted'
    )
  ),
  add constraint
    profile_private_guardian_status_check
  check (
    guardian_consent_status in (
      'not_required',
      'pending',
      'approved',
      'rejected',
      'revoked',
      'expired'
    )
  ),
  add constraint
    profile_private_guardian_consistency_check
  check (
    (
      not guardian_consent_required
      and guardian_consent_status =
        'not_required'
    )
    or (
      guardian_consent_required
      and guardian_consent_status <>
        'not_required'
    )
  ),
  add constraint
    profile_private_restriction_fields_check
  check (
    (
      account_status = 'active'
      and suspended_until is null
      and restriction_reason is null
      and deleted_at is null
    )
    or (
      account_status = 'suspended'
      and suspended_until is not null
      and restriction_reason is not null
      and deleted_at is null
    )
    or (
      account_status = 'banned'
      and suspended_until is null
      and restriction_reason is not null
      and deleted_at is null
    )
    or (
      account_status = 'deleted'
      and deleted_at is not null
    )
  );

update public.profile_private private_profile
set email_verified_at =
  auth_user.email_confirmed_at
from auth.users auth_user
where auth_user.id =
  private_profile.user_id;

update public.profile_private
set
  guardian_consent_required =
    date_of_birth >
      (
        current_date
        - interval '18 years'
      )::date,
  guardian_consent_status =
    case
      when date_of_birth >
        (
          current_date
          - interval '18 years'
        )::date
      then 'pending'
      else 'not_required'
    end;

update public.profile_private private_profile
set legal_reconsent_required =
  exists (
    select 1
    from public.legal_document_versions
      legal_document
    where legal_document.is_active
      and not exists (
        select 1
        from public.account_legal_consents
          legal_consent
        where legal_consent.user_id =
          private_profile.user_id
          and legal_consent.document_id =
            legal_document.id
          and legal_consent.withdrawn_at
            is null
      )
  );

do $drop_legacy_role_checks$
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
      and pg_get_constraintdef(
        constraint_record.oid,
        true
      ) ilike '%role%'
  loop
    execute format(
      'alter table public.profiles drop constraint %I',
      constraint_name
    );
  end loop;
end;
$drop_legacy_role_checks$;

update public.profiles
set role = 'lifetopian'
where role = 'player';

alter table public.profiles
  add constraint profiles_role_check
  check (
    role in (
      'founder',
      'admin',
      'moderator',
      'developer',
      'artist',
      'alpha_tester',
      'beta_tester',
      'lifetopian'
    )
  );

create table public.account_username_changes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null
    references public.profiles(id)
    on delete cascade,
  old_username citext not null,
  new_username citext not null,
  change_type text not null
    check (
      change_type in (
        'migration',
        'required_selection',
        'free_change',
        'token_change',
        'admin_change'
      )
    ),
  consumed_free_change boolean
    not null default false,
  changed_by uuid
    references public.profiles(id)
    on delete set null,
  changed_at timestamptz not null
    default now(),
  created_at timestamptz not null
    default now(),
  check (
    lower(old_username::text) <>
      lower(new_username::text)
    or old_username::text <>
      new_username::text
  )
);

create index
  account_username_changes_user_changed_at_idx
on public.account_username_changes (
  user_id,
  changed_at desc
);

comment on table
  public.account_username_changes
is
  'Private username audit history. Migration and required selections do not consume the one free username change.';

alter table
  public.account_username_changes
enable row level security;

revoke all
on table public.account_username_changes
from public, anon, authenticated;

grant select
on table public.account_username_changes
to authenticated;

grant all
on table public.account_username_changes
to service_role;

create policy
  "Users can view their own username history"
on public.account_username_changes
for select
to authenticated
using (
  auth.uid() = user_id
);

insert into public.account_username_changes (
  user_id,
  old_username,
  new_username,
  change_type,
  consumed_free_change,
  changed_at
)
select
  backup_profile.profile_id,
  backup_profile.row_data ->> 'username',
  current_profile.username,
  'migration',
  false,
  current_profile.updated_at
from auth_migration_backup.profile_rows
  backup_profile
join auth_migration_backup.snapshot_runs
  snapshot_run
  on snapshot_run.snapshot_id =
    backup_profile.snapshot_id
join public.profiles current_profile
  on current_profile.id =
    backup_profile.profile_id
where snapshot_run.label =
  'auth_0_5d_pre_identity_2026_07_18'
  and (
    backup_profile.row_data
      ->> 'username'
  ) <>
    current_profile.username::text;

create table public.guardian_consents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null
    references public.profiles(id)
    on delete cascade,
  guardian_email citext not null,
  status text not null
    default 'pending'
    check (
      status in (
        'pending',
        'approved',
        'rejected',
        'revoked',
        'expired'
      )
    ),
  token_hash text not null unique,
  terms_document_id uuid not null
    references public.legal_document_versions(id)
    on delete restrict,
  privacy_document_id uuid not null
    references public.legal_document_versions(id)
    on delete restrict,
  requested_at timestamptz not null
    default now(),
  expires_at timestamptz not null,
  responded_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null
    default now(),
  updated_at timestamptz not null
    default now(),
  check (
    expires_at > requested_at
  )
);

create index
  guardian_consents_user_status_idx
on public.guardian_consents (
  user_id,
  status,
  requested_at desc
);

comment on table public.guardian_consents
is
  'Private guardian-consent requests for users aged 13–17. Verification tokens are stored only as hashes.';

alter table public.guardian_consents
  enable row level security;

revoke all
on table public.guardian_consents
from public, anon, authenticated;

grant select
on table public.guardian_consents
to authenticated;

grant all
on table public.guardian_consents
to service_role;

create policy
  "Users can view their own guardian consent"
on public.guardian_consents
for select
to authenticated
using (
  auth.uid() = user_id
);

create trigger guardian_consents_updated_at
before update on public.guardian_consents
for each row
execute function public.handle_updated_at();

create table public.account_status_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null
    references public.profiles(id)
    on delete cascade,
  previous_status text
    check (
      previous_status is null
      or previous_status in (
        'active',
        'suspended',
        'banned',
        'deleted'
      )
    ),
  new_status text not null
    check (
      new_status in (
        'active',
        'suspended',
        'banned',
        'deleted'
      )
    ),
  visible_reason text,
  internal_note text,
  starts_at timestamptz not null
    default now(),
  ends_at timestamptz,
  changed_by uuid
    references public.profiles(id)
    on delete set null,
  created_at timestamptz not null
    default now()
);

create index
  account_status_events_user_created_at_idx
on public.account_status_events (
  user_id,
  created_at desc
);

comment on table public.account_status_events
is
  'Private administrative audit history for account restrictions and deletion.';

alter table public.account_status_events
  enable row level security;

revoke all
on table public.account_status_events
from public, anon, authenticated;

grant all
on table public.account_status_events
to service_role;

create or replace function
  public.sync_lifetopia_email_verification()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog
as $function$
begin
  update public.profile_private
  set
    email_verified_at =
      new.email_confirmed_at,
    updated_at = now()
  where user_id = new.id;

  return new;
end;
$function$;

revoke all
on function
  public.sync_lifetopia_email_verification()
from public, anon, authenticated;

create trigger
  on_auth_user_email_verification_changed
after update of email_confirmed_at
on auth.users
for each row
when (
  old.email_confirmed_at
    is distinct from
  new.email_confirmed_at
)
execute function
  public.sync_lifetopia_email_verification();

create or replace function
  public.get_my_account_state()
returns table (
  account_status text,
  suspended_until timestamptz,
  restriction_reason text,
  email_verified boolean,
  legal_reconsent_required boolean,
  guardian_consent_required boolean,
  guardian_consent_status text,
  guardian_consent_verified_at timestamptz,
  requires_username_update boolean,
  free_username_change_used boolean,
  primary_role text,
  deletion_scheduled_for timestamptz
)
language sql
security definer
stable
set search_path = pg_catalog
as $function$
  select
    private_profile.account_status,
    private_profile.suspended_until,
    private_profile.restriction_reason,
    private_profile.email_verified_at
      is not null,
    private_profile.legal_reconsent_required,
    private_profile.guardian_consent_required,
    private_profile.guardian_consent_status,
    private_profile.guardian_consent_verified_at,
    private_profile.requires_username_update,
    private_profile.free_username_change_used,
    profile.role,
    private_profile.deletion_scheduled_for
  from public.profile_private
    private_profile
  join public.profiles profile
    on profile.id =
      private_profile.user_id
  where private_profile.user_id =
    auth.uid();
$function$;

revoke all
on function public.get_my_account_state()
from public, anon;

grant execute
on function public.get_my_account_state()
to authenticated;

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
  v_guardian_required boolean;
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

  v_guardian_required :=
    v_date_of_birth >
      (
        current_date
        - interval '18 years'
      )::date;

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
    'lifetopian'
  );

  insert into public.profile_private (
    user_id,
    date_of_birth,
    requires_username_update,
    account_status,
    email_verified_at,
    legal_reconsent_required,
    guardian_consent_required,
    guardian_consent_status,
    free_username_change_used
  )
  values (
    new.id,
    v_date_of_birth,
    false,
    'active',
    new.email_confirmed_at,
    true,
    v_guardian_required,
    case
      when v_guardian_required
        then 'pending'
      else 'not_required'
    end,
    false
  );

  return new;
end;
$function$;

comment on function
  public.handle_new_lifetopia_profile()
is
  'Creates public and private Lifetopia account rows with final default role and account-state foundations.';

revoke all
on function public.handle_new_lifetopia_profile()
from public, anon, authenticated;

do $postconditions$
declare
  v_invalid_role_count bigint;
  v_email_state_mismatch bigint;
  v_legal_state_mismatch bigint;
begin
  select count(*)
  into v_invalid_role_count
  from public.profiles
  where role not in (
    'founder',
    'admin',
    'moderator',
    'developer',
    'artist',
    'alpha_tester',
    'beta_tester',
    'lifetopian'
  );

  select count(*)
  into v_email_state_mismatch
  from public.profile_private
    private_profile
  join auth.users auth_user
    on auth_user.id =
      private_profile.user_id
  where private_profile.email_verified_at
    is distinct from
      auth_user.email_confirmed_at;

  select count(*)
  into v_legal_state_mismatch
  from public.profile_private
    private_profile
  where private_profile.legal_reconsent_required
    is distinct from
      exists (
        select 1
        from public.legal_document_versions
          legal_document
        where legal_document.is_active
          and not exists (
            select 1
            from public.account_legal_consents
              legal_consent
            where legal_consent.user_id =
              private_profile.user_id
              and legal_consent.document_id =
                legal_document.id
              and legal_consent.withdrawn_at
                is null
          )
      );

  if v_invalid_role_count <> 0 then
    raise exception
      'Auth 2 failed: invalid account roles remain.';
  end if;

  if v_email_state_mismatch <> 0 then
    raise exception
      'Auth 2 failed: email verification state does not match auth.users.';
  end if;

  if v_legal_state_mismatch <> 0 then
    raise exception
      'Auth 2 failed: legal re-consent state is inconsistent.';
  end if;

  if has_table_privilege(
    'authenticated',
    'public.guardian_consents',
    'INSERT'
  ) then
    raise exception
      'Auth 2 failed: clients can create guardian consent records directly.';
  end if;

  if has_table_privilege(
    'authenticated',
    'public.account_username_changes',
    'INSERT'
  ) then
    raise exception
      'Auth 2 failed: clients can create username history directly.';
  end if;

  if has_function_privilege(
    'anon',
    'public.get_my_account_state()',
    'EXECUTE'
  ) then
    raise exception
      'Auth 2 failed: anonymous users can execute the account-state function.';
  end if;
end;
$postconditions$;

commit;

select
  (select count(*) from public.profiles)
    as profile_count,
  (
    select count(*)
    from public.profiles
    where role = 'lifetopian'
  ) as lifetopian_count,
  (
    select count(*)
    from public.profile_private
    where email_verified_at is not null
  ) as verified_email_count,
  (
    select count(*)
    from public.profile_private
    where legal_reconsent_required
  ) as legal_reconsent_required_count,
  (
    select count(*)
    from public.profile_private
    where guardian_consent_required
  ) as guardian_consent_required_count,
  (
    select count(*)
    from public.account_username_changes
  ) as username_history_count;
