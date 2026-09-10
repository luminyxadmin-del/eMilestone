import type { LucideIcon } from 'lucide-react';

export type IconName = string;

export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup extends NavLink {
  children?: NavLink[];
}

export interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon: IconName;
}

export interface ServiceOffering {
  slug: string;
  title: string;
  icon: IconName;
  summary: string;
  detail: string;
  cta: string;
  outcomes: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  icon: IconName;
  summary: string;
  detail: string;
}

export interface Sector {
  slug: string;
  name: string;
  icon: IconName;
  description: string;
  roles: string[];
  /** Longer expansion shown only where a page wants sector depth (Expertise). */
  detail?: string;
  /** Anonymized concrete placement, shown alongside `detail`. */
  examplePlacement?: string;
}

export interface ValuePillar {
  title: string;
  icon: IconName;
  description: string;
}

export type Benefit = ValuePillar;

export interface CsrPillar extends ValuePillar {
  metric: { value: string; label: string };
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  bio: string;
  /** Omitted where a real, verified contact detail isn't available for
   *  this person — never fabricate one. */
  email?: string;
  linkedin?: string;
  initials: string;
  focus: string;
  avatarUrl?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface OfficeLocation {
  city: string;
  label: string;
  address: string[];
  mapUrl: string;
  primary: boolean;
  /** Office-specific contact details, where they differ from the site-wide
   *  `site.phone`/`site.email` (e.g. a city's dedicated HR inbox). */
  phone?: string;
  email?: string;
}

/* ------------------------------------------------------ home difference band */

export interface HomeDifferenceStat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export interface HomeDifference {
  eyebrow: string;
  title: string;
  intro: string;
  /** Rendered as `{lead}<span amber>{accent}</span>.` — kept as separate
   *  fields rather than a `**accent**` marker because the sentence needs a
   *  trailing period after the accented phrase, which the marker convention
   *  (accent must be the literal tail of the string) can't express. */
  statement: { lead: string; accent: string };
  supporting: string;
  stats: HomeDifferenceStat[];
  quote: { quote: string; attribution: string };
  cta: { label: string; href: string };
}

/* ------------------------------------------------------- recruiter comparison */

export interface ComparisonRow {
  point: string;
  us: string;
  them: string;
}

export interface RecruiterComparison {
  eyebrow: string;
  title: string;
  intro: string;
  usLabel: string;
  themLabel: string;
  rows: ComparisonRow[];
  cta: { label: string; href: string };
}

/* --------------------------------------------------------- client outcomes */

export interface ClientOutcome {
  sector: string;
  mandate: string;
  description: string;
  metric: { value: string; label: string };
  icon: IconName;
}

/* ------------------------------------------------------------ database rows */

export interface JobPosting {
  id: string;
  slug: string;
  title: string;
  company: string;
  sector: string;
  location: string;
  employment_type: string;
  engagement: string;
  seniority: string;
  salary_range: string | null;
  summary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  is_published: boolean;
  is_featured: boolean;
  posted_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  category: string;
  author_name: string;
  read_minutes: number;
  is_published: boolean;
  published_at: string;
}

export type IconComponent = LucideIcon;

export interface CareerOpening {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  summary: string;
  description: string;
  is_published: boolean;
  posted_at: string;
}
