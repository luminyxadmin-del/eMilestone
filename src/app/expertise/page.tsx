import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { SectorGrid } from '@/components/sections/SectorGrid';
import { StatsBand } from '@/components/sections/StatsBand';
import { CTASection } from '@/components/sections/CTASection';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema-org';
import { buildMetadata } from '@/lib/seo';
import { expertiseStats } from '@/content/site';

const trail = [
  { name: 'Home', path: '/' },
  { name: 'Expertise', path: '/expertise' },
];

export const metadata: Metadata = buildMetadata({
  title: 'Expertise',
  description:
    'Deep industry expertise across technology, healthcare, financial services, consumer and retail, industrial and energy sectors.',
  path: '/expertise',
});

export default function ExpertisePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <PageHero
        eyebrow="Practice areas"
        title="Deep industry **expertise**"
        description="Navigating complex market landscapes with specialized insight across key global sectors. Our consultants bring decades of operational experience to identify elite leadership capable of driving transformational growth."
        trail={trail}
      />

      <SectorGrid
        detailed
        eyebrow="Practice areas"
        title="16 sectors, one standard of **excellence**"
        description="What we look for in each market, and a recent placement that shows it in practice."
      />
      <StatsBand items={expertiseStats} />

      <CTASection
        title="Talk to the partner who covers your **market**"
        description="Tell us the sector and the seat, and we will put you in front of the person who has recruited for it before."
        primary={{ label: 'Contact a partner', href: '/contact' }}
        secondary={{ label: 'See our services', href: '/services' }}
      />
    </>
  );
}
