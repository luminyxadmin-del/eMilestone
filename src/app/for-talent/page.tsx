import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { CTASection } from '@/components/sections/CTASection';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { TalentProfileForm } from '@/components/forms/TalentProfileForm';
import { Icon } from '@/lib/icon';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema-org';
import { buildMetadata } from '@/lib/seo';
import { candidateProcessSteps, candidateServices } from '@/content/site';

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

      <ProcessTimeline
        eyebrow="How it works"
        title="From introduction to **offer**"
        description="Most of the mandates we run are confidential and never get advertised — this is how we match you to them without either of you appearing anywhere public."
        steps={candidateProcessSteps}
      />

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
