import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { ValueGrid } from '@/components/sections/ValueGrid';
import { StatsBand } from '@/components/sections/StatsBand';
import { CTASection } from '@/components/sections/CTASection';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/motion/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema-org';
import { buildMetadata } from '@/lib/seo';
import { pillars, whoWeAreStats } from '@/content/site';

const trail = [
  { name: 'Home', path: '/' },
  { name: 'Who We Are', path: '/who-we-are' },
];

export const metadata: Metadata = buildMetadata({
  title: 'Who We Are',
  description:
    'eMilestones Executive Search connects visionary organizations with elite executive talent, driving transformation at the highest levels of global business.',
  path: '/who-we-are',
});

export default function WhoWeArePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <PageHero
        eyebrow="About us"
        title="Forging the future of **leadership**"
        description="We specialize in connecting visionary organizations with elite executive talent, driving transformation at the highest levels of global business."
        trail={trail}
      />

      <section className="section bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-24">
            <SectionHeading
              eyebrow="Our heritage"
              title="A legacy of precision and **partnership**"
            />
            <Reveal delay={0.15} className="space-y-6 text-body-lg text-copy-muted">
              <p>
                Founded on the principles of discretion, insight and unyielding quality,
                eMilestones was established to address a critical gap in top-tier executive
                recruitment. We believe leadership is the ultimate lever for
                organizational success.
              </p>
              <p>
                Our approach combines the analytical rigor of premier consultancies with
                the personalized touch of a boutique advisory firm. We do not simply fill
                roles; we align human potential with strategic ambition.
              </p>
              <p className="border-l-2 border-amber pl-6 font-display text-head-sm text-ink">
                Every mandate is led by a partner, from the first scoping conversation to
                the twelve-month review.
              </p>
              <p>
                That model limits how many searches we can run at once. It is the
                constraint the whole firm is built around, and the reason our clients meet
                the same people at week one and week fifty.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <StatsBand items={whoWeAreStats} />

      <ValueGrid
        eyebrow="Our principles"
        title="The pillars of **our practice**"
        description="The core tenets that guide every engagement, ensuring absolute alignment and exceptional outcomes."
        items={pillars}
        background="subtle"
      />

      <CTASection
        title="Ready to shape the future of your **organization**?"
        description="Engage our services, or put your name in front of the partners who run our searches."
        primary={{ label: 'Engage our services', href: '/contact' }}
        secondary={{ label: 'Submit your resume', href: '/for-talent#submit' }}
      />
    </>
  );
}
