-- Lifetopia Authentication
-- Auth 13 — Session management
--
-- Run only after auth-13-preflight.sql returns passed = true.
--
-- The functions intentionally expose only sessions belonging to the
-- authenticated user. IP addresses are masked before leaving Postgres.
--
-- Specific-session revocation deletes the owned Auth session row.
-- The verified refresh-token foreign key cascades, preventing future
-- refreshes for that session. Current-session logout and bulk logout
-- use the official Supabase signOut scopes in the Website API.

begin;

set local lock_timeout = '10s';
set local statement_timeout = '60s';

create or replace function
  public.get_my_lifetopia_sessions()
returns table (
  session_id uuid,
  is_current boolean,
  created_at timestamptz,
  last_active_at timestamptz,
  expires_at timestamptz,
  user_agent text,
  ip_hint text,
  assurance_level text
)
language sql
security definer
stable
set search_path = pg_catalog
as $function$
  with request_context as (
    select
      auth.uid() as user_id,
      nullif(
        auth.jwt() ->> 'session_id',
        ''
      )::uuid as current_session_id
  )
  select
    session_record.id,
    session_record.id =
      request_context.current_session_id,
    session_record.created_at,
    coalesce(
      session_record.refreshed_at
        at time zone 'UTC',
      session_record.updated_at,
      session_record.created_at
    ),
    session_record.not_after,
    nullif(
      session_record.user_agent,
      ''
    ),
    case
      when session_record.ip is null
        then null
      when family(
        session_record.ip
      ) = 4
        then network(
          set_masklen(
            session_record.ip,
            24
          )
        )::text
      else network(
        set_masklen(
          session_record.ip,
          64
        )
      )::text
    end,
    coalesce(
      session_record.aal::text,
      'aal1'
    )
  from auth.sessions
    session_record
  cross join request_context
  where request_context.user_id
      is not null
    and session_record.user_id =
      request_context.user_id
    and (
      session_record.not_after
        is null
      or session_record.not_after >
        now()
    )
  order by
    (
      session_record.id =
      request_context.current_session_id
    ) desc,
    coalesce(
      session_record.refreshed_at
        at time zone 'UTC',
      session_record.updated_at,
      session_record.created_at
    ) desc;
$function$;

create or replace function
  public.revoke_my_lifetopia_session(
    p_session_id uuid
  )
returns boolean
language plpgsql
security definer
set search_path = pg_catalog
as $function$
declare
  v_user_id uuid :=
    auth.uid();
  v_current_session_id uuid :=
    nullif(
      auth.jwt() ->> 'session_id',
      ''
    )::uuid;
  v_deleted_count integer := 0;
begin
  if v_user_id is null then
    raise exception
      'Authentication is required.'
      using errcode = '42501';
  end if;

  if p_session_id is null then
    raise exception
      'Session ID is required.'
      using errcode = '22023';
  end if;

  if p_session_id =
    v_current_session_id
  then
    raise exception
      'The current session must use local sign out.'
      using errcode = '22023';
  end if;

  delete from auth.sessions
  where id = p_session_id
    and user_id = v_user_id;

  get diagnostics
    v_deleted_count =
      row_count;

  return v_deleted_count = 1;
end;
$function$;

comment on function
  public.get_my_lifetopia_sessions()
is
  'Returns privacy-masked active Supabase Auth sessions owned by the authenticated Lifetopia user.';

comment on function
  public.revoke_my_lifetopia_session(
    uuid
  )
is
  'Revokes one non-current Supabase Auth session only when it belongs to the authenticated Lifetopia user.';

revoke all
on function
  public.get_my_lifetopia_sessions()
from public, anon;

revoke all
on function
  public.revoke_my_lifetopia_session(
    uuid
  )
from public, anon;

grant execute
on function
  public.get_my_lifetopia_sessions()
to authenticated, service_role;

grant execute
on function
  public.revoke_my_lifetopia_session(
    uuid
  )
to authenticated, service_role;

commit;

select
  function_record.proname
    as function_name,
  pg_get_function_identity_arguments(
    function_record.oid
  ) as arguments,
  function_record.prosecdef
    as security_definer
from pg_proc function_record
join pg_namespace function_schema
  on function_schema.oid =
    function_record.pronamespace
where function_schema.nspname =
    'public'
  and function_record.proname in (
    'get_my_lifetopia_sessions',
    'revoke_my_lifetopia_session'
  )
order by function_record.proname;
