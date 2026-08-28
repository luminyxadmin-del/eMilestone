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
              title="Every great journey is remembered by its **milestones.**"
            />
            <Reveal delay={0.15} className="space-y-6 text-body-lg text-copy-muted">
              <p>
                For thousands of years, milestones stood quietly along the world&apos;s roads.
                They did more than measure distance. They reminded travellers how far they
                had come, reassured them they were on the right path, and gave them
                confidence that their destination was within reach.
              </p>
              <p className="border-l-2 border-amber pl-6 font-display text-head-sm text-ink">
                The most meaningful journeys are still measured the same way.
              </p>
              <p>
                Businesses are shaped by milestones—a new market entered, a transformative
                leader hired, a team built for the future. Careers are defined by milestones
                too—a first opportunity, a leadership role, a bold move across borders, or
                the chance to create a lasting impact.
              </p>
              <p>
                At Emilestones, we believe every appointment is one of those defining
                moments. Every successful placement is more than a role filled; it is a
                milestone that changes the trajectory of an organisation and the life of a
                professional.
              </p>
              <p className="border-l-2 border-amber pl-6 font-display text-head-sm text-ink">
                Across India, the Gulf and Africa, we help businesses and talent move
                forward with confidence, creating milestones that lead to enduring success.
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
