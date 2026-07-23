import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { ValueGrid } from '@/components/sections/ValueGrid';
import { SectorGrid } from '@/components/sections/SectorGrid';
import { FaqSection } from '@/components/sections/FaqSection';
import { CTASection } from '@/components/sections/CTASection';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, faqSchema } from '@/lib/schema-org';
import { buildMetadata } from '@/lib/seo';
import { employerBenefits, engagementModel, employerFaqs } from '@/content/site';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const trail = [
  { name: 'Home', path: '/' },
  { name: 'For Employers', path: '/for-employers' },
];

export const metadata: Metadata = buildMetadata({
  title: 'For Employers',
  description:
    'We help premier organizations identify, attract and retain the visionary leaders who drive transformative growth. Bespoke retained executive search.',
  path: '/for-employers',
});

export default function ForEmployersPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(trail), faqSchema(employerFaqs)]} />
      <PageHero
        eyebrow="For employers"
        title="Partnering for **performance**"
        description="We help premier organizations identify, attract and retain the visionary leaders who drive transformative growth. Our bespoke methodology ensures alignment with your strategic objectives and cultural nuances."
        trail={trail}
      >
        <Button asChild size="lg" variant="accent">
          <Link href="/contact">
            Partner with us
            <ArrowRight />
          </Link>
        </Button>
      </PageHero>

      <ValueGrid
        eyebrow="Benefits of partnership"
        title="Why industry leaders choose **eMilestones**"
        description="For their most critical appointments, boards want the same four things. Here is how we deliver them."
        items={employerBenefits}
        columns={4}
        background="subtle"
      />

      <SectorGrid showRoles={false} />

      <ValueGrid
        eyebrow="How it works"
        title="The engagement **model**"
        description="What you are actually buying when you retain us — not the search steps, the commercial terms behind them."
        items={engagementModel}
        columns={3}
      />

      <FaqSection
        items={employerFaqs}
        eyebrow="Employer FAQs"
        title="Guarantees, confidentiality and **billing**"
        description="What clients ask before signing an engagement letter."
      />

      <CTASection
        title="Identify your next **leader**"
        description="Begin the conversation about your organization's future. Schedule a confidential consultation with our senior partners."
        primary={{ label: 'Partner with us', href: '/contact' }}
        secondary={{ label: 'Why eMilestones', href: '/why-us' }}
      />
    </>
  );
}
