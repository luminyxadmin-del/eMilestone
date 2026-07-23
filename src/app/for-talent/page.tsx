import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Briefcase, MapPin } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { CTASection } from '@/components/sections/CTASection';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { TalentProfileForm } from '@/components/forms/TalentProfileForm';
import { Icon } from '@/lib/icon';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema-org';
import { buildMetadata } from '@/lib/seo';
import { featuredRoles, candidateServices } from '@/content/site';

const trail = [
  { name: 'Home', path: '/' },
  { name: 'For Talent', path: '/for-talent' },
];

export const metadata: Metadata = buildMetadata({
  title: 'For Talent',
  description:
    'Connecting exceptional leaders with world-class opportunities. Submit your credentials confidentially to join the eMilestones executive network.',
  path: '/for-talent',
});

export default function ForTalentPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <PageHero
        eyebrow="For talent"
        title="Accelerate your executive **journey**"
        description="Connecting exceptional leaders with world-class opportunities across the globe. Every conversation starts confidential and stays that way until you say otherwise."
        trail={trail}
      >
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" variant="accent">
            <Link href="/jobs">
              Explore opportunities
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="ghostInverse">
            <Link href="#submit">Join the network</Link>
          </Button>
        </div>
      </PageHero>

      <section className="section bg-white">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Live mandates"
              title="Select **opportunities**"
              description="A sample of the searches we are running now. Most of our mandates are confidential and never appear here."
              className="max-w-2xl"
            />
            <Reveal>
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 text-label-md font-medium text-ink transition-colors hover:text-amber-deep"
              >
                View all roles
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </Reveal>
          </div>

          <Stagger className="mt-14 grid gap-6 lg:grid-cols-3">
            {featuredRoles.map((role) => (
              <StaggerItem key={role.id}>
                <article className="group flex h-full flex-col rounded-md border border-line bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-level2">
                  <Badge variant="accent">{role.sector}</Badge>
                  <h3 className="mt-6 text-head-sm text-ink">{role.title}</h3>
                  <p className="mt-2 text-body-md text-copy-muted">{role.company}</p>

                  <dl className="mt-6 flex-1 space-y-3 border-t border-line pt-6 text-label-md text-copy-muted">
                    <div className="flex items-center gap-2">
                      <MapPin aria-hidden="true" className="size-4 text-copy-faint" />
                      <dt className="sr-only">Location</dt>
                      <dd>{role.location}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase aria-hidden="true" className="size-4 text-copy-faint" />
                      <dt className="sr-only">Engagement type</dt>
                      <dd>{role.engagement}</dd>
                    </div>
                  </dl>

                  <Link
                    href="/jobs"
                    className="mt-8 inline-flex items-center gap-2 text-label-md font-medium text-ink transition-colors hover:text-amber-deep"
                  >
                    View details
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section id="submit" className="section scroll-mt-24 bg-surface-subtle">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="Join the network"
                title="Discreetly submit your **credentials**"
                description="Our consultants are constantly seeking high-caliber talent for confidential retained searches. Add your profile and we will contact you only when there is a genuine fit."
              />
              <Reveal delay={0.2} className="mt-10">
                <ul className="space-y-4 border-t border-line pt-8">
                  {[
                    'We never contact your current employer.',
                    'Your profile is shared with a client only after you approve that specific role.',
                    'You can ask us to delete your record at any time.',
                  ].map((point) => (
                    <li key={point} className="flex gap-3 text-body-md text-copy-muted">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 size-1 shrink-0 rounded-full bg-amber"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <div className="rounded-md border border-line bg-white p-8 shadow-level1 md:p-10">
                <TalentProfileForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="section bg-white">
        <Container>
          <SectionHeading
            eyebrow="Candidate services"
            title="What you get from working with **us**"
            description="Representation, not a database entry."
          />

          <Stagger className="mt-16 grid gap-6 md:grid-cols-3">
            {candidateServices.map((service) => (
              <StaggerItem key={service.title}>
                <article className="h-full rounded-md border border-line bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-level2">
                  <span className="flex size-12 items-center justify-center rounded-full bg-ink/[0.04]">
                    <Icon name={service.icon} className="size-5 text-ink" />
                  </span>
                  <h3 className="mt-6 text-head-sm text-ink">{service.title}</h3>
                  <p className="mt-3 text-body-md text-copy-muted">
                    {service.description}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <CTASection
        eyebrow="Stay close"
        title="Not looking right **now**?"
        description="Join the network anyway. The best mandates arrive with three weeks' notice, and we can only call people we already know."
        primary={{ label: 'Submit your profile', href: '#submit' }}
        secondary={{ label: 'Browse open roles', href: '/jobs' }}
      />
    </>
  );
}
