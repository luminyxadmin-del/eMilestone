import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Briefcase, MapPin } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { CTASection } from '@/components/sections/CTASection';
import { EmptyState } from '@/components/sections/EmptyState';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema-org';
import { buildMetadata } from '@/lib/seo';
import { getJobPostings } from '@/lib/queries';

export const revalidate = 300;

const trail = [
  { name: 'Home', path: '/' },
  { name: 'For Talent', path: '/for-talent' },
  { name: 'Open Roles', path: '/jobs' },
];

export const metadata: Metadata = buildMetadata({
  title: 'Open Roles',
  description:
    'Current executive mandates from eMilestones Executive Search. Most searches are confidential; these are the roles we can name.',
  path: '/jobs',
});

export default async function JobsPage() {
  const jobs = await getJobPostings();

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <PageHero
        eyebrow="Live mandates"
        title="Open **roles**"
        description="These are the searches we can name publicly. Most of our work is confidential — join the network and we will approach you directly."
        trail={trail}
      />

      <section className="section bg-white">
        <Container>
          {jobs.length === 0 ? (
            <EmptyState
              title="No public roles right now"
              description="Our current mandates are all confidential. Submit your profile and a consultant will contact you when something fits."
              action={{ label: 'Submit your profile', href: '/for-talent#submit' }}
            />
          ) : (
            <Stagger className="grid gap-6 lg:grid-cols-2">
              {jobs.map((job) => (
                <StaggerItem key={job.id}>
                  <article className="group flex h-full flex-col rounded-md border border-line bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-level2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="accent">{job.sector}</Badge>
                      <Badge variant="outline">{job.engagement}</Badge>
                    </div>

                    <h2 className="mt-6 text-head-sm text-ink">
                      <Link
                        href={`/jobs/${job.slug}`}
                        className="after:absolute after:inset-0"
                      >
                        {job.title}
                      </Link>
                    </h2>
                    <p className="mt-2 text-body-md text-copy-muted">{job.company}</p>
                    <p className="mt-4 flex-1 text-body-md text-copy-muted">
                      {job.summary}
                    </p>

                    <dl className="mt-6 flex flex-wrap gap-6 border-t border-line pt-6 text-label-md text-copy-muted">
                      <div className="flex items-center gap-2">
                        <MapPin aria-hidden="true" className="size-4 text-copy-faint" />
                        <dt className="sr-only">Location</dt>
                        <dd>{job.location}</dd>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase
                          aria-hidden="true"
                          className="size-4 text-copy-faint"
                        />
                        <dt className="sr-only">Employment type</dt>
                        <dd>{job.employment_type}</dd>
                      </div>
                    </dl>

                    <span className="mt-8 inline-flex items-center gap-2 text-label-md font-medium text-ink">
                      View details
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </Container>
      </section>

      <CTASection
        title="Nothing here **fits**?"
        description="Most of our mandates never reach this page. Join the network and we will call you when the right one lands."
        primary={{ label: 'Join the network', href: '/for-talent#submit' }}
      />
    </>
  );
}
