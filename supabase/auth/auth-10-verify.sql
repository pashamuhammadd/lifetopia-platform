-- Lifetopia Authentication
-- Auth 10 — Verify account access completion functions
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
    'legal reconsent completion function exists'
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
      'complete_lifetopia_legal_reconsent'

  union all

  select
    2,
    'required username completion function exists',
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
      'complete_lifetopia_required_username_selection'

  union all

  select
    3,
    'anonymous cannot complete legal reconsent',
    'false',
    has_function_privilege(
      'anon',
      'public.complete_lifetopia_legal_reconsent(uuid,text,text,text)',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'anon',
      'public.complete_lifetopia_legal_reconsent(uuid,text,text,text)',
      'EXECUTE'
    )

  union all

  select
    4,
    'authenticated cannot complete legal reconsent directly',
    'false',
    has_function_privilege(
      'authenticated',
      'public.complete_lifetopia_legal_reconsent(uuid,text,text,text)',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'authenticated',
      'public.complete_lifetopia_legal_reconsent(uuid,text,text,text)',
      'EXECUTE'
    )

  union all

  select
    5,
    'service role can complete legal reconsent',
    'true',
    has_function_privilege(
      'service_role',
      'public.complete_lifetopia_legal_reconsent(uuid,text,text,text)',
      'EXECUTE'
    )::text,
    has_function_privilege(
      'service_role',
      'public.complete_lifetopia_legal_reconsent(uuid,text,text,text)',
      'EXECUTE'
    )

  union all

  select
    6,
    'anonymous cannot complete required username selection',
    'false',
    has_function_privilege(
      'anon',
      'public.complete_lifetopia_required_username_selection(uuid,citext)',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'anon',
      'public.complete_lifetopia_required_username_selection(uuid,citext)',
      'EXECUTE'
    )

  union all

  select
    7,
    'authenticated cannot complete required username selection directly',
    'false',
    has_function_privilege(
      'authenticated',
      'public.complete_lifetopia_required_username_selection(uuid,citext)',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'authenticated',
      'public.complete_lifetopia_required_username_selection(uuid,citext)',
      'EXECUTE'
    )

  union all

  select
    8,
    'service role can complete required username selection',
    'true',
    has_function_privilege(
      'service_role',
      'public.complete_lifetopia_required_username_selection(uuid,citext)',
      'EXECUTE'
    )::text,
    has_function_privilege(
      'service_role',
      'public.complete_lifetopia_required_username_selection(uuid,citext)',
      'EXECUTE'
    )

  union all

  select
    9,
    'public and private profile counts remain equal',
    (select count(*) from public.profiles)::text,
    (select count(*) from public.profile_private)::text,
    (select count(*) from public.profiles) =
      (select count(*) from public.profile_private)

  union all

  select
    10,
    'authenticated still cannot update username directly',
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
    11,
    'authenticated still cannot insert legal consent directly',
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
    12,
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
