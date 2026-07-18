-- Lifetopia Authentication
-- Auth 10 — Account access preflight
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
    'required account actions function exists'
      as check_name,
    '1' as expected,
    count(*)::text as actual,
    count(*) = 1 as passed
  from pg_proc function_record
  join pg_namespace function_namespace
    on function_namespace.oid =
      function_record.pronamespace
  where function_namespace.nspname =
      'public'
    and function_record.proname =
      'get_my_required_account_actions'

  union all

  select
    2,
    'legal consent table exists',
    '1',
    count(*)::text,
    count(*) = 1
  from information_schema.tables
  where table_schema = 'public'
    and table_name =
      'account_legal_consents'

  union all

  select
    3,
    'username history table exists',
    '1',
    count(*)::text,
    count(*) = 1
  from information_schema.tables
  where table_schema = 'public'
    and table_name =
      'account_username_changes'

  union all

  select
    4,
    'legal reconsent completion function does not exist yet',
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
      'complete_lifetopia_legal_reconsent'

  union all

  select
    5,
    'required username completion function does not exist yet',
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
      'complete_lifetopia_required_username_selection'

  union all

  select
    6,
    'public and private profile counts match',
    (select count(*) from public.profiles)::text,
    (select count(*) from public.profile_private)::text,
    (select count(*) from public.profiles) =
      (select count(*) from public.profile_private)

  union all

  select
    7,
    'two active legal documents exist',
    '2',
    count(*)::text,
    count(*) = 2
  from public.legal_document_versions
  where is_active

  union all

  select
    8,
    'authenticated clients cannot insert legal consent directly',
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

  union all

  select
    9,
    'authenticated clients cannot update username directly',
    'false',
    has_column_privilege(
      'authenticated',
      'public.profiles',
      'username',
      'UPDATE'
    )::text,
    not has_column_privilege(
      'authenticated',
      'public.profiles',
      'username',
      'UPDATE'
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
