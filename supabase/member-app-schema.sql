-- MakerSpace Charlotte member app MVP schema sketch.
-- Run this in a Supabase project after reviewing names and ownership with the team.

create type public.membership_status as enum ('active', 'pending', 'past_due', 'inactive');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  preferred_name text,
  phone text,
  discord_username text,
  communication_preference text default 'email',
  emergency_contact_name text,
  emergency_contact_phone text,
  business_name text,
  project_interests text,
  interests text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.memberships (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  status public.membership_status not null default 'pending',
  membership_type text not null default 'Individual + immediate family',
  external_member_id text,
  renewal_note text,
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.household_members (
  id uuid primary key default gen_random_uuid(),
  membership_id uuid not null references public.memberships(id) on delete cascade,
  full_name text not null,
  relationship text,
  created_at timestamptz not null default now()
);

create table public.roles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role text not null check (role in ('member', 'admin', 'shop_lead', 'authorized_shop_lead', 'instructor')),
  created_at timestamptz not null default now(),
  unique (profile_id, role)
);

create table public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  href text not null,
  category text not null,
  visible_to text not null default 'member',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.shop_instructions (
  id uuid primary key default gen_random_uuid(),
  shop text not null,
  status text not null default 'training_required',
  summary text not null,
  owner_note text,
  published boolean not null default false,
  updated_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.training_authorizations (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  shop text not null,
  tool text,
  status text not null default 'pending',
  authorized_by uuid references public.profiles(id),
  authorized_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  published boolean not null default false,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.support_requests (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  topic text not null,
  body text not null,
  status text not null default 'open',
  assigned_to uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.memberships enable row level security;
alter table public.household_members enable row level security;
alter table public.roles enable row level security;
alter table public.resources enable row level security;
alter table public.shop_instructions enable row level security;
alter table public.training_authorizations enable row level security;
alter table public.announcements enable row level security;
alter table public.support_requests enable row level security;

create policy "Members can read their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Members can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Members can read their own membership"
  on public.memberships for select
  using (auth.uid() = profile_id);

create policy "Members can read published resources"
  on public.resources for select
  using (visible_to in ('public', 'member'));

create policy "Members can read published shop instructions"
  on public.shop_instructions for select
  using (published = true);

create policy "Members can read published announcements"
  on public.announcements for select
  using (published = true);

create policy "Members can create support requests"
  on public.support_requests for insert
  with check (auth.uid() = profile_id);

-- Admin policies should be added after confirming the role-management workflow.
-- A common approach is a security-definer helper such as public.has_role('admin'),
-- then admin-only select/insert/update policies for operational tables.
