begin;

create table public.community_direct_conversations(
 id uuid primary key default gen_random_uuid(),
 member_low uuid not null references public.profiles(id) on delete cascade,
 member_high uuid not null references public.profiles(id) on delete cascade,
 created_at timestamptz not null default now(),
 last_message_at timestamptz not null default now(),
 constraint community_direct_distinct_members check(member_low<>member_high),
 constraint community_direct_canonical_members check(member_low<member_high),
 unique(member_low,member_high)
);

create table public.community_direct_messages(
 id bigint generated always as identity primary key,
 conversation_id uuid not null references public.community_direct_conversations(id) on delete cascade,
 sender_id uuid not null references public.profiles(id) on delete cascade,
 body text not null check(length(trim(body)) between 1 and 2000),
 created_at timestamptz not null default now()
);

create table public.community_direct_reads(
 conversation_id uuid not null references public.community_direct_conversations(id) on delete cascade,
 user_id uuid not null references public.profiles(id) on delete cascade,
 last_read_message_id bigint references public.community_direct_messages(id) on delete set null,
 read_at timestamptz not null default now(),
 primary key(conversation_id,user_id)
);

create index community_direct_conversations_low_idx on public.community_direct_conversations(member_low,last_message_at desc);
create index community_direct_conversations_high_idx on public.community_direct_conversations(member_high,last_message_at desc);
create index community_direct_messages_conversation_idx on public.community_direct_messages(conversation_id,id desc);

alter table public.community_direct_conversations enable row level security;
alter table public.community_direct_messages enable row level security;
alter table public.community_direct_reads enable row level security;
alter table public.community_direct_conversations force row level security;
alter table public.community_direct_messages force row level security;
alter table public.community_direct_reads force row level security;

revoke all on public.community_direct_conversations,public.community_direct_messages,public.community_direct_reads from public,anon,authenticated;
grant select on public.community_direct_conversations,public.community_direct_messages,public.community_direct_reads to authenticated;

create policy direct_conversations_participant_read on public.community_direct_conversations for select to authenticated using(auth.uid() in(member_low,member_high));
create policy direct_messages_participant_read on public.community_direct_messages for select to authenticated using(exists(select 1 from public.community_direct_conversations c where c.id=conversation_id and auth.uid() in(c.member_low,c.member_high)));
create policy direct_reads_participant_read on public.community_direct_reads for select to authenticated using(user_id=auth.uid() and exists(select 1 from public.community_direct_conversations c where c.id=conversation_id and auth.uid() in(c.member_low,c.member_high)));

create or replace function public.assert_community_message_write_allowed(p_user uuid)
returns void language plpgsql security definer set search_path=pg_catalog,public as $$
declare v_status text;v_expiry timestamptz;
begin
 select status,expires_at into v_status,v_expiry from public.community_account_restrictions where user_id=p_user;
 if found and(v_status='banned' or v_expiry is null or v_expiry>now())then
  raise exception 'community_account_restricted' using errcode='42501';
 end if;
end;$$;

create or replace function public.start_community_direct_conversation(p_username text)
returns uuid language plpgsql security definer set search_path=pg_catalog,public as $$
declare v_user uuid:=auth.uid();v_target uuid;v_low uuid;v_high uuid;v_id uuid;v_blocked boolean;
begin
 if v_user is null then raise exception 'authentication_required' using errcode='42501';end if;
 perform public.assert_community_message_write_allowed(v_user);
 select id into v_target from public.profiles where lower(username::text)=lower(trim(p_username));
 if v_target is null then raise exception 'profile_not_found' using errcode='P0002';end if;
 if v_target=v_user then raise exception 'cannot_message_self' using errcode='22023';end if;
 select exists(select 1 from public.community_account_restrictions r where r.user_id=v_target and r.status in('suspended','banned')and(r.expires_at is null or r.expires_at>now()))into v_blocked;
 if v_blocked then raise exception 'recipient_unavailable' using errcode='42501';end if;
 if v_user<v_target then v_low:=v_user;v_high:=v_target;else v_low:=v_target;v_high:=v_user;end if;
 insert into public.community_direct_conversations(member_low,member_high)values(v_low,v_high)
 on conflict(member_low,member_high)do update set member_low=excluded.member_low returning id into v_id;
 insert into public.community_direct_reads(conversation_id,user_id)values(v_id,v_user),(v_id,v_target)on conflict do nothing;
 return v_id;
end;$$;

