begin;

create table if not exists public.community_play_testers (
  id bigint generated always as identity primary key,
  email text not null,
  status text not null default 'pending'
    check (status in ('pending', 'exported', 'invited', 'joined', 'withdrawn', 'rejected')),
  consent boolean not null default false check (consent = true),
  consented_at timestamptz not null default now(),
  source text not null default 'public_registration',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (char_length(email) between 3 and 320),
  check (email = lower(trim(email))),
  check (email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$')
);

create unique index if not exists community_play_testers_email_unique
  on public.community_play_testers ((lower(email)));

alter table public.community_play_testers enable row level security;
alter table public.community_play_testers force row level security;

revoke all on table public.community_play_testers from public, anon, authenticated;
revoke all on sequence public.community_play_testers_id_seq from public, anon, authenticated;

create or replace function public.register_community_play_tester(
  p_email text,
  p_consent boolean
)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  v_email text := lower(trim(coalesce(p_email, '')));
begin
  if p_consent is distinct from true then
    raise exception using errcode = '22023', message = 'consent_required';
  end if;

  if char_length(v_email) not between 3 and 320
     or v_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then
    raise exception using errcode = '22023', message = 'invalid_email';
  end if;

  insert into public.community_play_testers (
    email,
    status,
    consent,
    consented_at,
    source
  )
  values (
    v_email,
    'pending',
    true,
    now(),
    'public_registration'
  )
  on conflict ((lower(email))) do update
    set consent = true,
        consented_at = now(),
        status = case
          when community_play_testers.status in ('withdrawn', 'rejected') then 'pending'
          else community_play_testers.status
        end,
        updated_at = now();

  return jsonb_build_object('accepted', true);
end;
$$;

revoke all on function public.register_community_play_tester(text, boolean)
  from public;
grant execute on function public.register_community_play_tester(text, boolean)
  to anon, authenticated;

comment on table public.community_play_testers is
  'Consent-based registrations for the CommunityHub Google Play closed test.';
comment on column public.community_play_testers.email is
  'Google Account email supplied by the tester; never expose through a public API.';
comment on function public.register_community_play_tester(text, boolean) is
  'Validates and records a consent-based tester registration without exposing the tester table.';

commit;
