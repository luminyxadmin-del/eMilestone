import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { getBlogPosts, getJobPostings } from '@/lib/queries';

const staticRoutes: {
  path: string;
  priority: number;
  changeFrequency: 'daily' | 'weekly' | 'monthly';
}[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/who-we-are', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/why-us', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/our-team', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/expertise', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/for-employers', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/for-talent', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/csr', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/employee-engagement', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/careers', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/jobs', priority: 0.8, changeFrequency: 'daily' },
  { path: '/insights', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const [jobs, posts] = await Promise.all([getJobPostings(), getBlogPosts()]);

  return [
    ...pages,
    ...jobs.map((job) => ({
      url: `${site.url}/jobs/${job.slug}`,
      lastModified: new Date(job.posted_at),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    ...posts.map((post) => ({
      url: `${site.url}/insights/${post.slug}`,
      lastModified: new Date(post.published_at),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
