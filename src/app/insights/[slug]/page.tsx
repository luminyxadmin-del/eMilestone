import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/sections/PageHero';
import { CTASection } from '@/components/sections/CTASection';
import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/motion/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema-org';
import { buildMetadata } from '@/lib/seo';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/queries';
import { formatDate, absoluteUrl } from '@/lib/utils';
import { site } from '@/content/site';

export const revalidate = 600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: 'Article not found',
      description: 'This article is no longer available.',
      path: `/insights/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/insights/${post.slug}`,
    image: post.cover_image_url ?? undefined,
    type: 'article',
    publishedTime: post.published_at,
  });
}

export default async function InsightPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/insights' },
    { name: post.title, path: `/insights/${post.slug}` },
  ];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_at,
    author: { '@type': 'Person', name: post.author_name },
    publisher: { '@type': 'Organization', name: site.legalName },
    mainEntityOfPage: absoluteUrl(`/insights/${post.slug}`),
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema(trail), articleSchema]} />
      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        trail={trail}
      >
        <p className="text-label-md text-white/50">
          {post.author_name} ·{' '}
          <time dateTime={post.published_at}>{formatDate(post.published_at)}</time> ·{' '}
          {post.read_minutes} min read
        </p>
      </PageHero>

      <article className="section bg-white">
        <Container width="narrow">
          <Reveal>
            <div className="space-y-6 text-body-lg text-copy-muted [&_h2]:pt-6 [&_h2]:text-head-md [&_h2]:text-ink">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </Container>
      </article>

      <CTASection
        title="Discuss this with a **partner**"
        description="If something here maps onto a search you are considering, we are happy to talk it through."
        primary={{ label: 'Contact us', href: '/contact' }}
        secondary={{ label: 'More insights', href: '/insights' }}
      />
    </>
  );
}
