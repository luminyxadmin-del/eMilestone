import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/sections/PageHero';
import { CTASection } from '@/components/sections/CTASection';
import { EmptyState } from '@/components/sections/EmptyState';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema-org';
import { buildMetadata } from '@/lib/seo';
import { getBlogPosts } from '@/lib/queries';
import { formatDate } from '@/lib/utils';

export const revalidate = 600;

const trail = [
  { name: 'Home', path: '/' },
  { name: 'Insights', path: '/insights' },
];

export const metadata: Metadata = buildMetadata({
  title: 'Insights',
  description:
    'Research and commentary on executive leadership, board composition and the talent markets we operate in.',
  path: '/insights',
});

export default async function InsightsPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <PageHero
        eyebrow="Research"
        title="Research and **insights**"
        description="Commentary on executive leadership, board composition and the talent markets we operate in — written by the partners who work them."
        trail={trail}
      />

      <section className="section bg-white">
        <Container>
          {posts.length === 0 ? (
            <EmptyState
              title="No articles published yet"
              description="Our first briefings go out to subscribers before they appear here. Join the list to read them early."
              action={{ label: 'Contact us', href: '/contact' }}
            />
          ) : (
            <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <StaggerItem key={post.id}>
                  <article className="group relative flex h-full flex-col rounded-md border border-line bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-level2">
                    <Badge variant="accent">{post.category}</Badge>
                    <h2 className="mt-6 text-head-sm text-ink">
                      <Link
                        href={`/insights/${post.slug}`}
                        className="after:absolute after:inset-0"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 flex-1 text-body-md text-copy-muted">
                      {post.excerpt}
                    </p>
                    <footer className="mt-8 flex items-center gap-3 border-t border-line pt-6 text-label-md text-copy-muted">
                      <time dateTime={post.published_at}>
                        {formatDate(post.published_at)}
                      </time>
                      <span aria-hidden="true">·</span>
                      <span>{post.read_minutes} min read</span>
                    </footer>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </Container>
      </section>

      <CTASection
        eyebrow="Subscribe"
        title="Get the executive **briefing**"
        description="One email a month on leadership markets. No promotion, no filler."
        primary={{ label: 'Contact us', href: '/contact' }}
      />
    </>
  );
}
