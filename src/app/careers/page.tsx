import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { ValueGrid } from '@/components/sections/ValueGrid';
import { CTASection } from '@/components/sections/CTASection';
import { EmptyState } from '@/components/sections/EmptyState';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { JobApplicationForm } from '@/components/forms/JobApplicationForm';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema-org';
import { buildMetadata } from '@/lib/seo';
import { getCareerOpenings } from '@/lib/queries';
import { candidateFit } from '@/content/site';

export const revalidate = 600;

const trail = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/who-we-are' },
  { name: 'Careers', path: '/careers' },
];

export const metadata: Metadata = buildMetadata({
  title: 'Careers',
  description:
    'Build your career at eMilestones. We hire consultants who have operated in the sectors they recruit for.',
  path: '/careers',
});

export default async function CareersPage() {
  const openings = await getCareerOpenings();

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <PageHero
        eyebrow="Careers"
        title="Build a career, not a billing **record**"
        description="We are always looking for exceptional individuals who share our commitment to excellence, integrity and impactful leadership."
        trail={trail}
      />

      <section className="section bg-white">
        <Container>
          <SectionHeading
            eyebrow="Open positions"
            title="Where we are **hiring**"
            description="Every consultant here has operated in the sector they now recruit for. If that describes you, the conversation is short."
          />

          <div className="mt-14">
            {openings.length === 0 ? (
              <EmptyState
                title="No open positions right now"
                description="We hire continuously but quietly. Send your profile and we will keep it on file for the next opening."
                action={{ label: 'Submit a speculative profile', href: '#apply' }}
              />
            ) : (
              <Stagger className="divide-y divide-line border-y border-line">
                {openings.map((role) => (
                  <StaggerItem key={role.id}>
                    <article className="group flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="accent">{role.department}</Badge>
                          <Badge variant="outline">{role.employment_type}</Badge>
                        </div>
                        <h3 className="mt-4 text-head-sm text-ink">{role.title}</h3>
                        <p className="mt-2 max-w-2xl text-body-md text-copy-muted">
                          {role.summary}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-6">
                        <span className="flex items-center gap-2 text-label-md text-copy-muted">
                          <MapPin aria-hidden="true" className="size-4" />
                          {role.location}
                        </span>
                        <Link
                          href="#apply"
                          className="text-label-md font-medium text-ink underline-offset-4 hover:underline"
                        >
                          Apply
                        </Link>
                      </div>
                    </article>
                  </StaggerItem>
                ))}
              </Stagger>
            )}
          </div>
        </Container>
      </section>

      <ValueGrid
        eyebrow="What we look for"
        title="What makes a good **fit**"
        description="Culture and values live on our Employee Engagement page. This is the profile that gets a callback."
        items={candidateFit}
        background="subtle"
      />

      <section id="apply" className="section scroll-mt-24 bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-20">
            <SectionHeading
              eyebrow="Apply"
              title="Introduce **yourself**"
              description="Tell us which practice you would join and what you have run before. A partner reads every application."
            />
            <Reveal delay={0.15}>
              <div className="rounded-md border border-line bg-surface-subtle p-8 md:p-10">
                <JobApplicationForm
                  jobSlug="general-application"
                  jobTitle="eMilestones careers"
                  endpoint="/api/careers"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Learn more"
        title="See how we invest in our **people**"
        description="Funded training, executive coaching accreditation and volunteering leave, published in full."
        primary={{ label: 'Life at eMilestones', href: '/employee-engagement' }}
        secondary={{ label: 'Meet the team', href: '/our-team' }}
      />
    </>
  );
}
