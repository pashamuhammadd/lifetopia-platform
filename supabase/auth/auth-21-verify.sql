-- Lifetopia Authentication
-- Auth 21 — Wallet login restricted-access verification
--
-- Run after auth-21-wallet-login-restricted-access.sql.
-- Every row must return passed = true.

with founder as (
  select profile.id
  from public.profiles profile
  where profile.username = 'pashamuhammad'
),
checks as (
  select
    1 as check_order,
    'wallet login finalization function still exists'::text as check_name,
    'true'::text as expected,
    (
      to_regprocedure(
        'public.finalize_solana_wallet_login(uuid,text,uuid)'
      ) is not null
    )::text as actual

  union all

  select
    2,
    'anonymous users still cannot finalize wallet login',
    'false',
    has_function_privilege(
      'anon',
      'public.finalize_solana_wallet_login(uuid,text,uuid)',
      'EXECUTE'
    )::text

  union all

  select
    3,
    'authenticated users still cannot finalize wallet login',
    'false',
    has_function_privilege(
      'authenticated',
      'public.finalize_solana_wallet_login(uuid,text,uuid)',
      'EXECUTE'
    )::text

  union all

  select
    4,
    'service role can still finalize wallet login proof',
    'true',
    has_function_privilege(
      'service_role',
      'public.finalize_solana_wallet_login(uuid,text,uuid)',
      'EXECUTE'
    )::text

  union all

  select
    5,
    'function source no longer hard-blocks suspended/banned accounts',
    'true',
    (
      pg_get_functiondef(
        to_regprocedure(
          'public.finalize_solana_wallet_login(uuid,text,uuid)'
        )
      ) like '%v_account_status = ''deleted''%'
      and pg_get_functiondef(
        to_regprocedure(
          'public.finalize_solana_wallet_login(uuid,text,uuid)'
        )
      ) not like '%v_account_status <> ''active''%'
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
    'Founder linked wallet remains intact',
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
    8,
    'auth user and profile counts remain equal',
    (select count(*)::text from auth.users),
    (select count(*)::text from public.profiles)
)
select
  check_order,
  check_name,
  expected,
  actual,
  actual = expected as passed
from checks
order by check_order;
