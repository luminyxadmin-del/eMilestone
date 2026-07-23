import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { ValueGrid } from '@/components/sections/ValueGrid';
import { CTASection } from '@/components/sections/CTASection';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema-org';
import { buildMetadata } from '@/lib/seo';
import { cultureValues, developmentPrograms } from '@/content/site';

const trail = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/who-we-are' },
  { name: 'Employee Engagement', path: '/employee-engagement' },
];

export const metadata: Metadata = buildMetadata({
  title: 'Employee Engagement',
  description:
    'Our commitment extends beyond placement. We foster continuous growth, intellectual rigor and professional development for our internal team.',
  path: '/employee-engagement',
});

export default function EmployeeEngagementPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <PageHero
        eyebrow="Life at eMilestones"
        title="Cultivating elite **potential**"
        description="Our commitment extends beyond placement. We foster an environment of continuous growth, intellectual rigor and unparalleled professional development for our internal team."
        trail={trail}
      >
        <Button asChild size="lg" variant="accent">
          <Link href="/careers">
            Explore careers
            <ArrowRight />
          </Link>
        </Button>
      </PageHero>

      <ValueGrid
        eyebrow="Culture and values"
        title="The pillars that define our daily **operations**"
        description="Three commitments that shape how we work with each other, not just with clients."
        items={cultureValues}
      />

      <section className="section bg-surface-subtle">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
            <SectionHeading
              eyebrow="Professional development"
              title="We invest heavily in continuous **education**"
              description="From deep-dive industry seminars to executive coaching certifications, our team is equipped with the insight required to guide C-suite decisions."
            />

            <Stagger className="space-y-4">
              {developmentPrograms.map((program) => (
                <StaggerItem key={program.title}>
                  <article className="flex gap-4 rounded-md border border-line bg-white p-6 transition-all duration-500 hover:shadow-level1">
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-amber-deep"
                    />
                    <div>
                      <h3 className="text-body-lg font-semibold text-ink">
                        {program.title}
                      </h3>
                      <p className="mt-1 text-body-md text-copy-muted">
                        {program.description}
                      </p>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal delay={0.2} className="mt-20">
            <div className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-3">
              {[
                { value: '92%', label: 'Consultant retention, three-year average' },
                { value: '40 hrs', label: 'Funded training per person, per year' },
                { value: '4 days', label: 'Paid volunteering leave annually' },
              ].map((item) => (
                <div key={item.label} className="bg-white p-8">
                  <p className="font-display text-head-md text-ink">{item.value}</p>
                  <p className="mt-2 text-label-md text-copy-muted">{item.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <CTASection
        eyebrow="Careers"
        title="Build your career **here**"
        description="We hire consultants who have operated in the sectors they recruit for. If that sounds like you, we should talk."
        primary={{ label: 'See open roles', href: '/careers' }}
        secondary={{ label: 'Meet the team', href: '/our-team' }}
      />
    </>
  );
}
