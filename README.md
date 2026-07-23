# Milestones Executive Search

A production-ready marketing and recruitment site for an executive search firm, rebuilt from a static HTML prototype into Next.js 15 with a Supabase backend.

**Stack:** Next.js 15 (App Router) · TypeScript (strict) · Tailwind CSS · Supabase · Framer Motion · React Hook Form · Zod · shadcn/ui primitives · Lucide

---

## Quick start

```bash
npm install
cp .env.example .env.local     # fill in your Supabase keys
npm run dev                    # http://localhost:3000
```

The site builds and renders without Supabase configured. Every database query degrades to an empty result and every form returns a clear "not configured yet" message, so you can develop the front end before the backend exists.

### Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` | Prettier, including Tailwind class sorting |

---

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Run `supabase/migrations/0001_init.sql` in the SQL editor. This creates every table, index, RLS policy and the private `resumes` storage bucket.
3. Optionally run `supabase/seed.sql` to populate jobs, careers, team, testimonials and two articles.
4. Copy your keys from **Project Settings → API** into `.env.local`.

### Environment variables

| Variable | Where it runs | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Both | Canonical URLs, sitemap, Open Graph |
| `NEXT_PUBLIC_SUPABASE_URL` | Both | Project endpoint |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Both | Public key, constrained by RLS |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server only** | Bypasses RLS. Never import into a client component. |
| `NEXT_PUBLIC_SUPABASE_RESUME_BUCKET` | Both | Storage bucket for resumes, defaults to `resumes` |

### Security model

The schema splits into two halves, and RLS enforces the split:

- **Write-only inboxes** — `contact_submissions`, `newsletter_subscribers`, `talent_profiles`, `job_applications`. Anyone may `INSERT`; nobody anonymous may `SELECT`. Submissions cannot be read back through the public API.
- **Read-only content** — `job_postings`, `career_openings`, `team_members`, `testimonials`, `blog_posts`. Public `SELECT` is allowed only where `is_published = true`.

The `resumes` bucket is private with a 5 MB limit and a PDF/Word MIME allowlist. Candidates can upload but cannot list or download; retrieval is service-role only.

Every API route additionally applies Zod validation, a honeypot field, and per-IP rate limiting (`src/lib/rate-limit.ts`). The limiter is in-memory, which is fine for a single instance — swap it for Upstash Redis if you scale horizontally.

---

## Routes

Every page from the original prototype became its own route. Nothing was merged.

| Route | Source |
| --- | --- |
| `/` | `home_milestones_executive_search` |
| `/who-we-are` | `who_we_are_milestones` |
| `/why-us` | `why_us_milestones` |
| `/our-team` | `our_team_milestones` |
| `/services` | `services_milestones` |
| `/expertise` | `expertise_milestones` |
| `/for-employers` | `for_employers_milestones` |
| `/for-talent` | `for_talent_milestones` |
| `/csr` | `csr_activities_milestones` |
| `/employee-engagement` | `employee_engagement_milestones` |
| `/contact` | `contact_us_milestones` |

Four routes were added because the prototype linked to them without providing pages: `/careers`, `/jobs`, `/jobs/[slug]` and `/insights`, `/insights/[slug]`.

API routes: `/api/contact`, `/api/newsletter`, `/api/talent`, `/api/applications`, `/api/careers`.

---

## Architecture

```
src/
├── app/                  Routes, API handlers, sitemap, robots, error boundaries
├── components/
│   ├── layout/           Navbar, Footer
│   ├── ui/               Button, Input, Select, Accordion, Badge, Container, Field…
│   ├── sections/         Composable page sections (Hero, CTA, Stats, Timeline…)
│   ├── motion/           Reveal, Stagger, TextReveal, Counter, Parallax, Magnetic…
│   └── forms/            Contact, Newsletter, TalentProfile, JobApplication, Dropzone
├── content/site.ts       All copy, typed and centralised
├── lib/
│   ├── supabase/         Browser, server and admin clients + generated types
│   ├── validations/      Zod schemas shared by client and server
│   ├── queries.ts        Server-only data access
│   ├── seo.ts            Metadata builder
│   └── schema-org.ts     Structured data
└── types/                Shared interfaces
```

Copy lives in `src/content/site.ts` rather than inside components, so a rewrite never touches JSX. Forms validate against the same Zod schema on both the client and the server — one definition, no drift.

---

## Design notes

The visual direction follows the `DESIGN.md` brief that shipped with the prototype: Deep Slate `#0F172A` as an ink base, Amber Gold `#F59E0B` as a sparing accent, Manrope for display and Inter for body, 12px radii, ambient shadows and glassmorphism on the navigation.

The **signature element is the milestone rail** — a hairline track with amber markers that appears in the hero as a stage ladder, in the methodology section as a scroll-linked progress line, and at the top of the page as a reading indicator. It is content-true rather than decorative: a retained search genuinely is a five-stage sequence, which is what the firm is named for.

### Changes from the prototype

- The methodology block rendered **twice** on the services page. It appears once.
- Three inconsistent footers were unified into one.
- Every navigation link was `href="#"`. All are wired, with a working dropdown and mobile sheet.
- `primary` was pure black, contradicting the brief's Deep Slate. Corrected.
- Hero images were hot-linked to a Google CDN that will expire. Replaced with a composed layout that owns its own assets.
- Forms were markup only. They now validate, submit, rate-limit and persist.

---

## Accessibility

- Semantic landmarks, one `h1` per page, ordered heading levels
- Skip-to-content link, visible focus rings on every interactive element
- Labelled form controls with `aria-invalid` and `role="alert"` errors
- `prefers-reduced-motion` respected in CSS **and** in every Framer Motion component
- Decorative marquee and icons hidden from assistive tech, with text alternatives

## SEO

Per-route metadata via `buildMetadata()`, Open Graph and Twitter cards, canonical URLs, a dynamic `sitemap.xml` that includes database-driven routes, `robots.txt`, and JSON-LD for `ProfessionalService`, `WebSite`, `BreadcrumbList`, `FAQPage`, `Article` and `JobPosting`.

Add your own `public/og-default.png` at 1200×630 before launch.

## Performance

Server Components by default; `'use client'` only where interaction requires it. Route-level code splitting, `next/font` with `display: swap`, AVIF/WebP image formats, `optimizePackageImports` for Lucide and Framer Motion, and ISR on the database-backed routes (5–10 minute revalidation).

---

## Deployment

Push to GitHub and import into Vercel. Add the environment variables from `.env.example`, set `NEXT_PUBLIC_SITE_URL` to the production domain, and deploy. Any Node 18+ host works: `npm run build && npm run start`.

## Before launch

- [ ] Replace placeholder contact details in `src/content/site.ts`
- [ ] Add `public/og-default.png` (1200×630)
- [ ] Add `public/favicon.ico`
- [ ] Run the migration and seed against production Supabase
- [ ] Swap the in-memory rate limiter for Redis if running multiple instances
- [ ] Wire an email notifier to the API routes if you want alerts on submission
