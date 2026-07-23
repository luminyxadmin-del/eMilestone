import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { team } from '@/content/site';

export function PartnersPreview() {
  return (
    <section className="section border-t border-line bg-warm-tint">
      <Container>
        <SectionHeading
          eyebrow="Leadership"
          title="Partners, not **account managers**"
          description="Three practice leaders, each with operating experience in the sector they now recruit for."
        />

        <Stagger className="mt-16 grid gap-6 lg:grid-cols-3">
          {team.map((member) => (
            <StaggerItem key={member.slug}>
              <Link
                href="/our-team"
                className="card-premium group flex h-full flex-col p-8 md:p-10"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex size-16 items-center justify-center rounded-full bg-ink font-display text-head-sm text-white ring-2 ring-transparent transition-all duration-500 ease-out group-hover:scale-105 group-hover:ring-amber/40">
                    {member.initials}
                  </span>
                  <Badge variant="accent">{member.focus}</Badge>
                </div>

                <h3 className="mt-8 text-head-sm text-ink">{member.name}</h3>
                <p className="mt-1 text-label-md text-copy-muted">{member.role}</p>

                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
                  <p className="overflow-hidden text-body-md text-copy-muted opacity-0 transition-opacity duration-500 line-clamp-2 group-hover:mt-4 group-hover:opacity-100">
                    {member.bio}
                  </p>
                </div>

                <span className="mt-8 inline-flex items-center gap-2 text-label-md font-medium text-ink transition-colors group-hover:text-amber-deep">
                  View profile
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/our-team">
              Meet the full team
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
