-- Lifetopia Authentication
-- Auth 7 — Verify email verification foundation
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
    'verification delivery table exists'
      as check_name,
    '1' as expected,
    count(*)::text as actual,
    count(*) = 1 as passed
  from information_schema.tables
  where table_schema = 'public'
    and table_name =
      'account_email_verification_deliveries'

  union all

  select
    2,
    'verification delivery RLS is enabled',
    'true',
    table_record.relrowsecurity::text,
    table_record.relrowsecurity
  from pg_class table_record
  join pg_namespace table_namespace
    on table_namespace.oid =
      table_record.relnamespace
  where table_namespace.nspname =
      'public'
    and table_record.relname =
      'account_email_verification_deliveries'

  union all

  select
    3,
    'anonymous users cannot read delivery audit',
    'false',
    has_table_privilege(
      'anon',
      'public.account_email_verification_deliveries',
      'SELECT'
    )::text,
    not has_table_privilege(
      'anon',
      'public.account_email_verification_deliveries',
      'SELECT'
    )

  union all

  select
    4,
    'authenticated users cannot read delivery audit',
    'false',
    has_table_privilege(
      'authenticated',
      'public.account_email_verification_deliveries',
      'SELECT'
    )::text,
    not has_table_privilege(
      'authenticated',
      'public.account_email_verification_deliveries',
      'SELECT'
    )

  union all

  select
    5,
    'reservation function exists',
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
      'reserve_lifetopia_verification_email'

  union all

  select
    6,
    'completion function exists',
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
      'complete_lifetopia_verification_delivery'

  union all

  select
    7,
    'anonymous cannot reserve verification email',
    'false',
    has_function_privilege(
      'anon',
      'public.reserve_lifetopia_verification_email(text,text)',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'anon',
      'public.reserve_lifetopia_verification_email(text,text)',
      'EXECUTE'
    )

  union all

  select
    8,
    'authenticated cannot reserve verification email',
    'false',
    has_function_privilege(
      'authenticated',
      'public.reserve_lifetopia_verification_email(text,text)',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'authenticated',
      'public.reserve_lifetopia_verification_email(text,text)',
      'EXECUTE'
    )

  union all

  select
    9,
    'service role can reserve verification email',
    'true',
    has_function_privilege(
      'service_role',
      'public.reserve_lifetopia_verification_email(text,text)',
      'EXECUTE'
    )::text,
    has_function_privilege(
      'service_role',
      'public.reserve_lifetopia_verification_email(text,text)',
      'EXECUTE'
    )

  union all

  select
    10,
    'anonymous cannot complete delivery audit',
    'false',
    has_function_privilege(
      'anon',
      'public.complete_lifetopia_verification_delivery(uuid,boolean,text)',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'anon',
      'public.complete_lifetopia_verification_delivery(uuid,boolean,text)',
      'EXECUTE'
    )

  union all

  select
    11,
    'authenticated cannot complete delivery audit',
    'false',
    has_function_privilege(
      'authenticated',
      'public.complete_lifetopia_verification_delivery(uuid,boolean,text)',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'authenticated',
      'public.complete_lifetopia_verification_delivery(uuid,boolean,text)',
      'EXECUTE'
    )

  union all

  select
    12,
    'service role can complete delivery audit',
    'true',
    has_function_privilege(
      'service_role',
      'public.complete_lifetopia_verification_delivery(uuid,boolean,text)',
      'EXECUTE'
    )::text,
    has_function_privilege(
      'service_role',
      'public.complete_lifetopia_verification_delivery(uuid,boolean,text)',
      'EXECUTE'
    )

  union all

  select
    13,
    'email verification state still matches auth users',
    '0',
    count(*)::text,
    count(*) = 0
  from public.profile_private
    private_profile
  join auth.users auth_user
    on auth_user.id =
      private_profile.user_id
  where private_profile.email_verified_at
    is distinct from
      auth_user.email_confirmed_at

  union all

  select
    14,
    'existing account counts remain unchanged',
    (select count(*) from auth.users)::text,
    (select count(*) from public.profiles)::text,
    (select count(*) from auth.users) =
      (select count(*) from public.profiles)

  union all

  select
    15,
    'delivery audit starts empty',
    '0',
    count(*)::text,
    count(*) = 0
  from
    public.account_email_verification_deliveries
) checks
order by check_order;
