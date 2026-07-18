-- Lifetopia Authentication
-- Auth 7 — Email verification preflight
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
    'Auth 5 registration finalization exists'
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
      'complete_lifetopia_registration'

  union all

  select
    2,
    'email verification sync trigger is active',
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
    and table_namespace.nspname =
      'auth'
    and table_record.relname =
      'users'
    and trigger_record.tgname =
      'on_auth_user_email_verification_changed'
    and trigger_record.tgenabled::text =
      'O'

  union all

  select
    3,
    'verification delivery table does not exist yet',
    '0',
    count(*)::text,
    count(*) = 0
  from information_schema.tables
  where table_schema = 'public'
    and table_name =
      'account_email_verification_deliveries'

  union all

  select
    4,
    'verification reservation function does not exist yet',
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
      'reserve_lifetopia_verification_email'

  union all

  select
    5,
    'verification completion function does not exist yet',
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
      'complete_lifetopia_verification_delivery'

  union all

  select
    6,
    'email verification state matches auth users',
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
    7,
    'public and private profile counts match',
    (select count(*) from public.profiles)::text,
    (select count(*) from public.profile_private)::text,
    (select count(*) from public.profiles) =
      (select count(*) from public.profile_private)

  union all

  select
    8,
    'clients cannot edit private verification state',
    'false',
    has_column_privilege(
      'authenticated',
      'public.profile_private',
      'email_verified_at',
      'UPDATE'
    )::text,
    not has_column_privilege(
      'authenticated',
      'public.profile_private',
      'email_verified_at',
      'UPDATE'
    )
) checks
order by check_order;
