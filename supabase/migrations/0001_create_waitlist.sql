-- Run this in: Supabase dashboard -> SQL Editor -> New query -> Run

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  stage text,
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

-- Public waitlist form uses the anon key and may only INSERT.
-- No select/update/delete policy exists, so the list can never be read publicly.
create policy "Anyone can join the waitlist"
  on public.waitlist
  for insert
  to anon
  with check (true);
