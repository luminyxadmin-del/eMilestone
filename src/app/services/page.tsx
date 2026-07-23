import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { FaqSection } from '@/components/sections/FaqSection';
import { CTASection } from '@/components/sections/CTASection';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, faqSchema } from '@/lib/schema-org';
import { buildMetadata } from '@/lib/seo';
import { servicesFaqs } from '@/content/site';

const trail = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
];

export const metadata: Metadata = buildMetadata({
  title: 'Services',
  description:
    'Precision-engineered talent acquisition: retained executive search, lateral hiring and recruitment consulting for organizations building leadership teams.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(trail), faqSchema(servicesFaqs)]} />
      <PageHero
        eyebrow="What we do"
        title="Tailored recruitment **solutions**"
        description="Precision-engineered talent acquisition. We connect visionary organizations with exceptional leaders who drive transformative growth."
        trail={trail}
      />

      <ServicesGrid detailed />

      {/* Services is the primary home for the methodology — every other
          page that used to repeat this timeline now links back here. */}
      <ProcessTimeline
        eyebrow="Our methodology"
        title="How every mandate **runs**"
        description="The same five stages behind every engagement we scope, whichever of the three services above it falls under."
      />

      <FaqSection
        items={servicesFaqs}
        eyebrow="Service FAQs"
        title="Choosing the right **engagement**"
        description="Which service fits your mandate, and how each one is billed."
      />

      <CTASection
        title="Ready to transform your **leadership**?"
        description="Engage our partners to discuss your strategic talent requirements."
        primary={{ label: 'Partner with us', href: '/contact' }}
        secondary={{ label: 'View our expertise', href: '/expertise' }}
      />
    </>
  );
}
