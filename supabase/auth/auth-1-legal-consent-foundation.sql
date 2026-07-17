-- Lifetopia Authentication
-- Auth 1 — Legal document and consent foundation
--
-- Run after the Website legal-page patch is installed.
--
-- This migration:
--   - registers versioned Terms and Privacy documents;
--   - creates private account consent history;
--   - keeps consent writes server-controlled;
--   - does not mark existing users as accepted;
--   - does not modify Register yet.

begin;

set local lock_timeout = '10s';
set local statement_timeout = '60s';

create table public.legal_document_versions (
  id uuid primary key default gen_random_uuid(),
  document_type text not null
    check (
      document_type in (
        'terms',
        'privacy'
      )
    ),
  version text not null,
  title text not null,
  document_path text not null,
  effective_at timestamptz not null,
  published_at timestamptz not null
    default now(),
  is_active boolean not null
    default false,
  created_at timestamptz not null
    default now(),
  unique (
    document_type,
    version
  )
);

create unique index
  legal_document_versions_one_active_per_type
on public.legal_document_versions (
  document_type
)
where is_active;

comment on table
  public.legal_document_versions
is
  'Version registry for legal documents shown by Lifetopia World.';

alter table
  public.legal_document_versions
enable row level security;

revoke all
on table public.legal_document_versions
from public, anon, authenticated;

grant select
on table public.legal_document_versions
to anon, authenticated;

grant all
on table public.legal_document_versions
to service_role;

create policy
  "Published legal documents are publicly readable"
on public.legal_document_versions
for select
to anon, authenticated
using (
  published_at <= now()
);

create table public.account_legal_consents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null
    references public.profiles(id)
    on delete cascade,
  document_id uuid not null
    references public.legal_document_versions(id)
    on delete restrict,
  consented_at timestamptz not null
    default now(),
  consent_method text not null
    check (
      consent_method in (
        'registration',
        'reconsent',
        'admin_import'
      )
    ),
  source_app text not null
    check (
      source_app in (
        'website',
        'community',
        'game',
        'admin'
      )
    ),
  withdrawn_at timestamptz,
  created_at timestamptz not null
    default now(),
  unique (
    user_id,
    document_id
  )
);

comment on table
  public.account_legal_consents
is
  'Private auditable consent history. Inserts are performed only through trusted server-side authentication workflows.';

alter table
  public.account_legal_consents
enable row level security;

revoke all
on table public.account_legal_consents
from public, anon, authenticated;

grant select
on table public.account_legal_consents
to authenticated;

grant all
on table public.account_legal_consents
to service_role;

create policy
  "Users can view their own legal consents"
on public.account_legal_consents
for select
to authenticated
using (
  auth.uid() = user_id
);

insert into public.legal_document_versions (
  document_type,
  version,
  title,
  document_path,
  effective_at,
  is_active
)
values
  (
    'terms',
    '2026.07.18',
    'Terms of Service',
    '/terms',
    '2026-07-18T00:00:00+07:00',
    true
  ),
  (
    'privacy',
    '2026.07.18',
    'Privacy Policy',
    '/privacy',
    '2026-07-18T00:00:00+07:00',
    true
  );

do $postconditions$
begin
  if (
    select count(*)
    from public.legal_document_versions
    where is_active
  ) <> 2 then
    raise exception
      'Auth 1 failed: expected two active legal documents.';
  end if;

  if exists (
    select 1
    from public.account_legal_consents
  ) then
    raise exception
      'Auth 1 failed: existing users were unexpectedly marked as accepted.';
  end if;

  if has_table_privilege(
    'anon',
    'public.account_legal_consents',
    'SELECT'
  ) then
    raise exception
      'Auth 1 failed: anon can read private consent history.';
  end if;

  if has_table_privilege(
    'authenticated',
    'public.account_legal_consents',
    'INSERT'
  ) then
    raise exception
      'Auth 1 failed: clients can insert consent records directly.';
  end if;
end;
$postconditions$;

commit;

select
  document_type,
  version,
  title,
  document_path,
  effective_at,
  is_active
from public.legal_document_versions
order by document_type;
