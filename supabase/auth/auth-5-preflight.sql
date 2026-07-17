-- Lifetopia Authentication
-- Auth 5 — Secure Registration API preflight
--
-- SAFE: SELECT statements only.
-- Continue only when every row returns passed = true.

select
  check_order,
  check_name,
  expected,
  actual,
  passed
from (
  select
    1 as check_order,
    'Auth 3 legacy migration is complete'
      as check_name,
    (select count(*) from public.profiles)::text
      as expected,
    count(*)::text as actual,
    count(*) =
      (select count(*) from public.profiles)
      as passed
  from public.account_legacy_migrations
  where migration_version =
    'legacy_auth_v1_2026_07_18'

  union all

  select
    2,
    'exactly two active legal documents exist',
    '2',
    count(*)::text,
    count(*) = 2
  from public.legal_document_versions
  where is_active

  union all

  select
    3,
    'active Terms version is correct',
    '2026.07.18',
    coalesce(max(version), '<missing>'),
    count(*) = 1
      and max(version) =
        '2026.07.18'
  from public.legal_document_versions
  where document_type = 'terms'
    and is_active

  union all

  select
    4,
    'active Privacy version is correct',
    '2026.07.18',
    coalesce(max(version), '<missing>'),
    count(*) = 1
      and max(version) =
        '2026.07.18'
  from public.legal_document_versions
  where document_type = 'privacy'
    and is_active

  union all

  select
    5,
    'registration finalization function does not exist yet',
    '0',
    count(*)::text,
    count(*) = 0
  from pg_proc function_record
  join pg_namespace function_namespace
    on function_namespace.oid =
      function_record.pronamespace
  where function_namespace.nspname = 'public'
    and function_record.proname =
      'complete_lifetopia_registration'

  union all

  select
    6,
    'existing users remain unconsented',
    '0',
    count(*)::text,
    count(*) = 0
  from public.account_legal_consents

  union all

  select
    7,
    'canonical signup trigger remains active',
    '1',
    count(*)::text,
    count(*) = 1
  from pg_trigger trigger_record
  join pg_class table_record
    on table_record.oid =
      trigger_record.tgrelid
  join pg_namespace table_namespace
    on table_namespace.oid =
      table_record.relnamespace
  where not trigger_record.tgisinternal
    and table_namespace.nspname = 'auth'
    and table_record.relname = 'users'
    and trigger_record.tgname =
      'on_auth_user_created_create_lifetopia_profile'
    and trigger_record.tgenabled::text =
      'O'

  union all

  select
    8,
    'clients cannot insert legal consent directly',
    'false',
    has_table_privilege(
      'authenticated',
      'public.account_legal_consents',
      'INSERT'
    )::text,
    not has_table_privilege(
      'authenticated',
      'public.account_legal_consents',
      'INSERT'
    )
) checks
order by check_order;
