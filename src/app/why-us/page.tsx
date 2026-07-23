import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { ValueGrid } from '@/components/sections/ValueGrid';
import { Testimonials } from '@/components/sections/Testimonials';
import { CTASection } from '@/components/sections/CTASection';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema-org';
import { buildMetadata } from '@/lib/seo';
import { advantages, whyUsTestimonials } from '@/content/site';

const trail = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/who-we-are' },
  { name: 'Why Us', path: '/why-us' },
];

export const metadata: Metadata = buildMetadata({
  title: 'Why Us',
  description:
    'Precision, discretion and a relentless pursuit of excellence. Why industry leaders trust eMilestones with their most critical executive appointments.',
  path: '/why-us',
});

export default function WhyUsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <PageHero
        eyebrow="The advantage"
        title="The case for working with **us**"
        description="We do not just find candidates; we discover the architects of your company's next great era. Our approach is rooted in uncompromising standards and deep industry intelligence."
        trail={trail}
      />

      <ValueGrid
        eyebrow="The eMilestones advantage"
        title="Four reasons boards call **us first**"
        description="Precision, discretion and a relentless pursuit of excellence — here is what that means in practice."
        items={advantages}
        columns={4}
      />

      <Testimonials items={whyUsTestimonials} />

      <CTASection
        title="Put us on your most difficult **search**"
        description="Bring us the appointment you have already tried to fill. That is the one where the difference shows."
        primary={{ label: 'Start a conversation', href: '/contact' }}
        secondary={{ label: 'See our expertise', href: '/expertise' }}
      />
    </>
  );
}
