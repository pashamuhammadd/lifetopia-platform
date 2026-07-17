-- Lifetopia Authentication
-- Auth 1 — Verify legal document and consent foundation
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
    'legal document registry exists'
      as check_name,
    '1' as expected,
    count(*)::text as actual,
    count(*) = 1 as passed
  from information_schema.tables
  where table_schema = 'public'
    and table_name =
      'legal_document_versions'

  union all

  select
    2,
    'private consent history exists',
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
    'exactly two active legal documents exist',
    '2',
    count(*)::text,
    count(*) = 2
  from public.legal_document_versions
  where is_active

  union all

  select
    4,
    'active Terms version is correct',
    '2026.07.18 / /terms',
    coalesce(
      max(
        version || ' / ' ||
        document_path
      ),
      '<missing>'
    ),
    count(*) = 1
      and max(version) =
        '2026.07.18'
      and max(document_path) =
        '/terms'
  from public.legal_document_versions
  where document_type = 'terms'
    and is_active

  union all

  select
    5,
    'active Privacy version is correct',
    '2026.07.18 / /privacy',
    coalesce(
      max(
        version || ' / ' ||
        document_path
      ),
      '<missing>'
    ),
    count(*) = 1
      and max(version) =
        '2026.07.18'
      and max(document_path) =
        '/privacy'
  from public.legal_document_versions
  where document_type = 'privacy'
    and is_active

  union all

  select
    6,
    'legal registry RLS is enabled',
    'true',
    c.relrowsecurity::text,
    c.relrowsecurity
  from pg_class c
  join pg_namespace n
    on n.oid = c.relnamespace
  where n.nspname = 'public'
    and c.relname =
      'legal_document_versions'

  union all

  select
    7,
    'consent history RLS is enabled',
    'true',
    c.relrowsecurity::text,
    c.relrowsecurity
  from pg_class c
  join pg_namespace n
    on n.oid = c.relnamespace
  where n.nspname = 'public'
    and c.relname =
      'account_legal_consents'

  union all

  select
    8,
    'anon can read published legal versions',
    'true',
    has_table_privilege(
      'anon',
      'public.legal_document_versions',
      'SELECT'
    )::text,
    has_table_privilege(
      'anon',
      'public.legal_document_versions',
      'SELECT'
    )

  union all

  select
    9,
    'anon cannot read consent history',
    'false',
    has_table_privilege(
      'anon',
      'public.account_legal_consents',
      'SELECT'
    )::text,
    not has_table_privilege(
      'anon',
      'public.account_legal_consents',
      'SELECT'
    )

  union all

  select
    10,
    'authenticated can read own consent history through RLS',
    'true',
    has_table_privilege(
      'authenticated',
      'public.account_legal_consents',
      'SELECT'
    )::text,
    has_table_privilege(
      'authenticated',
      'public.account_legal_consents',
      'SELECT'
    )

  union all

  select
    11,
    'authenticated cannot insert consent directly',
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
    'authenticated cannot update consent directly',
    'false',
    has_table_privilege(
      'authenticated',
      'public.account_legal_consents',
      'UPDATE'
    )::text,
    not has_table_privilege(
      'authenticated',
      'public.account_legal_consents',
      'UPDATE'
    )

  union all

  select
    13,
    'authenticated cannot delete consent directly',
    'false',
    has_table_privilege(
      'authenticated',
      'public.account_legal_consents',
      'DELETE'
    )::text,
    not has_table_privilege(
      'authenticated',
      'public.account_legal_consents',
      'DELETE'
    )

  union all

  select
    14,
    'existing users have not been silently consented',
    '0',
    count(*)::text,
    count(*) = 0
  from public.account_legal_consents

  union all

  select
    15,
    'one public legal policy exists',
    '1',
    count(*)::text,
    count(*) = 1
      and max(policyname) =
        'Published legal documents are publicly readable'
  from pg_policies
  where schemaname = 'public'
    and tablename =
      'legal_document_versions'

  union all

  select
    16,
    'one owner consent policy exists',
    '1',
    count(*)::text,
    count(*) = 1
      and max(policyname) =
        'Users can view their own legal consents'
  from pg_policies
  where schemaname = 'public'
    and tablename =
      'account_legal_consents'
) checks
order by check_order;
