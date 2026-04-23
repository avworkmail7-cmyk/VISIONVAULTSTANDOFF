# Supabase + Vercel setup (free tier)

## 1) Create a free Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project on the free plan.
2. In `Project Settings -> API`, copy:
   - `Project URL`
   - `anon public` key

## 2) Create database tables and security rules

Open the Supabase SQL editor and run:

```sql
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null default '',
  display_name text not null default 'User',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.balances (
  user_id uuid primary key references auth.users(id) on delete cascade,
  gold integer not null default 0 check (gold >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.balances enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_insert_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;

create policy "profiles_select_own"
on public.profiles for select
using (auth.uid() = id);

create policy "profiles_insert_own"
on public.profiles for insert
with check (auth.uid() = id);

create policy "profiles_update_own"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "balances_select_own" on public.balances;
drop policy if exists "balances_insert_own" on public.balances;
drop policy if exists "balances_update_own" on public.balances;

create policy "balances_select_own"
on public.balances for select
using (auth.uid() = user_id);

create policy "balances_insert_own"
on public.balances for insert
with check (auth.uid() = user_id);

create policy "balances_update_own"
on public.balances for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
```

## 3) Configure local environment

Create `.env` from `.env.example` and set:

```bash
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## 4) Configure Vercel environment variables

In your Vercel project:

1. `Settings -> Environment Variables`
2. Add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Redeploy.

## 5) Enable sign-ins

In Supabase:

1. Go to `Authentication -> Providers -> Email`
2. Keep Email provider enabled.
3. For quick testing, disable email confirmation (optional).  
   If enabled, users must confirm email before logging in.

## Gold updates in app logic

The app now persists gold in `public.balances.gold`.

- Add gold when a user wins: call `addGold(amount)`
- Remove gold when a user loses: call `removeGold(amount)`
- Set exact balance: call `setGold(amount)`

These are exposed from `useAuth()` and write directly to Supabase.
