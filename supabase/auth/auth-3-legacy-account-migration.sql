-- Lifetopia Authentication
-- Auth 3 — Legacy account migration
--
-- Run only after auth-3-preflight.sql returns passed = true
-- for every check.
--
-- This migration preserves every existing account and records the exact
-- actions each legacy account must complete:
--
--   - verify email when email_confirmed_at is absent;
--   - accept the current Terms and Privacy versions;
--   - complete guardian consent when aged 13–17;
--   - choose a permanent username when flagged by Auth 0.5D;
--   - retain the one free username change.
--
-- It does not send emails, create consent automatically, or block
-- Community interactions yet.

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
      'auth_3_pre_legacy_migration_2026_07_18'
  ) then
    raise exception
      'Auth 3 safety snapshot already exists. Nothing was overwritten.';
  end if;

  if (
    select count(*)
    from auth.users
  ) <> (
    select count(*)
    from public.profiles
  ) then
    raise exception
      'Auth 3 stopped: auth user and profile counts differ.';
  end if;

  if (
    select count(*)
    from public.profiles
  ) <> (
    select count(*)
    from public.profile_private
  ) then
    raise exception
      'Auth 3 stopped: public and private profile counts differ.';
  end if;

  if exists (
    select 1
    from public.profile_private private_profile
    join auth.users auth_user
      on auth_user.id =
        private_profile.user_id
    where private_profile.email_verified_at
      is distinct from
        auth_user.email_confirmed_at
  ) then
    raise exception
      'Auth 3 stopped: email verification state is not synchronized.';
  end if;

  if (
    select count(*)
    from public.profile_private
    where requires_username_update
  ) <> 1 then
    raise exception
      'Auth 3 stopped: expected exactly one reviewed username-selection account.';
  end if;

  if exists (
    select 1
    from public.profile_private
    where free_username_change_used
  ) then
    raise exception
      'Auth 3 stopped: a legacy account already consumed the free username change.';
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
    'auth_3_pre_legacy_migration_2026_07_18',
    'Snapshot immediately before Auth 3 legacy account migration records.'
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
      'public.profile_private.%s',
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
    and column_record.table_name =
      'profile_private';

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
  add column legacy_migration_version text,
  add column legacy_migrated_at timestamptz;

comment on column
  public.profile_private.legacy_migration_version
is
  'Latest legacy authentication migration applied to this account.';

comment on column
  public.profile_private.legacy_migrated_at
is
  'Timestamp when the account was registered in the legacy migration ledger.';

create table public.account_legacy_migrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null
    references public.profiles(id)
    on delete cascade,
  migration_version text not null,
  auth_created_at timestamptz not null,
  legacy_role text,
  final_role text not null,
  email_verification_required boolean
    not null,
  legal_reconsent_required boolean
    not null,
  guardian_consent_required boolean
    not null,
  guardian_consent_status text
    not null,
  username_selection_required boolean
    not null,
  free_username_change_preserved boolean
    not null,
  migrated_at timestamptz not null
    default now(),
  created_at timestamptz not null
    default now(),
  unique (
    user_id,
    migration_version
  )
);

comment on table
  public.account_legacy_migrations
is
  'Private audit ledger describing how each pre-production Lifetopia account was preserved and which onboarding actions remain.';

alter table
  public.account_legacy_migrations
enable row level security;

revoke all
on table public.account_legacy_migrations
from public, anon, authenticated;

grant select
on table public.account_legacy_migrations
to authenticated;

grant all
on table public.account_legacy_migrations
to service_role;

create policy
  "Users can view their own legacy migration"
on public.account_legacy_migrations
for select
to authenticated
using (
  auth.uid() = user_id
);

insert into public.account_legacy_migrations (
  user_id,
  migration_version,
  auth_created_at,
  legacy_role,
  final_role,
  email_verification_required,
  legal_reconsent_required,
  guardian_consent_required,
  guardian_consent_status,
  username_selection_required,
  free_username_change_preserved,
  migrated_at
)
select
  profile.id,
  'legacy_auth_v1_2026_07_18',
  auth_user.created_at,
  auth2_backup.row_data ->> 'role',
  profile.role,
  private_profile.email_verified_at
    is null,
  private_profile.legal_reconsent_required,
  private_profile.guardian_consent_required,
  private_profile.guardian_consent_status,
  private_profile.requires_username_update,
  not private_profile.free_username_change_used,
  now()
from public.profiles profile
join public.profile_private private_profile
  on private_profile.user_id =
    profile.id
join auth.users auth_user
  on auth_user.id =
    profile.id
left join (
  select
    backup_profile.profile_id,
    backup_profile.row_data
  from auth_migration_backup.profile_rows
    backup_profile
  join auth_migration_backup.snapshot_runs
    snapshot_run
    on snapshot_run.snapshot_id =
      backup_profile.snapshot_id
  where snapshot_run.label =
    'auth_2_pre_data_model_2026_07_18'
) auth2_backup
  on auth2_backup.profile_id =
    profile.id;

update public.profile_private
set
  legacy_migration_version =
    'legacy_auth_v1_2026_07_18',
  legacy_migrated_at = now();

create or replace function
  public.get_my_required_account_actions()
