-- Lifetopia Authentication
-- Auth 18 — Solana wallet login structural verification
--
-- Run after auth-18-wallet-login.sql.
-- Every row must return passed = true.

with checks as (
  select
    1 as check_order,
    'wallet login tables exist'::text as check_name,
    '2'::text as expected,
    (
      select count(*)::text
      from (
        values
          (to_regclass('public.wallet_login_challenges')),
          (to_regclass('public.wallet_login_events'))
      ) tables(regclass_value)
      where regclass_value is not null
    ) as actual

  union all

  select
    2,
    'wallet login columns exist on account_wallets',
    '2',
    (
      select count(*)::text
      from information_schema.columns
      where table_schema = 'public'
        and table_name = 'account_wallets'
        and column_name in (
          'last_login_at',
          'wallet_login_count'
        )
    )

  union all

  select
    3,
    'wallet login count constraint exists',
    '1',
    (
      select count(*)::text
      from pg_constraint constraint_record
      where constraint_record.conrelid =
        'public.account_wallets'::regclass
        and constraint_record.conname =
          'account_wallets_login_count_nonnegative'
    )

  union all

  select
    4,
    'row level security is enabled on wallet login tables',
    '2',
    (
      select count(*)::text
      from pg_class relation
      join pg_namespace namespace
        on namespace.oid = relation.relnamespace
      where namespace.nspname = 'public'
        and relation.relname in (
          'wallet_login_challenges',
          'wallet_login_events'
        )
        and relation.relrowsecurity
    )

  union all

  select
    5,
    'authenticated users cannot read private login challenges',
    'false',
    has_table_privilege(
      'authenticated',
      'public.wallet_login_challenges',
      'SELECT'
    )::text

  union all

  select
    6,
    'anonymous users cannot read private login challenges',
    'false',
    has_table_privilege(
      'anon',
      'public.wallet_login_challenges',
      'SELECT'
    )::text

  union all

  select
    7,
    'authenticated users cannot insert wallet login events',
    'false',
    has_table_privilege(
      'authenticated',
      'public.wallet_login_events',
      'INSERT'
    )::text

  union all

  select
    8,
    'authenticated users can read their own wallet login events',
    'true',
    has_table_privilege(
      'authenticated',
      'public.wallet_login_events',
      'SELECT'
    )::text

  union all

  select
    9,
    'own wallet-login-event policy exists',
    '1',
    (
      select count(*)::text
      from pg_policies
      where schemaname = 'public'
        and tablename = 'wallet_login_events'
        and policyname =
          'wallet_login_events_select_own'
    )

  union all

  select
    10,
    'wallet login service functions exist',
    '3',
    (
      select count(*)::text
      from (
        values
          (
            to_regprocedure(
              'public.finalize_solana_wallet_login(uuid,text,uuid)'
            )
          ),
          (
            to_regprocedure(
              'public.record_solana_wallet_login_result(uuid,uuid,uuid,uuid,boolean,text)'
            )
          ),
          (
            to_regprocedure(
              'public.cleanup_wallet_login_challenges()'
            )
          )
      ) functions(regprocedure_value)
      where regprocedure_value is not null
    )

  union all

  select
    11,
    'anonymous users cannot finalize wallet login',
    'false',
    has_function_privilege(
      'anon',
      'public.finalize_solana_wallet_login(uuid,text,uuid)',
      'EXECUTE'
    )::text

  union all

  select
    12,
    'authenticated users cannot finalize wallet login',
    'false',
    has_function_privilege(
      'authenticated',
      'public.finalize_solana_wallet_login(uuid,text,uuid)',
      'EXECUTE'
    )::text

  union all

  select
    13,
    'authenticated users cannot record session results',
    'false',
    has_function_privilege(
      'authenticated',
      'public.record_solana_wallet_login_result(uuid,uuid,uuid,uuid,boolean,text)',
      'EXECUTE'
    )::text

  union all

  select
    14,
    'service role can finalize wallet login proof',
    'true',
    has_function_privilege(
      'service_role',
      'public.finalize_solana_wallet_login(uuid,text,uuid)',
      'EXECUTE'
    )::text

  union all

  select
    15,
    'service role can record wallet login session results',
    'true',
    has_function_privilege(
      'service_role',
      'public.record_solana_wallet_login_result(uuid,uuid,uuid,uuid,boolean,text)',
      'EXECUTE'
    )::text

  union all

  select
    16,
    'wallet login events have immutable protection',
    '1',
    (
      select count(*)::text
      from pg_trigger trigger_record
      where trigger_record.tgrelid =
        'public.wallet_login_events'::regclass
        and trigger_record.tgname =
          'protect_wallet_login_event_before_change'
        and not trigger_record.tgisinternal
    )

  union all

  select
    17,
    'each challenge can record only one terminal session result',
    '1',
    (
      select count(*)::text
      from pg_indexes
      where schemaname = 'public'
        and tablename = 'wallet_login_events'
        and indexname =
          'wallet_login_events_one_session_result_idx'
    )

  union all

  select
    18,
    'no wallet has a negative login count',
    '0',
    (
      select count(*)::text
      from public.account_wallets
      where wallet_login_count < 0
    )

  union all

  select
    19,
    'Founder linked wallet remains intact',
    '1',
    (
      select count(*)::text
      from public.account_wallets wallet
      join public.profiles profile
        on profile.id = wallet.user_id
      where profile.username = 'pashamuhammad'
        and wallet.chain = 'solana'
    )

  union all

  select
    20,
    'Founder identity remains protected',
    '1',
    (
      select count(*)::text
      from public.lifetopia_founder_registry registry
      join public.profiles profile
        on profile.id = registry.user_id
      join public.profile_badges badge
        on badge.user_id = registry.user_id
       and badge.badge_code = 'founder'
      where profile.username = 'pashamuhammad'
        and profile.role = 'founder'
    )

  union all

  select
    21,
    'auth user and profile counts remain equal',
    (select count(*)::text from auth.users),
    (select count(*)::text from public.profiles)

  union all

  select
    22,
    'exact dates of birth remain private',
    '0',
    (
      select count(*)::text
      from information_schema.columns
      where table_schema = 'public'
        and table_name = 'profiles'
        and column_name in (
          'date_of_birth',
          'birth_date',
          'dob'
        )
    )
)
select
  check_order,
  check_name,
  expected,
  actual,
  actual = expected as passed
from checks
order by check_order;
