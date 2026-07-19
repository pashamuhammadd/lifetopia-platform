begin;

alter table public.community_posts add column if not exists moderation_status text not null default 'visible' check(moderation_status in('visible','hidden'));
alter table public.community_posts add column if not exists moderation_reason text;
alter table public.community_comments add column if not exists moderation_status text not null default 'visible' check(moderation_status in('visible','hidden'));
alter table public.community_comments add column if not exists moderation_reason text;

create table public.community_account_restrictions(
 user_id uuid primary key references public.profiles(id) on delete cascade,
 status text not null check(status in('muted','suspended','banned')),
 reason text not null check(length(trim(reason)) between 4 and 500),
 expires_at timestamptz,
 created_by uuid not null references public.profiles(id),
 created_at timestamptz not null default now(),updated_at timestamptz not null default now(),
 check((status in('muted','suspended') and expires_at is not null) or(status='banned' and expires_at is null))
);
create table public.community_moderation_events(
 id uuid primary key default gen_random_uuid(),actor_id uuid references public.profiles(id),target_user_id uuid references public.profiles(id),
 report_id uuid references public.community_reports(id) on delete set null,target_type text check(target_type in('post','comment','account','report')),
 target_id uuid,action text not null check(action in('review','dismiss','hide','restore','mute','suspend','ban','restriction_lifted')),
 reason text not null,metadata jsonb not null default '{}'::jsonb,created_at timestamptz not null default now()
);
create index community_moderation_events_created_idx on public.community_moderation_events(created_at desc);
create index community_moderation_events_target_idx on public.community_moderation_events(target_user_id,created_at desc);

alter table public.community_account_restrictions enable row level security;
alter table public.community_moderation_events enable row level security;
alter table public.community_account_restrictions force row level security;
alter table public.community_moderation_events force row level security;
revoke all on public.community_account_restrictions,public.community_moderation_events from public,anon,authenticated;
grant select on public.community_account_restrictions,public.community_moderation_events to authenticated;
create policy restrictions_read_own_or_staff on public.community_account_restrictions for select to authenticated using(user_id=auth.uid() or exists(select 1 from public.profiles p where p.id=auth.uid() and p.role in('founder','admin','moderator')));
create policy moderation_events_staff_read on public.community_moderation_events for select to authenticated using(exists(select 1 from public.profiles p where p.id=auth.uid() and p.role in('founder','admin','moderator')));

create policy community_posts_moderation_visibility on public.community_posts as restrictive for select to anon,authenticated using(moderation_status='visible' or author_id=auth.uid() or exists(select 1 from public.profiles p where p.id=auth.uid() and p.role in('founder','admin','moderator')));
create policy community_comments_moderation_visibility on public.community_comments as restrictive for select to anon,authenticated using(moderation_status='visible' or author_id=auth.uid() or exists(select 1 from public.profiles p where p.id=auth.uid() and p.role in('founder','admin','moderator')));

create or replace function public.protect_community_moderation_event() returns trigger language plpgsql security definer set search_path=pg_catalog as $$begin raise exception 'Moderation events are immutable.';end;$$;
create trigger protect_community_moderation_event_before_change before update or delete on public.community_moderation_events for each row execute function public.protect_community_moderation_event();

create or replace function public.enforce_community_write_restriction() returns trigger language plpgsql security definer set search_path=pg_catalog,public as $$
declare v_status text;v_expiry timestamptz;
begin
 select status,expires_at into v_status,v_expiry from public.community_account_restrictions where user_id=coalesce(new.author_id,auth.uid());
 if found and(v_status='banned' or v_expiry>now()) then raise exception 'community_account_restricted' using errcode='42501';end if;
 if found and v_expiry<=now() then delete from public.community_account_restrictions where user_id=coalesce(new.author_id,auth.uid());end if;
 return new;
end;$$;
create trigger enforce_post_write_restriction before insert or update on public.community_posts for each row execute function public.enforce_community_write_restriction();
create trigger enforce_comment_write_restriction before insert or update on public.community_comments for each row execute function public.enforce_community_write_restriction();

