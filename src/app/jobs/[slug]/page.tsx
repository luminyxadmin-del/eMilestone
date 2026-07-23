import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Briefcase, MapPin, Wallet } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/motion/Reveal';
import { JobApplicationForm } from '@/components/forms/JobApplicationForm';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, jobPostingSchema } from '@/lib/schema-org';
import { buildMetadata } from '@/lib/seo';
import { getJobBySlug, getJobPostings } from '@/lib/queries';

export const revalidate = 300;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const jobs = await getJobPostings();
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) {
    return buildMetadata({
      title: 'Role not found',
      description: 'This mandate is no longer open.',
      path: `/jobs/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${job.title} — ${job.company}`,
    description: job.summary,
    path: `/jobs/${job.slug}`,
    type: 'article',
    publishedTime: job.posted_at,
  });
}

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) notFound();

  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Open Roles', path: '/jobs' },
    { name: job.title, path: `/jobs/${job.slug}` },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(trail), jobPostingSchema(job)]} />
      <PageHero
        eyebrow={job.sector}
        title={job.title}
        description={job.summary}
        trail={trail}
      >
        <div className="flex flex-wrap gap-3">
          <Badge variant="inverse">{job.engagement}</Badge>
          <Badge variant="inverse">{job.seniority}</Badge>
          <Badge variant="inverse">{job.employment_type}</Badge>
        </div>
      </PageHero>

      <section className="section bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,22rem)] lg:gap-20">
            <Reveal>
              <dl className="grid gap-6 border-b border-line pb-10 sm:grid-cols-3">
                <div>
                  <dt className="flex items-center gap-2 text-label-md text-copy-muted">
                    <MapPin aria-hidden="true" className="size-4" />
                    Location
                  </dt>
                  <dd className="mt-2 text-body-md text-ink">{job.location}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 text-label-md text-copy-muted">
                    <Briefcase aria-hidden="true" className="size-4" />
                    Organization
                  </dt>
                  <dd className="mt-2 text-body-md text-ink">{job.company}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 text-label-md text-copy-muted">
                    <Wallet aria-hidden="true" className="size-4" />
                    Compensation
                  </dt>
                  <dd className="mt-2 text-body-md text-ink">
                    {job.salary_range ?? 'Disclosed at first interview'}
                  </dd>
                </div>
              </dl>

              <div className="mt-10 space-y-10">
                <div>
                  <h2 className="text-head-sm text-ink">About the mandate</h2>
                  <p className="mt-4 whitespace-pre-line text-body-md text-copy-muted">
                    {job.description}
                  </p>
                </div>

                {job.responsibilities?.length > 0 && (
                  <div>
                    <h2 className="text-head-sm text-ink">What you will own</h2>
                    <ul className="mt-4 space-y-3">
                      {job.responsibilities.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-body-md text-copy-muted"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2.5 size-1 shrink-0 rounded-full bg-amber"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {job.requirements?.length > 0 && (
                  <div>
                    <h2 className="text-head-sm text-ink">What we are looking for</h2>
                    <ul className="mt-4 space-y-3">
                      {job.requirements.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-body-md text-copy-muted"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2.5 size-1 shrink-0 rounded-full bg-amber"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="sticky top-28 rounded-md border border-line bg-surface-subtle p-8">
                <h2 className="text-head-sm text-ink">Apply confidentially</h2>
                <p className="mt-2 text-label-md text-copy-muted">
                  We never contact your current employer.
                </p>
                <div className="mt-8">
                  <JobApplicationForm
                    jobSlug={job.slug}
                    jobId={job.id}
                    jobTitle={job.title}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
