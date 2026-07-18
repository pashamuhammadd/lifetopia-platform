-- Lifetopia Authentication
-- Auth 18 — Solana wallet login preflight
--
-- Run before auth-18-wallet-login.sql.
-- Every row must return passed = true.

with founder as (
  select profile.id
  from public.profiles profile
  where profile.username = 'pashamuhammad'
),
checks as (
  select
    1 as check_order,
    'Auth 17 wallet identity table exists'::text as check_name,
    'true'::text as expected,
    (
      to_regclass('public.account_wallets') is not null
    )::text as actual

  union all

  select
    2,
    'Auth 17 wallet challenge table exists',
    'true',
    (
      to_regclass('public.wallet_link_challenges') is not null
    )::text

  union all

  select
    3,
    'Auth 17 finalization function exists',
    'true',
    (
      to_regprocedure(
        'public.finalize_solana_wallet_link(uuid,uuid,text,uuid)'
      ) is not null
    )::text

  union all

  select
    4,
    'pashamuhammad has exactly one linked Solana wallet',
    '1',
    (
      select count(*)::text
      from public.account_wallets wallet
      join founder
        on founder.id = wallet.user_id
      where wallet.chain = 'solana'
    )

  union all

  select
    5,
    'linked Solana addresses remain globally unique',
    '0',
    (
      select count(*)::text
      from (
        select chain, address
        from public.account_wallets
        group by chain, address
        having count(*) > 1
      ) duplicate_wallets
    )

  union all

  select
    6,
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
          and not private_profile.legal_reconsent_required
          and not private_profile.requires_username_update
      )
    )::text

  union all

  select
    7,
    'Founder keeps verified TOTP MFA',
    'true',
    (
      exists (
        select 1
        from founder
        join auth.mfa_factors factor
          on factor.user_id = founder.id
        where factor.factor_type::text = 'totp'
          and factor.status::text = 'verified'
      )
    )::text

  union all

  select
    8,
    'authenticated clients cannot insert wallet identities',
    'false',
    has_table_privilege(
      'authenticated',
      'public.account_wallets',
      'INSERT'
    )::text

  union all

  select
    9,
    'wallet login challenge table does not exist yet',
    'true',
    (
      to_regclass('public.wallet_login_challenges') is null
    )::text

  union all

  select
    10,
    'wallet login event table does not exist yet',
    'true',
    (
      to_regclass('public.wallet_login_events') is null
    )::text

  union all

  select
    11,
    'wallet login proof function does not exist yet',
    'true',
    (
      to_regprocedure(
        'public.finalize_solana_wallet_login(uuid,text,uuid)'
      ) is null
    )::text

  union all

  select
    12,
    'wallet session result function does not exist yet',
    'true',
    (
      to_regprocedure(
        'public.record_solana_wallet_login_result(uuid,uuid,uuid,uuid,boolean,text)'
      ) is null
    )::text

  union all

  select
    13,
    'auth users and profiles remain aligned',
    (select count(*)::text from auth.users),
    (select count(*)::text from public.profiles)

  union all

  select
    14,
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
