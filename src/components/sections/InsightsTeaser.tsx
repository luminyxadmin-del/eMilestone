import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { Reveal } from '@/components/motion/Reveal';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { getBlogPosts } from '@/lib/queries';
import { formatDate } from '@/lib/utils';

export async function InsightsTeaser() {
  const posts = (await getBlogPosts()).slice(0, 3);

  return (
    <section className="section bg-white">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Research"
            title="Latest briefings"
            description="Commentary on leadership markets, written by the partners who work them."
          />
          {posts.length > 0 && (
            <Reveal delay={0.1}>
              <Button asChild variant="outline">
                <Link href="/insights">
                  All insights
                  <ArrowRight />
                </Link>
              </Button>
            </Reveal>
          )}
        </div>

        {posts.length === 0 ? (
          <Reveal delay={0.15}>
            <div className="mt-16 rounded-md border border-dashed border-line bg-surface-subtle px-8 py-16 text-center md:px-16">
              <h3 className="text-head-sm text-ink">Briefings coming soon</h3>
              <p className="mx-auto mt-3 max-w-md text-body-md text-copy-muted">
                Our first executive briefing is in production. Subscribe and it will land
                in your inbox before it appears here.
              </p>
              <div className="mx-auto mt-8 max-w-sm">
                <NewsletterForm />
              </div>
            </div>
          </Reveal>
        ) : (
          <Stagger className="mt-16 grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <StaggerItem key={post.id}>
                <article className="group relative flex h-full flex-col rounded-md border border-line bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-level2">
                  <Badge variant="accent">{post.category}</Badge>
                  <h3 className="mt-6 text-head-sm text-ink">
                    <Link
                      href={`/insights/${post.slug}`}
                      className="after:absolute after:inset-0"
                    >
                      {post.title}
                    </Link>
                  </h3>
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
  );
}
