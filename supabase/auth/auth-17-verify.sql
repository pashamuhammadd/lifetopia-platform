-- Lifetopia Authentication
-- Auth 17 — Solana wallet linking verification
--
-- Run after auth-17-wallet-linking.sql.
-- Every row must return passed = true.

with checks as (
  select
    1 as check_order,
    'wallet tables exist'::text as check_name,
    '3'::text as expected,
    (
      select count(*)::text
      from (
        values
          (to_regclass('public.account_wallets')),
          (to_regclass('public.wallet_link_challenges')),
          (to_regclass('public.wallet_security_events'))
      ) as tables(regclass_value)
      where regclass_value is not null
    ) as actual

  union all

  select
    2,
    'row level security is enabled on all wallet tables',
    '3',
    (
      select count(*)::text
      from pg_class relation
      join pg_namespace namespace
        on namespace.oid = relation.relnamespace
      where namespace.nspname = 'public'
        and relation.relname in (
          'account_wallets',
          'wallet_link_challenges',
          'wallet_security_events'
        )
        and relation.relrowsecurity
    )

  union all

  select
    3,
    'wallet uniqueness constraints exist',
    '2',
    (
      select count(*)::text
      from pg_constraint constraint_record
      where constraint_record.conrelid =
        'public.account_wallets'::regclass
        and constraint_record.conname in (
          'account_wallets_one_chain_per_user',
          'account_wallets_one_account_per_address'
        )
    )

  union all

  select
    4,
    'authenticated users can read their wallet identity',
    'true',
    has_table_privilege(
      'authenticated',
      'public.account_wallets',
      'SELECT'
    )::text

  union all

  select
    5,
    'authenticated users cannot insert wallet identities',
    'false',
    has_table_privilege(
      'authenticated',
      'public.account_wallets',
      'INSERT'
    )::text

  union all

  select
    6,
    'authenticated users cannot update wallet identities',
    'false',
    has_table_privilege(
      'authenticated',
      'public.account_wallets',
      'UPDATE'
    )::text

  union all

  select
    7,
    'authenticated users cannot delete wallet identities',
    'false',
    has_table_privilege(
      'authenticated',
      'public.account_wallets',
      'DELETE'
    )::text

  union all

  select
    8,
    'authenticated users cannot access private challenges',
    'false',
    has_table_privilege(
      'authenticated',
      'public.wallet_link_challenges',
      'SELECT'
    )::text

  union all

  select
    9,
    'own-wallet and own-event select policies exist',
    '2',
    (
      select count(*)::text
      from pg_policies
      where schemaname = 'public'
        and policyname in (
          'account_wallets_select_own',
          'wallet_security_events_select_own'
        )
    )

  union all

  select
    10,
    'wallet security functions exist',
    '3',
    (
      select count(*)::text
      from (
        values
          (
            to_regprocedure(
              'public.finalize_solana_wallet_link(uuid,uuid,text,uuid)'
            )
          ),
          (
            to_regprocedure(
              'public.unlink_solana_wallet(uuid,uuid,uuid)'
            )
          ),
          (
            to_regprocedure(
              'public.cleanup_wallet_link_challenges()'
            )
          )
      ) as functions(regprocedure_value)
      where regprocedure_value is not null
    )

  union all

  select
    11,
    'authenticated users cannot finalize wallet links',
    'false',
    has_function_privilege(
      'authenticated',
      'public.finalize_solana_wallet_link(uuid,uuid,text,uuid)',
      'EXECUTE'
    )::text

  union all

  select
    12,
    'authenticated users cannot call wallet unlink',
    'false',
    has_function_privilege(
      'authenticated',
      'public.unlink_solana_wallet(uuid,uuid,uuid)',
      'EXECUTE'
    )::text

  union all

  select
    13,
    'service role can finalize verified wallet links',
    'true',
    has_function_privilege(
      'service_role',
      'public.finalize_solana_wallet_link(uuid,uuid,text,uuid)',
      'EXECUTE'
    )::text

  union all

  select
    14,
    'service role can unlink owned wallets',
    'true',
    has_function_privilege(
      'service_role',
      'public.unlink_solana_wallet(uuid,uuid,uuid)',
      'EXECUTE'
    )::text

  union all

  select
    15,
    'wallet security events are protected by an immutable trigger',
    '1',
    (
      select count(*)::text
      from pg_trigger trigger_record
      where trigger_record.tgrelid =
        'public.wallet_security_events'::regclass
        and trigger_record.tgname =
          'protect_wallet_security_event_before_change'
        and not trigger_record.tgisinternal
    )

  union all

  select
    16,
    'no Solana address is linked to multiple accounts',
    '0',
    (
      select count(*)::text
      from (
        select chain, address
        from public.account_wallets
        group by chain, address
        having count(*) > 1
      ) duplicates
    )

  union all

  select
    17,
    'no account has multiple Solana wallets',
    '0',
    (
      select count(*)::text
      from (
        select user_id, chain
        from public.account_wallets
        group by user_id, chain
        having count(*) > 1
      ) duplicates
    )

  union all

  select
    18,
    'no wallet identity is orphaned from profiles',
    '0',
    (
      select count(*)::text
      from public.account_wallets wallet
      left join public.profiles profile
        on profile.id = wallet.user_id
      where profile.id is null
    )

  union all

  select
    19,
    'Auth 16 Founder identity remains intact',
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
    20,
    'auth user and profile counts remain equal',
    (select count(*)::text from auth.users),
    (select count(*)::text from public.profiles)

  union all

  select
    21,
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
