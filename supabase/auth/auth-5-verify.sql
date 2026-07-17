-- Lifetopia Authentication
-- Auth 5 — Verify secure registration finalization
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
    'registration finalization function exists'
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
    and pg_get_function_identity_arguments(
      function_record.oid
    ) =
      'p_user_id uuid, p_terms_version text, p_privacy_version text, p_source_app text'

  union all

  select
    2,
    'registration finalization is SECURITY DEFINER',
    'true',
    function_record.prosecdef::text,
    function_record.prosecdef
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
    3,
    'anonymous users cannot execute registration finalization',
    'false',
    has_function_privilege(
      'anon',
      'public.complete_lifetopia_registration(uuid,text,text,text)',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'anon',
      'public.complete_lifetopia_registration(uuid,text,text,text)',
      'EXECUTE'
    )

  union all

  select
    4,
    'authenticated users cannot execute registration finalization',
    'false',
    has_function_privilege(
      'authenticated',
      'public.complete_lifetopia_registration(uuid,text,text,text)',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'authenticated',
      'public.complete_lifetopia_registration(uuid,text,text,text)',
      'EXECUTE'
    )

  union all

  select
    5,
    'service role can execute registration finalization',
    'true',
    has_function_privilege(
      'service_role',
      'public.complete_lifetopia_registration(uuid,text,text,text)',
      'EXECUTE'
    )::text,
    has_function_privilege(
      'service_role',
      'public.complete_lifetopia_registration(uuid,text,text,text)',
      'EXECUTE'
    )

  union all

  select
    6,
    'existing users remain unconsented before API activation',
    '0',
    count(*)::text,
    count(*) = 0
  from public.account_legal_consents

  union all

  select
    7,
    'existing profiles remain unchanged in count',
    (select count(*) from auth.users)::text,
    (select count(*) from public.profiles)::text,
    (select count(*) from auth.users) =
      (select count(*) from public.profiles)

  union all

  select
    8,
    'public and private profile counts still match',
    (select count(*) from public.profiles)::text,
    (select count(*) from public.profile_private)::text,
    (select count(*) from public.profiles) =
      (select count(*) from public.profile_private)

  union all

  select
    9,
    'clients still cannot insert legal consent directly',
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
    10,
    'canonical profile trigger remains active',
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
) checks
order by check_order;
