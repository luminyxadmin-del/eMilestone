import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { CTASection } from '@/components/sections/CTASection';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { Reveal } from '@/components/motion/Reveal';
import { Icon } from '@/lib/icon';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema-org';
import { buildMetadata } from '@/lib/seo';
import { csrPillars, csrInitiatives } from '@/content/site';

const trail = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/who-we-are' },
  { name: 'CSR Activities', path: '/csr' },
];

export const metadata: Metadata = buildMetadata({
  title: 'CSR Activities',
  description:
    'Our commitment to sustainable impact, community stewardship, and shaping a future where leadership drives meaningful change.',
  path: '/csr',
});

export default function CsrPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <PageHero
        eyebrow="Responsibility"
        title="Beyond executive **search**"
        description="Our commitment to sustainable impact, community stewardship, and shaping a future where leadership drives meaningful change."
        trail={trail}
      />

      <section className="section bg-white">
        <Container>
          <SectionHeading
            eyebrow="Corporate social responsibility"
            title="Two commitments we **report on**"
            description="We publish what we measure, and we only claim what we can evidence."
          />

          <Stagger className="mt-16 grid gap-6 lg:grid-cols-2">
            {csrPillars.map((pillar) => (
              <StaggerItem key={pillar.title}>
                <article className="flex h-full flex-col rounded-md border border-line bg-white p-10 transition-all duration-500 hover:shadow-level2">
                  <span className="flex size-12 items-center justify-center rounded-full bg-amber/15">
                    <Icon name={pillar.icon} className="size-5 text-amber-deep" />
                  </span>
                  <h3 className="mt-8 text-head-sm text-ink">{pillar.title}</h3>
                  <p className="mt-4 flex-1 text-body-md text-copy-muted">
                    {pillar.description}
                  </p>
                  <div className="mt-8 border-t border-line pt-6">
                    <p className="font-display text-head-md text-ink">
                      {pillar.metric.value}
                    </p>
                    <p className="mt-1 text-label-md text-copy-muted">
                      {pillar.metric.label}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="section bg-surface-subtle">
        <Container>
          <SectionHeading
            eyebrow="What comes next"
            title="Future **initiatives**"
            description="Two programmes we are building toward, with dates attached so you can hold us to them."
          />

          <Stagger className="mt-16 grid gap-6 md:grid-cols-2">
            {csrInitiatives.map((initiative) => (
              <StaggerItem key={initiative.title}>
                <article className="group h-full rounded-md border border-line bg-white p-10 transition-all duration-500 hover:-translate-y-1 hover:shadow-level2">
                  <Icon name={initiative.icon} className="size-6 text-amber-deep" />
                  <h3 className="mt-6 text-head-sm text-ink">{initiative.title}</h3>
                  <p className="mt-3 text-body-md text-copy-muted">
                    {initiative.description}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.2} className="mt-14">
            <p className="max-w-2xl border-l-2 border-amber pl-6 font-display text-head-sm text-ink">
              Leadership is the lever. If we place the people who set the agenda, we carry
              some of the responsibility for what that agenda contains.
            </p>
          </Reveal>
        </Container>
      </section>

      <CTASection
        eyebrow="Get involved"
        title="Work with a firm that measures more than **placements**"
        description="Ask us about our diversity slate commitments before you brief a search."
        primary={{ label: 'Talk to a partner', href: '/contact' }}
        secondary={{ label: 'Life at eMilestones', href: '/employee-engagement' }}
      />
    </>
  );
}
