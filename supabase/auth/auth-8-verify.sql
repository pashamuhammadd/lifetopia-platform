-- Lifetopia Authentication
-- Auth 8 — Verify guardian consent workflow
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
    'three guardian delivery columns exist'
      as check_name,
    '3' as expected,
    count(*)::text as actual,
    count(*) = 3 as passed
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
    2,
    'one pending guardian request per user is enforced',
    '1',
    count(*)::text,
    count(*) = 1
  from pg_indexes
  where schemaname = 'public'
    and tablename =
      'guardian_consents'
    and indexname =
      'guardian_consents_one_pending_per_user'

  union all

  select
    3,
    'guardian request function exists',
    '1',
    count(*)::text,
    count(*) = 1
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
    4,
    'guardian delivery completion function exists',
    '1',
    count(*)::text,
    count(*) = 1
  from pg_proc function_record
  join pg_namespace function_namespace
    on function_namespace.oid =
      function_record.pronamespace
  where function_namespace.nspname =
      'public'
    and function_record.proname =
      'complete_lifetopia_guardian_consent_delivery'

  union all

  select
    5,
    'guardian preview function exists',
    '1',
    count(*)::text,
    count(*) = 1
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
    6,
    'guardian response function exists',
    '1',
    count(*)::text,
    count(*) = 1
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
    7,
    'anonymous cannot create guardian request',
    'false',
    has_function_privilege(
      'anon',
      'public.create_lifetopia_guardian_consent_request(uuid,text,text,timestamptz)',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'anon',
      'public.create_lifetopia_guardian_consent_request(uuid,text,text,timestamptz)',
      'EXECUTE'
    )

  union all

  select
    8,
    'authenticated cannot create guardian request directly',
    'false',
    has_function_privilege(
      'authenticated',
      'public.create_lifetopia_guardian_consent_request(uuid,text,text,timestamptz)',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'authenticated',
      'public.create_lifetopia_guardian_consent_request(uuid,text,text,timestamptz)',
      'EXECUTE'
    )

  union all

  select
    9,
    'service role can create guardian request',
    'true',
    has_function_privilege(
      'service_role',
      'public.create_lifetopia_guardian_consent_request(uuid,text,text,timestamptz)',
      'EXECUTE'
    )::text,
    has_function_privilege(
      'service_role',
      'public.create_lifetopia_guardian_consent_request(uuid,text,text,timestamptz)',
      'EXECUTE'
    )

  union all

  select
    10,
    'anonymous cannot preview guardian request',
    'false',
    has_function_privilege(
      'anon',
      'public.preview_lifetopia_guardian_consent(text)',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'anon',
      'public.preview_lifetopia_guardian_consent(text)',
      'EXECUTE'
    )

  union all

  select
    11,
    'authenticated cannot preview guardian request directly',
    'false',
    has_function_privilege(
      'authenticated',
      'public.preview_lifetopia_guardian_consent(text)',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'authenticated',
      'public.preview_lifetopia_guardian_consent(text)',
      'EXECUTE'
    )

  union all

  select
    12,
    'service role can preview guardian request',
    'true',
    has_function_privilege(
      'service_role',
      'public.preview_lifetopia_guardian_consent(text)',
      'EXECUTE'
    )::text,
    has_function_privilege(
      'service_role',
      'public.preview_lifetopia_guardian_consent(text)',
      'EXECUTE'
    )

  union all

  select
    13,
    'anonymous cannot respond to guardian request',
    'false',
    has_function_privilege(
      'anon',
      'public.respond_lifetopia_guardian_consent(text,text)',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'anon',
      'public.respond_lifetopia_guardian_consent(text,text)',
      'EXECUTE'
    )

  union all

  select
    14,
    'authenticated cannot respond to guardian request directly',
    'false',
    has_function_privilege(
      'authenticated',
      'public.respond_lifetopia_guardian_consent(text,text)',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'authenticated',
      'public.respond_lifetopia_guardian_consent(text,text)',
      'EXECUTE'
    )

  union all

  select
    15,
    'service role can respond to guardian request',
    'true',
    has_function_privilege(
      'service_role',
      'public.respond_lifetopia_guardian_consent(text,text)',
      'EXECUTE'
    )::text,
    has_function_privilege(
      'service_role',
      'public.respond_lifetopia_guardian_consent(text,text)',
      'EXECUTE'
    )

  union all

  select
    16,
    'anonymous cannot read guardian records',
    'false',
    has_table_privilege(
      'anon',
      'public.guardian_consents',
      'SELECT'
    )::text,
    not has_table_privilege(
      'anon',
      'public.guardian_consents',
      'SELECT'
    )

  union all

  select
    17,
    'authenticated clients still cannot insert guardian records',
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
    18,
    'authenticated clients still cannot update guardian records',
    'false',
    has_table_privilege(
      'authenticated',
      'public.guardian_consents',
      'UPDATE'
    )::text,
    not has_table_privilege(
      'authenticated',
      'public.guardian_consents',
      'UPDATE'
    )

  union all

  select
    19,
    'guardian request table remains empty before testing',
    '0',
    count(*)::text,
    count(*) = 0
  from public.guardian_consents

  union all

  select
    20,
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
    and column_name =
      'date_of_birth'
) checks
order by check_order;
