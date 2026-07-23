import type { Metadata } from 'next';
import { Mail, Linkedin } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { CTASection } from '@/components/sections/CTASection';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Badge } from '@/components/ui/badge';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
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
    'Our team brings decades of C-suite experience and industry-specific insight to every executive search. Meet the partners behind eMilestones.',
  path: '/our-team',
});

export default function OurTeamPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <PageHero
        eyebrow="Leadership"
        title="The minds behind **eMilestones**"
        description="Our team brings decades of C-suite experience and industry-specific insight to every executive search. We do not just find talent; we build legacies."
        trail={trail}
      />

      <section className="section bg-white">
        <Container>
          <SectionHeading
            eyebrow="Our leadership"
            title="Practice leaders who have held the **seat**"
            description="Each partner spent a career inside the sector they now recruit for, which is why the assessment conversations go somewhere useful."
          />

          <Stagger className="mt-16 grid gap-6 lg:grid-cols-3">
            {team.map((member) => (
              <StaggerItem key={member.slug}>
                <article className="group flex h-full flex-col rounded-md border border-line bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-level2 md:p-10">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex size-16 items-center justify-center rounded-full bg-ink font-display text-head-sm text-white transition-transform duration-500 group-hover:scale-105">
                      {member.initials}
                    </span>
                    <Badge variant="accent">{member.focus}</Badge>
                  </div>

                  <h3 className="mt-8 text-head-sm text-ink">{member.name}</h3>
                  <p className="mt-1 text-label-md text-copy-muted">{member.role}</p>
                  <p className="mt-5 flex-1 text-body-md text-copy-muted">{member.bio}</p>

                  <div className="mt-8 flex items-center gap-3 border-t border-line pt-6">
                    <a
                      href={`mailto:${member.email}`}
                      aria-label={`Email ${member.name}`}
                      className="flex size-10 items-center justify-center rounded-full border border-line text-copy-muted transition-colors hover:border-ink hover:text-ink"
                    >
                      <Mail aria-hidden="true" className="size-4" />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="flex size-10 items-center justify-center rounded-full border border-line text-copy-muted transition-colors hover:border-ink hover:text-ink"
                    >
                      <Linkedin aria-hidden="true" className="size-4" />
                    </a>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
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
