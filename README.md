# Cyrral Waitlist

React + Vite + Tailwind CSS landing page. Stores signups in Supabase and sends a warm
welcome email via Resend, triggered from a Supabase Edge Function (so the Resend key
never reaches the browser).

## Stack

- **Frontend:** React 19 + Vite + Tailwind CSS v4
- **Storage:** Supabase Postgres (`waitlist` table, RLS-protected)
- **Email:** Resend, called from a Supabase Edge Function

## Run locally

```bash
npm install
cp .env.example .env   # then fill in the two VITE_ values, see step 2 below
npm run dev
```

The form will render and validate without Supabase configured, but submitting will
show a graceful error until you complete the setup below.

---

## Setup steps (only you can do these)

### 1. Create the Supabase table

In your Supabase project: **SQL Editor → New query**, paste and run the contents of
[`supabase/migrations/0001_create_waitlist.sql`](supabase/migrations/0001_create_waitlist.sql):

```sql
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  stage text,
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

create policy "Anyone can join the waitlist"
  on public.waitlist
  for insert
  to anon
  with check (true);
```

This enables RLS and adds **only** an anonymous-INSERT policy — there is no select
policy, so the list can never be read from the public API, only from the Supabase
dashboard or with the service-role key.

### 2. Set the frontend environment variables

In Supabase: **Project Settings → API**. Copy:
- **Project URL** → `VITE_SUPABASE_URL`
- **anon / public key** → `VITE_SUPABASE_ANON_KEY`

Put both in a local `.env` file (copy `.env.example`). These are safe to expose in the
browser — that's what the anon key + RLS policy are for.

### 3. Set up Resend

1. In Resend, verify a sending domain (**Domains → Add Domain**, then add the DNS
   records it gives you at your domain registrar). Until that's verified you can test
   with Resend's shared `onboarding@resend.dev` address, but real signups should send
   from your own domain.
2. Create an API key: **API Keys → Create API Key**.
3. Decide your reply-to inbox — the real address that should receive replies to "what's
   the hardest part of this chapter for you" (e.g. you@yourdomain.com).

### 4. Deploy the Edge Function and set its secrets

Install the Supabase CLI if you don't have it (`npm install -g supabase`), then from
this project folder:

```bash
supabase login
supabase link --project-ref your-project-ref   # find this in your Supabase project URL

supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
supabase secrets set EMAIL_FROM=hello@yourdomain.com
supabase secrets set EMAIL_REPLY_TO=you@yourdomain.com

supabase functions deploy send-welcome-email
```

`EMAIL_FROM` must be an address on the domain you verified in step 3 (or
`onboarding@resend.dev` while testing). Leave JWT verification **on** (the default) —
the frontend already authenticates the call with your anon key, so no `--no-verify-jwt`
flag is needed. These three secrets live only on Supabase's servers; they're never in
your frontend code or `.env`.

### 5. Deploy the frontend to Vercel

1. Push this repo to GitHub (if you haven't already).
2. In Vercel: **Add New → Project**, import the repo. Framework preset: **Vite**.
3. Under **Settings → Environment Variables**, add the same two frontend variables
   from step 2: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Deploy.

That's it — once steps 1–4 are done, the live form will insert into Supabase and the
welcome email will send automatically on every new (non-duplicate) signup.

## Project structure

```
src/
  components/        UI sections (Hero, Features, WaitlistForm, etc.)
  lib/supabase.js     Supabase client (reads VITE_ env vars)
supabase/
  migrations/         SQL to run in the Supabase SQL Editor
  functions/
    send-welcome-email/   Edge Function that calls Resend
```