returns table (
  account_status text,
  next_action text,
  requires_email_verification boolean,
  requires_legal_reconsent boolean,
  requires_guardian_consent boolean,
  guardian_status text,
  requires_username_selection boolean,
  can_read boolean,
  can_interact boolean,
  can_receive_rewards boolean,
  can_link_wallet boolean
)
language sql
security definer
stable
set search_path = pg_catalog
as $function$
  select
    private_profile.account_status,
    case
      when private_profile.account_status =
        'deleted'
        then 'account_deleted'
      when private_profile.account_status =
        'suspended'
        then 'account_suspended'
      when private_profile.account_status =
        'banned'
        then 'account_banned'
      when private_profile.email_verified_at
        is null
        then 'verify_email'
      when private_profile.legal_reconsent_required
        then 'accept_legal'
      when private_profile.requires_username_update
        then 'choose_username'
      when private_profile.guardian_consent_required
        and private_profile.guardian_consent_status
          <> 'approved'
        then 'guardian_consent'
      else 'ready'
    end,
    private_profile.email_verified_at
      is null,
    private_profile.legal_reconsent_required,
    private_profile.guardian_consent_required
      and private_profile.guardian_consent_status
        <> 'approved',
    private_profile.guardian_consent_status,
    private_profile.requires_username_update,
    private_profile.account_status
      <> 'deleted',
    (
      private_profile.account_status =
        'active'
      and private_profile.email_verified_at
        is not null
      and not
        private_profile.legal_reconsent_required
      and not
        private_profile.requires_username_update
      and (
        not
          private_profile.guardian_consent_required
        or private_profile.guardian_consent_status =
          'approved'
      )
    ),
    (
      private_profile.account_status =
        'active'
      and private_profile.email_verified_at
        is not null
      and not
        private_profile.legal_reconsent_required
      and not
        private_profile.requires_username_update
      and (
        not
          private_profile.guardian_consent_required
        or private_profile.guardian_consent_status =
          'approved'
      )
    ),
    (
      private_profile.account_status =
        'active'
      and private_profile.email_verified_at
        is not null
      and not
        private_profile.legal_reconsent_required
      and not
        private_profile.requires_username_update
      and (
        not
          private_profile.guardian_consent_required
        or private_profile.guardian_consent_status =
          'approved'
      )
    )
  from public.profile_private
    private_profile
  where private_profile.user_id =
    auth.uid();
$function$;

comment on function
  public.get_my_required_account_actions()
is
  'Returns only the signed-in user account requirements and current read, interaction, reward, and wallet eligibility.';

revoke all
on function
  public.get_my_required_account_actions()
from public, anon;

grant execute
on function
  public.get_my_required_account_actions()
to authenticated;

do $postconditions$
declare
  v_profile_count bigint;
  v_migration_count bigint;
  v_state_mismatch_count bigint;
begin
  select count(*)
  into v_profile_count
  from public.profiles;

  select count(*)
  into v_migration_count
  from public.account_legacy_migrations
  where migration_version =
    'legacy_auth_v1_2026_07_18';

  select count(*)
  into v_state_mismatch_count
  from public.account_legacy_migrations
    migration_record
  join public.profile_private
    private_profile
    on private_profile.user_id =
      migration_record.user_id
  where migration_record.migration_version =
    'legacy_auth_v1_2026_07_18'
    and (
      migration_record.email_verification_required
        is distinct from
          (
            private_profile.email_verified_at
              is null
          )
      or migration_record.legal_reconsent_required
        is distinct from
          private_profile.legal_reconsent_required
      or migration_record.guardian_consent_required
        is distinct from
          private_profile.guardian_consent_required
      or migration_record.guardian_consent_status
        is distinct from
          private_profile.guardian_consent_status
      or migration_record.username_selection_required
        is distinct from
          private_profile.requires_username_update
      or migration_record.free_username_change_preserved
        is distinct from
          (
            not
              private_profile.free_username_change_used
          )
    );

  if v_migration_count <> v_profile_count then
    raise exception
      'Auth 3 failed: not every legacy account received a migration record.';
  end if;

  if v_state_mismatch_count <> 0 then
    raise exception
      'Auth 3 failed: migration ledger does not match account state.';
  end if;

  if exists (
    select 1
    from public.account_legal_consents
  ) then
    raise exception
      'Auth 3 failed: legacy users were silently marked as legally consented.';
  end if;

  if has_table_privilege(
    'authenticated',
    'public.account_legacy_migrations',
    'INSERT'
  ) then
    raise exception
      'Auth 3 failed: clients can insert migration records.';
  end if;

  if has_function_privilege(
    'anon',
    'public.get_my_required_account_actions()',
    'EXECUTE'
  ) then
    raise exception
      'Auth 3 failed: anonymous users can execute required-actions function.';
  end if;
end;
$postconditions$;

commit;

select
  count(*) as migrated_account_count,
  count(*) filter (
    where email_verification_required
  ) as email_verification_required_count,
  count(*) filter (
    where legal_reconsent_required
  ) as legal_reconsent_required_count,
  count(*) filter (
    where guardian_consent_required
  ) as guardian_consent_required_count,
  count(*) filter (
    where username_selection_required
  ) as username_selection_required_count,
  count(*) filter (
    where free_username_change_preserved
  ) as free_username_change_preserved_count
from public.account_legacy_migrations
where migration_version =
  'legacy_auth_v1_2026_07_18';
