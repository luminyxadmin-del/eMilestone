import 'server-only';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/admin';
import type { BlogPost, CareerOpening, JobPosting } from '@/types';

/**
 * Every query degrades to an empty result when Supabase is not yet wired up,
 * so the site builds and renders before the database exists.
 */

export async function getJobPostings(): Promise<JobPosting[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('job_postings')
    .select('*')
    .eq('is_published', true)
    .order('posted_at', { ascending: false });

  if (error || !data) return [];
  return data as JobPosting[];
}

export async function getJobBySlug(slug: string): Promise<JobPosting | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('job_postings')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();

  if (error || !data) return null;
  return data as JobPosting;
}

export async function getCareerOpenings(): Promise<CareerOpening[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('career_openings')
    .select('*')
    .eq('is_published', true)
    .order('posted_at', { ascending: false });

  if (error || !data) return [];
  return data as CareerOpening[];
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (error || !data) return [];
  return data as BlogPost[];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();

  if (error || !data) return null;
  return data as BlogPost;
}
