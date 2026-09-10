import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { CTASection } from '@/components/sections/CTASection';
import { TeamGrid } from '@/components/sections/TeamGrid';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema-org';
import { buildMetadata } from '@/lib/seo';
import { team } from '@/content/site';

const trail = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/who-we-are' },
  { name: 'Our Team', path: '/our-team' },
];

export const metadata: Metadata = buildMetadata({
  title: 'Our Team',
  description:
    'Meet the people behind eMilestones — a relationship-driven, technology-enabled talent solutions team working across India, the Gulf and Kenya.',
  path: '/our-team',
});

export default function OurTeamPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <PageHero
        eyebrow="Leadership"
        title="The minds behind **eMilestones**"
        description="A small, senior team — founder-led, and closely involved in every mandate rather than handing it off to a database."
        trail={trail}
      />

      <section className="section bg-white">
        <Container>
          <SectionHeading
            eyebrow="Our leadership"
            title="The people behind every **mandate**"
            description="Recruitment, delivery and partnerships, led by people who stay close to the client relationship end to end. Click a profile for the full picture."
          />

          <TeamGrid team={team} />
        </Container>
      </section>

      <CTASection
        eyebrow="Join us"
        title="Join our **team**"
        description="We are always looking for exceptional individuals who share our commitment to excellence, integrity and impactful leadership."
        primary={{ label: 'Explore opportunities', href: '/careers' }}
        secondary={{ label: 'Life at eMilestones', href: '/employee-engagement' }}
      />
    </>
  );
}
