-- Lifetopia Authentication
-- Auth 17 — Solana wallet linking preflight
--
-- Run before auth-17-wallet-linking.sql.
-- Every row must return passed = true.

with checks as (
  select
    1 as check_order,
    'Auth 16 Founder registry is complete'::text as check_name,
    '1'::text as expected,
    (
      select count(*)::text
      from public.lifetopia_founder_registry
    ) as actual

  union all

  select
    2,
    'exactly one Founder role remains assigned',
    '1',
    (
      select count(*)::text
      from public.profiles
      where role = 'founder'
    )

  union all

  select
    3,
    'exactly one Founder badge remains assigned',
    '1',
    (
      select count(*)::text
      from public.profile_badges
      where badge_code = 'founder'
    )

  union all

  select
    4,
    'auth users and profiles remain aligned',
    (select count(*)::text from auth.users),
    (select count(*)::text from public.profiles)

  union all

  select
    5,
    'profile_private exists for every profile',
    (select count(*)::text from public.profiles),
    (select count(*)::text from public.profile_private)

  union all

  select
    6,
    'account_wallets does not exist yet',
    'true',
    (to_regclass('public.account_wallets') is null)::text

  union all

  select
    7,
    'wallet_link_challenges does not exist yet',
    'true',
    (to_regclass('public.wallet_link_challenges') is null)::text

  union all

  select
    8,
    'wallet_security_events does not exist yet',
    'true',
    (to_regclass('public.wallet_security_events') is null)::text

  union all

  select
    9,
    'wallet finalization function does not exist yet',
    'true',
    (
      to_regprocedure(
        'public.finalize_solana_wallet_link(uuid,uuid,text,uuid)'
      ) is null
    )::text

  union all

  select
    10,
    'wallet unlink function does not exist yet',
    'true',
    (
      to_regprocedure(
        'public.unlink_solana_wallet(uuid,uuid,uuid)'
      ) is null
    )::text

  union all

  select
    11,
    'cryptographic UUID generation is available',
    'true',
    (
      to_regprocedure('gen_random_uuid()') is not null
    )::text

  union all

  select
    12,
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
