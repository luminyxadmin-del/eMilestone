import { HomeHero } from '@/components/sections/HomeHero';
import { StatsBand } from '@/components/sections/StatsBand';
import { LogoMarquee } from '@/components/sections/LogoMarquee';
import { BentoDifference } from '@/components/sections/BentoDifference';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { SectorShowcase } from '@/components/sections/SectorShowcase';
import { ClientOutcomes } from '@/components/sections/ClientOutcomes';
import { Testimonials } from '@/components/sections/Testimonials';
import { RecruiterComparison } from '@/components/sections/RecruiterComparison';
import { CTASection } from '@/components/sections/CTASection';

export const revalidate = 600;

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <StatsBand />
      <LogoMarquee />
      <BentoDifference />
      <ServicesGrid background="white" />
      <SectorShowcase />
      <ClientOutcomes />
      <RecruiterComparison />
      <Testimonials />
      <CTASection
        eyebrow="Next step"
        title="Ready to build your **leadership team?**"
        description="Tell us about the mandate. A partner will respond within one business day."
        primary={{ label: 'Start a search', href: '/for-employers' }}
        secondary={{ label: 'Join the network', href: '/for-talent' }}
      />
    </>
  );
}
