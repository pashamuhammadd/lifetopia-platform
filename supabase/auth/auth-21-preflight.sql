-- Lifetopia Authentication
-- Auth 21 — Wallet login restricted-access preflight
--
-- Run before auth-21-wallet-login-restricted-access.sql.
-- Every row must return passed = true.

with founder as (
  select profile.id
  from public.profiles profile
  where profile.username = 'pashamuhammad'
),
checks as (
  select
    1 as check_order,
    'wallet login finalization function exists'::text as check_name,
    'true'::text as expected,
    (
      to_regprocedure(
        'public.finalize_solana_wallet_login(uuid,text,uuid)'
      ) is not null
    )::text as actual

  union all

  select
    2,
    'wallet login session-result function exists',
    'true',
    (
      to_regprocedure(
        'public.record_solana_wallet_login_result(uuid,uuid,uuid,uuid,boolean,text)'
      ) is not null
    )::text

  union all

  select
    3,
    'account state function exists (used by password login and, after this change, wallet login)',
    'true',
    (
      to_regprocedure(
        'public.get_my_account_state()'
      ) is not null
    )::text

  union all

  select
    4,
    'required account actions function exists',
    'true',
    (
      to_regprocedure(
        'public.get_my_required_account_actions()'
      ) is not null
    )::text

  union all

  select
    5,
    'account_status column still allows active/suspended/banned/deleted only',
    'true',
    (
      not exists (
        select 1
        from public.profile_private private_profile
        where private_profile.account_status not in (
          'active',
          'suspended',
          'banned',
          'deleted'
        )
      )
    )::text

  union all

  select
    6,
    'wallet login events keep exactly one terminal result per challenge',
    '1',
    (
      select count(*)::text
      from pg_indexes
      where schemaname = 'public'
        and tablename = 'wallet_login_events'
        and indexname = 'wallet_login_events_one_session_result_idx'
    )

  union all

  select
    7,
    'Founder account is active and verified',
    'true',
    (
      exists (
        select 1
        from founder
        join public.profile_private private_profile
          on private_profile.user_id = founder.id
        where private_profile.account_status = 'active'
          and private_profile.email_verified_at is not null
      )
    )::text

  union all

  select
    8,
    'service_role database role is available',
    'true',
    (
      exists (
        select 1
        from pg_roles
        where rolname = 'service_role'
      )
    )::text
)
select
  check_order,
  check_name,
  expected,
  actual,
  actual = expected as passed
from checks
order by check_order;
