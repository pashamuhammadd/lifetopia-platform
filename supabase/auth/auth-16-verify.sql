-- Lifetopia Authentication
-- Auth 16 — Verify Founder provisioning
--
-- SAFE: SELECT statements only.
-- Every row must return passed = true.

select
  check_order,
  check_name,
  expected,
  actual,
  passed
from (
  select
    1 as check_order,
    'Founder registry contains one row' as check_name,
    '1' as expected,
    count(*)::text as actual,
    count(*) = 1 as passed
  from public.lifetopia_founder_registry

  union all

  select
    2,
    'Founder registry belongs to pashamuhammad',
    'pashamuhammad',
    coalesce(min(profile.username::text), 'missing'),
    count(*) = 1
      and min(profile.username::text) = 'pashamuhammad'
  from public.lifetopia_founder_registry registry
  join public.profiles profile
    on profile.id = registry.user_id

  union all

  select
    3,
    'exactly one Founder primary role exists',
    '1',
    count(*)::text,
    count(*) = 1
  from public.profiles
  where role = 'founder'

  union all

  select
    4,
    'exactly one Founder badge exists',
    '1',
    count(*)::text,
    count(*) = 1
  from public.profile_badges
  where badge_code = 'founder'

  union all

  select
    5,
    'registry role and badge belong to the same account',
    '1',
    count(*)::text,
    count(*) = 1
  from public.lifetopia_founder_registry registry
  join public.profiles profile
    on profile.id = registry.user_id
    and profile.role = 'founder'
  join public.profile_badges badge
    on badge.user_id = registry.user_id
    and badge.badge_code = 'founder'

  union all

  select
    6,
    'Founder account remains active and verified',
    'true',
    coalesce(
      bool_and(
        private_profile.account_status = 'active'
        and private_profile.email_verified_at is not null
        and not private_profile.legal_reconsent_required
        and not private_profile.requires_username_update
      ),
      false
    )::text,
    coalesce(
      bool_and(
        private_profile.account_status = 'active'
        and private_profile.email_verified_at is not null
        and not private_profile.legal_reconsent_required
        and not private_profile.requires_username_update
      ),
      false
    )
  from public.lifetopia_founder_registry registry
  join public.profile_private private_profile
    on private_profile.user_id = registry.user_id

  union all

  select
    7,
    'Founder has verified TOTP MFA',
    'at least 1',
    count(*)::text,
    count(*) >= 1
  from auth.mfa_factors factor
  where factor.user_id = (
    select user_id
    from public.lifetopia_founder_registry
    limit 1
  )
    and factor.factor_type::text = 'totp'
    and factor.status::text = 'verified'

  union all

  select
    8,
    'single-Founder role index exists',
    '1',
    count(*)::text,
    count(*) = 1
  from pg_indexes
  where schemaname = 'public'
    and tablename = 'profiles'
    and indexname = 'profiles_single_founder_idx'

  union all

  select
    9,
    'single-Founder badge index exists',
    '1',
    count(*)::text,
    count(*) = 1
  from pg_indexes
  where schemaname = 'public'
    and tablename = 'profile_badges'
    and indexname = 'profile_badges_single_founder_idx'

  union all

  select
    10,
    'Founder protection triggers exist',
    '2',
    count(*)::text,
    count(*) = 2
  from pg_trigger trigger_record
  join pg_class table_record
    on table_record.oid = trigger_record.tgrelid
  join pg_namespace table_schema
    on table_schema.oid = table_record.relnamespace
  where not trigger_record.tgisinternal
    and table_schema.nspname = 'public'
    and trigger_record.tgname in (
      'protect_lifetopia_founder_profile_before_write',
      'protect_lifetopia_founder_badge_before_write'
    )

  union all

  select
    11,
    'Founder provisioning function exists',
    '1',
    count(*)::text,
    count(*) = 1
  from pg_proc function_record
  join pg_namespace function_schema
    on function_schema.oid = function_record.pronamespace
  where function_schema.nspname = 'public'
    and function_record.proname = 'provision_lifetopia_founder'

  union all

  select
    12,
    'authenticated clients cannot provision Founder',
    'false',
    has_function_privilege(
      'authenticated',
      'public.provision_lifetopia_founder(citext)',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'authenticated',
      'public.provision_lifetopia_founder(citext)',
      'EXECUTE'
    )

  union all

  select
    13,
    'service role can call guarded Founder provisioning',
    'true',
    has_function_privilege(
      'service_role',
      'public.provision_lifetopia_founder(citext)',
      'EXECUTE'
    )::text,
    has_function_privilege(
      'service_role',
      'public.provision_lifetopia_founder(citext)',
      'EXECUTE'
    )

  union all

  select
    14,
    'Founder role audit exists once',
    '1',
    count(*)::text,
    count(*) = 1
  from public.account_role_changes
  where new_role = 'founder'
    and change_source = 'founder_provisioning'

  union all

  select
    15,
    'Founder badge audit exists once',
    '1',
    count(*)::text,
    count(*) = 1
  from public.account_badge_changes
  where badge_code = 'founder'
    and action = 'granted'

  union all

  select
    16,
    'authenticated clients still cannot update roles directly',
    'false',
    has_column_privilege(
      'authenticated',
      'public.profiles',
      'role',
      'UPDATE'
    )::text,
    not has_column_privilege(
      'authenticated',
      'public.profiles',
      'role',
      'UPDATE'
    )

  union all

  select
    17,
    'authenticated clients still cannot insert badges directly',
    'false',
    has_table_privilege(
      'authenticated',
      'public.profile_badges',
      'INSERT'
    )::text,
    not has_table_privilege(
      'authenticated',
      'public.profile_badges',
      'INSERT'
    )

  union all

  select
    18,
    'auth user and profile counts remain equal',
    (select count(*) from auth.users)::text,
    (select count(*) from public.profiles)::text,
    (select count(*) from auth.users) =
      (select count(*) from public.profiles)

  union all

  select
    19,
    'exact dates of birth remain private',
    '0',
    count(*)::text,
    count(*) = 0
  from information_schema.columns
  where table_schema = 'public'
    and table_name in (
      'profiles',
      'public_profiles'
    )
    and column_name = 'date_of_birth'
) checks
order by check_order;