create or replace function public.moderate_community_report(p_report_id uuid,p_action text,p_reason text,p_duration_hours integer default null)
returns text language plpgsql security definer set search_path=pg_catalog,public as $$
declare v_actor uuid:=auth.uid();v_actor_role text;v_target_role text;v_target_user uuid;v_target_type text;v_post uuid;v_comment uuid;v_status text;v_expiry timestamptz;v_reason text:=nullif(trim(coalesce(p_reason,'')),'');
begin
 if v_reason is null or length(v_reason)>500 then raise exception 'moderation_reason_required' using errcode='22023';end if;
 if p_action not in('review','dismiss','hide','restore','mute','suspend','ban','restriction_lifted') then raise exception 'invalid_moderation_action' using errcode='22023';end if;
 select role into v_actor_role from public.profiles where id=v_actor;
 if v_actor_role not in('founder','admin','moderator') then raise exception 'moderation_access_required' using errcode='42501';end if;
 select r.target_type,r.post_id,r.comment_id,case when r.target_type='post' then p.author_id else c.author_id end
 into v_target_type,v_post,v_comment,v_target_user from public.community_reports r left join public.community_posts p on p.id=r.post_id left join public.community_comments c on c.id=r.comment_id where r.id=p_report_id for update of r;
 if not found then raise exception 'report_not_found' using errcode='P0002';end if;
 select role into v_target_role from public.profiles where id=v_target_user;
 if v_target_role='founder' then raise exception 'founder_is_protected' using errcode='42501';end if;
 if v_actor_role='moderator' and v_target_role in('admin','moderator') then raise exception 'staff_target_requires_admin' using errcode='42501';end if;
 if v_actor_role='admin' and v_target_role='admin' then raise exception 'admin_target_requires_founder' using errcode='42501';end if;
 if p_action='review' then update public.community_reports set status='reviewing',reviewed_by=v_actor,resolution_note=v_reason,updated_at=now() where id=p_report_id;
 elsif p_action='dismiss' then update public.community_reports set status='dismissed',reviewed_by=v_actor,reviewed_at=now(),resolution_note=v_reason,updated_at=now() where id=p_report_id;
 elsif p_action in('hide','restore') then
   v_status:=case when p_action='hide' then'hidden' else'visible'end;
   if v_target_type='post' then update public.community_posts set moderation_status=v_status,moderation_reason=case when v_status='hidden' then v_reason else null end where id=v_post;else update public.community_comments set moderation_status=v_status,moderation_reason=case when v_status='hidden' then v_reason else null end where id=v_comment;end if;
   update public.community_reports set status='resolved',reviewed_by=v_actor,reviewed_at=now(),resolution_note=v_reason,updated_at=now() where id=p_report_id;
 elsif p_action in('mute','suspend','ban') then
   if p_action<>'ban' and(coalesce(p_duration_hours,0)<1 or p_duration_hours>8760) then raise exception 'restriction_duration_required' using errcode='22023';end if;
   v_expiry:=case when p_action='ban' then null else now()+make_interval(hours=>p_duration_hours)end;
   insert into public.community_account_restrictions(user_id,status,reason,expires_at,created_by) values(v_target_user,p_action,v_reason,v_expiry,v_actor)
   on conflict(user_id) do update set status=excluded.status,reason=excluded.reason,expires_at=excluded.expires_at,created_by=excluded.created_by,updated_at=now();
   update public.community_reports set status='resolved',reviewed_by=v_actor,reviewed_at=now(),resolution_note=v_reason,updated_at=now() where id=p_report_id;
 else delete from public.community_account_restrictions where user_id=v_target_user;update public.community_reports set status='resolved',reviewed_by=v_actor,reviewed_at=now(),resolution_note=v_reason,updated_at=now() where id=p_report_id;
 end if;
 insert into public.community_moderation_events(actor_id,target_user_id,report_id,target_type,target_id,action,reason,metadata) values(v_actor,v_target_user,p_report_id,case when p_action in('mute','suspend','ban','restriction_lifted') then'account' else v_target_type end,coalesce(v_comment,v_post),p_action,v_reason,jsonb_build_object('duration_hours',p_duration_hours));
 return p_action;
end;$$;

revoke all on function public.moderate_community_report(uuid,text,text,integer),public.protect_community_moderation_event(),public.enforce_community_write_restriction() from public,anon;
grant execute on function public.moderate_community_report(uuid,text,text,integer) to authenticated;
commit;
