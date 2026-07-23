/**
 * Database types. Mirrors supabase/migrations/0001_init.sql.
 * Regenerate with:
 *   npx supabase gen types typescript --project-id <id> > src/lib/supabase/types.ts
 */

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          email: string;
          company: string | null;
          phone: string | null;
          inquiry_type: string;
          message: string;
          status: string;
          source_path: string | null;
          created_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['contact_submissions']['Row'],
          'id' | 'created_at' | 'status'
        > & { id?: string; created_at?: string; status?: string };
        Update: Partial<Database['public']['Tables']['contact_submissions']['Insert']>;
        Relationships: [];
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          status: string;
          source_path: string | null;
          confirmed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          status?: string;
          source_path?: string | null;
        };
        Update: Partial<Database['public']['Tables']['newsletter_subscribers']['Insert']>;
        Relationships: [];
      };
      talent_profiles: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string | null;
          current_title: string | null;
          current_company: string | null;
          sector: string | null;
          years_experience: number | null;
          linkedin_url: string | null;
          resume_path: string | null;
          notes: string | null;
          status: string;
          created_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['talent_profiles']['Row'],
          'id' | 'created_at' | 'status'
        > & { id?: string; created_at?: string; status?: string };
        Update: Partial<Database['public']['Tables']['talent_profiles']['Insert']>;
        Relationships: [];
      };
      job_postings: {
        Row: {
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
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['job_postings']['Row']> & {
          slug: string;
          title: string;
        };
        Update: Partial<Database['public']['Tables']['job_postings']['Insert']>;
        Relationships: [];
      };
      job_applications: {
        Row: {
          id: string;
          job_id: string | null;
          job_slug: string | null;
          full_name: string;
          email: string;
          phone: string | null;
          linkedin_url: string | null;
          cover_note: string | null;
          resume_path: string | null;
          status: string;
          created_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['job_applications']['Row'],
          'id' | 'created_at' | 'status'
        > & { id?: string; created_at?: string; status?: string };
        Update: Partial<Database['public']['Tables']['job_applications']['Insert']>;
        Relationships: [];
      };
      career_openings: {
        Row: {
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
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['career_openings']['Row']> & {
          slug: string;
          title: string;
        };
        Update: Partial<Database['public']['Tables']['career_openings']['Insert']>;
        Relationships: [];
      };
      team_members: {
        Row: {
          id: string;
          slug: string;
          name: string;
          role: string;
          bio: string;
          focus: string | null;
          email: string | null;
          linkedin_url: string | null;
          avatar_url: string | null;
          sort_order: number;
          is_published: boolean;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['team_members']['Row']> & {
          slug: string;
          name: string;
          role: string;
          bio: string;
        };
        Update: Partial<Database['public']['Tables']['team_members']['Insert']>;
        Relationships: [];
      };
      testimonials: {
        Row: {
          id: string;
          quote: string;
          author: string;
          company: string;
          sector: string | null;
          sort_order: number;
          is_published: boolean;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['testimonials']['Row']> & {
          quote: string;
          author: string;
          company: string;
        };
        Update: Partial<Database['public']['Tables']['testimonials']['Insert']>;
        Relationships: [];
      };
      blog_posts: {
        Row: {
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
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['blog_posts']['Row']> & {
          slug: string;
          title: string;
        };
        Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
