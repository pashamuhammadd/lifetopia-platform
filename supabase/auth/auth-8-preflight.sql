-- Lifetopia Authentication
-- Auth 8 — Guardian consent preflight
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
    'guardian consent foundation exists'
      as check_name,
    '1' as expected,
    count(*)::text as actual,
    count(*) = 1 as passed
  from information_schema.tables
  where table_schema = 'public'
    and table_name =
      'guardian_consents'

  union all

  select
    2,
    'guardian profile state exists',
    '3',
    count(*)::text,
    count(*) = 3
  from information_schema.columns
  where table_schema = 'public'
    and table_name =
      'profile_private'
    and column_name in (
      'guardian_consent_required',
      'guardian_consent_status',
      'guardian_consent_verified_at'
    )

  union all

  select
    3,
    'two active legal documents exist',
    '2',
    count(*)::text,
    count(*) = 2
  from public.legal_document_versions
  where is_active

  union all

  select
    4,
    'no guardian consent requests exist yet',
    '0',
    count(*)::text,
    count(*) = 0
  from public.guardian_consents

  union all

  select
    5,
    'guardian delivery columns do not exist yet',
    '0',
    count(*)::text,
    count(*) = 0
  from information_schema.columns
  where table_schema = 'public'
    and table_name =
      'guardian_consents'
    and column_name in (
      'delivery_status',
      'delivered_at',
      'delivery_error_code'
    )

  union all

  select
    6,
    'guardian request function does not exist yet',
    '0',
    count(*)::text,
    count(*) = 0
  from pg_proc function_record
  join pg_namespace function_namespace
    on function_namespace.oid =
      function_record.pronamespace
  where function_namespace.nspname =
      'public'
    and function_record.proname =
      'create_lifetopia_guardian_consent_request'

  union all

  select
    7,
    'guardian preview function does not exist yet',
    '0',
    count(*)::text,
    count(*) = 0
  from pg_proc function_record
  join pg_namespace function_namespace
    on function_namespace.oid =
      function_record.pronamespace
  where function_namespace.nspname =
      'public'
    and function_record.proname =
      'preview_lifetopia_guardian_consent'

  union all

  select
    8,
    'guardian response function does not exist yet',
    '0',
    count(*)::text,
    count(*) = 0
  from pg_proc function_record
  join pg_namespace function_namespace
    on function_namespace.oid =
      function_record.pronamespace
  where function_namespace.nspname =
      'public'
    and function_record.proname =
      'respond_lifetopia_guardian_consent'

  union all

  select
    9,
    'authenticated clients cannot insert guardian consent',
    'false',
    has_table_privilege(
      'authenticated',
      'public.guardian_consents',
      'INSERT'
    )::text,
    not has_table_privilege(
      'authenticated',
      'public.guardian_consents',
      'INSERT'
    )

  union all

  select
    10,
    'exact date of birth remains private',
    '0',
    count(*)::text,
    count(*) = 0
  from information_schema.columns
  where table_schema = 'public'
    and table_name in (
      'profiles',
      'public_profiles'
    )
    and column_name =
      'date_of_birth'
) checks
order by check_order;
