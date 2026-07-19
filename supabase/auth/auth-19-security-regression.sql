-- Lifetopia Authentication
-- Auth 19 — Database authorization and immutability regression
--
-- SAFE: catalog inspection and SELECT statements only.
-- Every row must return passed = true.

with checks as (
  select
    1 as check_order,
    'authenticated clients cannot update primary roles directly'::text as check_name,
    'false'::text as expected,
    has_column_privilege(
      'authenticated', 'public.profiles', 'role', 'UPDATE'
    )::text as actual

  union all

  select
    2,
    'authenticated clients cannot grant badges directly',
    'false',
    has_table_privilege(
      'authenticated', 'public.profile_badges', 'INSERT'
    )::text

  union all

  select
    3,
    'authenticated clients cannot access Founder registry',
    'false',
    has_table_privilege(
      'authenticated', 'public.lifetopia_founder_registry', 'SELECT'
    )::text

  union all

  select
    4,
    'authenticated clients cannot provision Founder',
    'false',
    has_function_privilege(
      'authenticated',
      'public.provision_lifetopia_founder(public.citext)',
      'EXECUTE'
    )::text

  union all

  select
    5,
    'authenticated clients cannot insert wallet identities',
    'false',
    has_table_privilege(
      'authenticated', 'public.account_wallets', 'INSERT'
    )::text

  union all

  select
    6,
    'authenticated clients cannot update wallet identities',
    'false',
    has_table_privilege(
      'authenticated', 'public.account_wallets', 'UPDATE'
    )::text

  union all

  select
    7,
    'authenticated clients cannot delete wallet identities',
    'false',
    has_table_privilege(
      'authenticated', 'public.account_wallets', 'DELETE'
    )::text

  union all

  select
    8,
    'wallet-link challenges are private',
    'false',
    has_table_privilege(
      'authenticated', 'public.wallet_link_challenges', 'SELECT'
    )::text

  union all

  select
    9,
    'wallet-login challenges are private to authenticated clients',
    'false',
    has_table_privilege(
      'authenticated', 'public.wallet_login_challenges', 'SELECT'
    )::text

  union all

  select
    10,
    'wallet-login challenges are private to anonymous clients',
    'false',
    has_table_privilege(
      'anon', 'public.wallet_login_challenges', 'SELECT'
    )::text

  union all

  select
    11,
    'authenticated clients cannot finalize wallet links',
    'false',
    has_function_privilege(
      'authenticated',
      'public.finalize_solana_wallet_link(uuid,uuid,text,uuid)',
      'EXECUTE'
    )::text

  union all

  select
    12,
    'authenticated clients cannot unlink wallets through SQL',
    'false',
    has_function_privilege(
      'authenticated',
      'public.unlink_solana_wallet(uuid,uuid,uuid)',
      'EXECUTE'
    )::text

  union all

  select
    13,
    'anonymous clients cannot finalize wallet login',
    'false',
    has_function_privilege(
      'anon',
      'public.finalize_solana_wallet_login(uuid,text,uuid)',
      'EXECUTE'
    )::text

  union all

  select
    14,
    'authenticated clients cannot finalize wallet login',
    'false',
    has_function_privilege(
      'authenticated',
      'public.finalize_solana_wallet_login(uuid,text,uuid)',
      'EXECUTE'
    )::text

  union all

  select
    15,
    'authenticated clients cannot forge wallet-login results',
    'false',
    has_function_privilege(
      'authenticated',
      'public.record_solana_wallet_login_result(uuid,uuid,uuid,uuid,boolean,text)',
      'EXECUTE'
    )::text

  union all

  select
    16,
    'service role can finalize wallet link and login only through services',
    '3',
    (
      select count(*)::text
      from (
        values
          (has_function_privilege(
            'service_role',
            'public.finalize_solana_wallet_link(uuid,uuid,text,uuid)',
            'EXECUTE'
          )),
          (has_function_privilege(
            'service_role',
            'public.finalize_solana_wallet_login(uuid,text,uuid)',
            'EXECUTE'
          )),
          (has_function_privilege(
            'service_role',
            'public.record_solana_wallet_login_result(uuid,uuid,uuid,uuid,boolean,text)',
            'EXECUTE'
          ))
      ) privileges(allowed)
      where allowed
    )

  union all

  select
    17,
    'RLS is enabled on every Auth 15-18 private or protected table',
    '7',
    (
      select count(*)::text
      from pg_class relation
      join pg_namespace namespace
        on namespace.oid = relation.relnamespace
      where namespace.nspname = 'public'
        and relation.relname in (
          'profile_badges',
          'lifetopia_founder_registry',
          'account_wallets',
          'wallet_link_challenges',
          'wallet_security_events',
          'wallet_login_challenges',
          'wallet_login_events'
        )
        and relation.relrowsecurity
    )

  union all

  select
    18,
    'Founder has singleton role and badge indexes',
    '2',
    (
      select count(*)::text
      from pg_indexes
      where schemaname = 'public'
        and indexname in (
          'profiles_single_founder_idx',
          'profile_badges_single_founder_idx'
        )
    )

  union all

  select
    19,
    'Founder role and badge immutability triggers are active',
    '2',
    (
      select count(*)::text
      from pg_trigger trigger_record
      where trigger_record.tgname in (
          'protect_lifetopia_founder_profile_before_write',
          'protect_lifetopia_founder_badge_before_write'
        )
        and not trigger_record.tgisinternal
        and trigger_record.tgenabled <> 'D'
    )

  union all

  select
    20,
    'wallet audit event immutability triggers are active',
    '2',
    (
      select count(*)::text
      from pg_trigger trigger_record
      where trigger_record.tgname in (
          'protect_wallet_security_event_before_change',
          'protect_wallet_login_event_before_change'
        )
        and not trigger_record.tgisinternal
        and trigger_record.tgenabled <> 'D'
    )

  union all

  select
    21,
    'each challenge records at most one terminal wallet-login result',
    '1',
    (
      select count(*)::text
      from pg_indexes
      where schemaname = 'public'
        and tablename = 'wallet_login_events'
        and indexname = 'wallet_login_events_one_session_result_idx'
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
