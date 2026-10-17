-- Separate owner intake. Does not alter aircraft_sales or buyer inquiries.
begin;
create table public.aircraft_seller_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null
);
create table public.aircraft_sale_submissions (
  id uuid primary key,
  request_hash text not null,
  ip_hash text not null,
  aircraft_type text not null,
  manufacturer text not null,
  model text not null,
  manufacturing_year integer not null check (manufacturing_year between 1903 and 2200),
  registration text not null,
  serial_number text,
  total_time numeric check (total_time >= 0),
  total_cycles bigint check (total_cycles >= 0),
  country text not null,
  city text not null,
  asking_price numeric check (asking_price >= 0),
  currency text not null check (currency in ('USD','MXN')),
  price_to_be_defined boolean not null default true,
  aircraft_status text not null,
  aircraft_notes text,
  contact_name text not null,
  company text,
  email text not null,
  phone text not null,
  relationship_to_aircraft text not null,
  preferred_contact_method text not null,
  privacy_accepted_at timestamptz not null,
  submission_status text not null default 'new' check (submission_status in ('new','reviewing','contacted','documents_pending','accepted','rejected','closed')),
  admin_notes text not null default '',
  assigned_advisor uuid references public.aircraft_seller_admins(user_id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index aircraft_sale_submissions_queue on public.aircraft_sale_submissions(submission_status, created_at desc);
create index aircraft_sale_submissions_rate on public.aircraft_sale_submissions(ip_hash, created_at);
create table public.aircraft_sale_submission_files (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.aircraft_sale_submissions(id) on delete cascade,
  original_name text not null,
  storage_path text not null unique,
  content_type text not null,
  size_bytes integer not null check (size_bytes between 1 and 5242880),
  created_at timestamptz not null default now()
);
create table public.aircraft_sale_submission_followups (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.aircraft_sale_submissions(id) on delete cascade,
  author_id uuid not null references auth.users(id),
  note text not null check (char_length(note) between 1 and 4000),
  created_at timestamptz not null default now()
);
create table public.aircraft_seller_email_outbox (
  submission_id uuid not null references public.aircraft_sale_submissions(id) on delete cascade,
  kind text not null check (kind in ('internal','owner')),
  status text not null default 'pending' check (status in ('pending','sent','failed')),
  provider_id text,
  sent_at timestamptz,
  primary key(submission_id,kind)
);
-- No anon/authenticated grants or permissive policies: all access through validated backend.
alter table public.aircraft_seller_admins enable row level security;
alter table public.aircraft_sale_submissions enable row level security;
alter table public.aircraft_sale_submission_files enable row level security;
alter table public.aircraft_sale_submission_followups enable row level security;
alter table public.aircraft_seller_email_outbox enable row level security;
revoke all on public.aircraft_seller_admins, public.aircraft_sale_submissions, public.aircraft_sale_submission_files, public.aircraft_sale_submission_followups, public.aircraft_seller_email_outbox from anon, authenticated;
grant all on public.aircraft_seller_admins, public.aircraft_sale_submissions, public.aircraft_sale_submission_files, public.aircraft_sale_submission_followups, public.aircraft_seller_email_outbox to service_role;
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values ('aircraft-seller-private','aircraft-seller-private',false,5242880,array['image/jpeg','image/png','image/webp','application/pdf']);
create policy aircraft_seller_private_guard on storage.objects as restrictive for all to anon, authenticated
using (bucket_id <> 'aircraft-seller-private') with check (bucket_id <> 'aircraft-seller-private');
-- Do not add public storage policies. Backend issues short lived signed URLs after admin authorization.
create function public.register_aircraft_seller(p_submission jsonb, p_files jsonb)
returns uuid language plpgsql security invoker set search_path = '' as $$
declare existing public.aircraft_sale_submissions; result_id uuid;
begin
  -- Serializes duplicate requests and per-IP rate checks across server instances.
  perform pg_advisory_xact_lock(hashtextextended(p_submission->>'ip_hash', 0));
  select * into existing from public.aircraft_sale_submissions where id = (p_submission->>'id')::uuid;
  if found then
    if existing.request_hash <> p_submission->>'request_hash' then raise exception 'REQUEST_CONFLICT'; end if;
    return existing.id;
  end if;
  if (select count(*) from public.aircraft_sale_submissions where ip_hash = p_submission->>'ip_hash' and created_at > now() - interval '1 hour') >= 3 then
    raise exception 'RATE_LIMIT';
  end if;
  insert into public.aircraft_sale_submissions select * from jsonb_populate_record(null::public.aircraft_sale_submissions,
    p_submission || jsonb_build_object('submission_status','new','admin_notes','','created_at',now(),'updated_at',now()));
  result_id := (p_submission->>'id')::uuid;
  insert into public.aircraft_sale_submission_files (submission_id,original_name,storage_path,content_type,size_bytes)
    select result_id, x.original_name, x.storage_path, x.content_type, x.size_bytes
    from jsonb_to_recordset(p_files) as x(original_name text,storage_path text,content_type text,size_bytes integer);
  insert into public.aircraft_seller_email_outbox(submission_id,kind) values (result_id,'internal'),(result_id,'owner');
  return result_id;
end $$;
revoke all on function public.register_aircraft_seller(jsonb,jsonb) from public, anon, authenticated;
grant execute on function public.register_aircraft_seller(jsonb,jsonb) to service_role;
-- Update + followup atomically; caller identity is checked by backend.
create function public.update_aircraft_seller(p_id uuid, p_patch jsonb, p_author uuid, p_followup text)
returns void language plpgsql security invoker set search_path = '' as $$
begin
  update public.aircraft_sale_submissions set submission_status=p_patch->>'submission_status',
    admin_notes=p_patch->>'admin_notes', assigned_advisor=(p_patch->>'assigned_advisor')::uuid, updated_at=now() where id=p_id;
  if not found then raise exception 'NOT_FOUND'; end if;
  if coalesce(p_followup,'') <> '' then
    insert into public.aircraft_sale_submission_followups(submission_id,author_id,note) values(p_id,p_author,p_followup);
  end if;
end $$;
revoke all on function public.update_aircraft_seller(uuid,jsonb,uuid,text) from public, anon, authenticated;
grant execute on function public.update_aircraft_seller(uuid,jsonb,uuid,text) to service_role;
commit;
