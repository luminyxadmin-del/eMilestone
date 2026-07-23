-- =============================================================================
-- Milestones Executive Search — initial schema
-- =============================================================================
-- Security model:
--   * Submission tables (contact, newsletter, talent, applications) are
--     WRITE-ONLY to the public. Nobody anonymous can read them back.
--   * Content tables (jobs, careers, team, testimonials, blog) are
--     READ-ONLY to the public, and only where is_published = true.
--   * All administrative reads and writes go through the service-role key,
--     which bypasses RLS and is only ever used server-side.
-- =============================================================================

create extension if not exists "pgcrypto";

-- --------------------------------------------------------------- submissions

create table if not exists public.contact_submissions (
  id            uuid primary key default gen_random_uuid(),
  first_name    text not null check (char_length(first_name) between 2 and 60),
  last_name     text not null check (char_length(last_name) between 2 and 60),
  email         text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  company       text,
  phone         text,
  inquiry_type  text not null default 'general'
                check (inquiry_type in ('general', 'client', 'candidate', 'media')),
  message       text not null check (char_length(message) between 20 and 4000),
  status        text not null default 'new'
                check (status in ('new', 'in_progress', 'closed', 'spam')),
  source_path   text,
  created_at    timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id            uuid primary key default gen_random_uuid(),
  email         text not null unique check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  status        text not null default 'pending'
                check (status in ('pending', 'confirmed', 'unsubscribed')),
  source_path   text,
  confirmed_at  timestamptz,
  created_at    timestamptz not null default now()
);

create table if not exists public.talent_profiles (
  id               uuid primary key default gen_random_uuid(),
  full_name        text not null,
  email            text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone            text,
  current_title    text,
  current_company  text,
  sector           text,
  years_experience integer check (years_experience between 0 and 60),
  linkedin_url     text,
  resume_path      text,
  notes            text,
  status           text not null default 'new'
                   check (status in ('new', 'screening', 'shortlisted', 'placed', 'archived')),
  created_at       timestamptz not null default now()
);

-- ------------------------------------------------------------------- content

create table if not exists public.job_postings (
  id               uuid primary key default gen_random_uuid(),
  slug             text not null unique,
  title            text not null,
  company          text not null default 'Confidential',
  sector           text not null default 'Technology',
  location         text not null default 'Remote',
  employment_type  text not null default 'Full-time',
  engagement       text not null default 'Retained'
                   check (engagement in ('Retained', 'Exclusive', 'Confidential')),
  seniority        text not null default 'C-suite',
  salary_range     text,
  summary          text not null default '',
  description      text not null default '',
  responsibilities text[] not null default '{}',
  requirements     text[] not null default '{}',
  is_published     boolean not null default false,
  is_featured      boolean not null default false,
  posted_at        timestamptz not null default now(),
  created_at       timestamptz not null default now()
);

create table if not exists public.career_openings (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  title           text not null,
  department      text not null default 'Search',
  location        text not null default 'New York',
  employment_type text not null default 'Full-time',
  summary         text not null default '',
  description     text not null default '',
  is_published    boolean not null default false,
  posted_at       timestamptz not null default now(),
  created_at      timestamptz not null default now()
);

create table if not exists public.job_applications (
  id           uuid primary key default gen_random_uuid(),
  job_id       uuid references public.job_postings(id) on delete set null,
  job_slug     text,
  full_name    text not null,
  email        text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone        text,
  linkedin_url text,
  cover_note   text,
  resume_path  text,
  status       text not null default 'new'
               check (status in ('new', 'reviewing', 'interviewing', 'rejected', 'hired')),
  created_at   timestamptz not null default now()
);

create table if not exists public.team_members (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  name         text not null,
  role         text not null,
  bio          text not null,
  focus        text,
  email        text,
  linkedin_url text,
  avatar_url   text,
  sort_order   integer not null default 0,
  is_published boolean not null default true,
  created_at   timestamptz not null default now()
);

create table if not exists public.testimonials (
  id           uuid primary key default gen_random_uuid(),
  quote        text not null,
  author       text not null,
  company      text not null,
  sector       text,
  sort_order   integer not null default 0,
  is_published boolean not null default true,
  created_at   timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  title           text not null,
  excerpt         text not null default '',
  content         text not null default '',
  cover_image_url text,
  category        text not null default 'Leadership',
  author_name     text not null default 'Milestones',
  read_minutes    integer not null default 5,
  is_published    boolean not null default false,
  published_at    timestamptz not null default now(),
  created_at      timestamptz not null default now()
);

-- ------------------------------------------------------------------- indexes

create index if not exists idx_contact_created      on public.contact_submissions (created_at desc);
create index if not exists idx_contact_status       on public.contact_submissions (status);
create index if not exists idx_talent_email         on public.talent_profiles (email);
create index if not exists idx_talent_sector        on public.talent_profiles (sector);
create index if not exists idx_jobs_published       on public.job_postings (is_published, posted_at desc);
create index if not exists idx_jobs_sector          on public.job_postings (sector);
create index if not exists idx_careers_published    on public.career_openings (is_published, posted_at desc);
create index if not exists idx_applications_job     on public.job_applications (job_id);
create index if not exists idx_posts_published      on public.blog_posts (is_published, published_at desc);

-- ----------------------------------------------------------------------- RLS

alter table public.contact_submissions   enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.talent_profiles       enable row level security;
alter table public.job_postings          enable row level security;
alter table public.career_openings       enable row level security;
alter table public.job_applications      enable row level security;
alter table public.team_members          enable row level security;
alter table public.testimonials          enable row level security;
alter table public.blog_posts            enable row level security;

-- Write-only inboxes: anyone may insert, nobody anonymous may select.
create policy "anon can submit contact"
  on public.contact_submissions for insert to anon, authenticated with check (true);

create policy "anon can subscribe"
  on public.newsletter_subscribers for insert to anon, authenticated with check (true);

create policy "anon can submit profile"
  on public.talent_profiles for insert to anon, authenticated with check (true);

create policy "anon can apply"
  on public.job_applications for insert to anon, authenticated with check (true);

-- Read-only content: published rows only.
create policy "published jobs are public"
  on public.job_postings for select to anon, authenticated using (is_published = true);

create policy "published careers are public"
  on public.career_openings for select to anon, authenticated using (is_published = true);

create policy "published team is public"
  on public.team_members for select to anon, authenticated using (is_published = true);

create policy "published testimonials are public"
  on public.testimonials for select to anon, authenticated using (is_published = true);

create policy "published posts are public"
  on public.blog_posts for select to anon, authenticated using (is_published = true);

-- --------------------------------------------------------------- storage

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'resumes',
  'resumes',
  false,
  5242880,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
on conflict (id) do nothing;

-- Candidates may upload but never list or download. Retrieval is service-role only.
create policy "anon can upload a resume"
  on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'resumes');