create or replace function public.send_community_direct_message(p_conversation_id uuid,p_body text)
returns bigint language plpgsql security definer set search_path=pg_catalog,public as $$
declare v_user uuid:=auth.uid();v_body text:=trim(coalesce(p_body,''));v_id bigint;
begin
 if v_user is null then raise exception 'authentication_required' using errcode='42501';end if;
 perform public.assert_community_message_write_allowed(v_user);
 if length(v_body)<1 or length(v_body)>2000 then raise exception 'invalid_message_length' using errcode='22023';end if;
 if not exists(select 1 from public.community_direct_conversations c where c.id=p_conversation_id and v_user in(c.member_low,c.member_high))then raise exception 'conversation_access_denied' using errcode='42501';end if;
 insert into public.community_direct_messages(conversation_id,sender_id,body)values(p_conversation_id,v_user,v_body)returning id into v_id;
 update public.community_direct_conversations set last_message_at=now()where id=p_conversation_id;
 insert into public.community_direct_reads(conversation_id,user_id,last_read_message_id,read_at)values(p_conversation_id,v_user,v_id,now())on conflict(conversation_id,user_id)do update set last_read_message_id=excluded.last_read_message_id,read_at=excluded.read_at;
 return v_id;
end;$$;

create or replace function public.get_my_community_direct_conversations()
returns table(conversation_id uuid,other_user_id uuid,other_username text,other_display_name text,other_avatar_id text,last_body text,last_message_at timestamptz,unread_count bigint)
language sql security definer set search_path=pg_catalog,public stable as $$
 select c.id,other.id,other.username::text,other.display_name::text,other.avatar_id::text,last_message.body,c.last_message_at,
  (select count(*) from public.community_direct_messages unread where unread.conversation_id=c.id and unread.sender_id<>auth.uid()and unread.id>coalesce(read_state.last_read_message_id,0))
 from public.community_direct_conversations c
 join public.profiles other on other.id=case when c.member_low=auth.uid()then c.member_high else c.member_low end
 left join public.community_direct_reads read_state on read_state.conversation_id=c.id and read_state.user_id=auth.uid()
 left join lateral(select m.body from public.community_direct_messages m where m.conversation_id=c.id order by m.id desc limit 1)last_message on true
 where auth.uid() in(c.member_low,c.member_high)
 order by c.last_message_at desc;
$$;

create or replace function public.get_community_direct_messages(p_conversation_id uuid)
returns table(message_id bigint,sender_id uuid,sender_username text,sender_display_name text,sender_avatar_id text,body text,created_at timestamptz,is_mine boolean)
language plpgsql security definer set search_path=pg_catalog,public as $$
declare v_user uuid:=auth.uid();v_last bigint;
begin
 if v_user is null or not exists(select 1 from public.community_direct_conversations c where c.id=p_conversation_id and v_user in(c.member_low,c.member_high))then raise exception 'conversation_access_denied' using errcode='42501';end if;
 return query select m.id,m.sender_id,p.username::text,p.display_name::text,p.avatar_id::text,m.body,m.created_at,m.sender_id=v_user from public.community_direct_messages m join public.profiles p on p.id=m.sender_id where m.conversation_id=p_conversation_id order by m.id asc limit 500;
 select max(m.id)into v_last from public.community_direct_messages m where m.conversation_id=p_conversation_id;
 insert into public.community_direct_reads(conversation_id,user_id,last_read_message_id,read_at)values(p_conversation_id,v_user,v_last,now())on conflict(conversation_id,user_id)do update set last_read_message_id=excluded.last_read_message_id,read_at=excluded.read_at;
end;$$;

create or replace function public.get_unread_community_direct_message_count()
returns bigint language sql security definer set search_path=pg_catalog,public stable as $$
 select count(*) from public.community_direct_messages m join public.community_direct_conversations c on c.id=m.conversation_id left join public.community_direct_reads r on r.conversation_id=c.id and r.user_id=auth.uid() where auth.uid() in(c.member_low,c.member_high)and m.sender_id<>auth.uid()and m.id>coalesce(r.last_read_message_id,0);
$$;

revoke all on function public.assert_community_message_write_allowed(uuid),public.start_community_direct_conversation(text),public.send_community_direct_message(uuid,text),public.get_my_community_direct_conversations(),public.get_community_direct_messages(uuid),public.get_unread_community_direct_message_count() from public,anon;
grant execute on function public.start_community_direct_conversation(text),public.send_community_direct_message(uuid,text),public.get_my_community_direct_conversations(),public.get_community_direct_messages(uuid),public.get_unread_community_direct_message_count() to authenticated;

commit;
