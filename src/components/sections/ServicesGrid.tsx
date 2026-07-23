import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { SectionGlow } from '@/components/ui/section-glow';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { Parallax } from '@/components/motion/Parallax';
import { Icon } from '@/lib/icon';
import { services, homeImagery } from '@/content/site';
import { cn } from '@/lib/utils';

interface ServicesGridProps {
  detailed?: boolean;
  background?: 'white' | 'subtle';
}

export function ServicesGrid({ detailed = false, background = 'subtle' }: ServicesGridProps) {
  return (
    <section
      className={cn(
        'section relative overflow-hidden border-t border-line',
        background === 'white' ? 'bg-warm-tint' : 'bg-surface-subtle',
      )}
    >
      {background !== 'white' && <SectionGlow />}
      <Container className="relative">
        {detailed ? (
          <>
            <SectionHeading
              eyebrow="What we do"
              title="Three ways we build **leadership teams**"
              description="Comprehensive talent solutions tailored to the demands of modern enterprise leadership."
            />

            <Stagger className="mt-16 grid gap-6 lg:grid-cols-3">
              {services.map((service) => (
                <StaggerItem key={service.slug}>
                  <article className="card-premium group flex h-full flex-col p-8 md:p-10">
                    <span className="flex size-14 items-center justify-center rounded-full bg-ink/[0.04] transition-colors duration-500 ease-out group-hover:bg-amber/15">
                      <Icon
                        name={service.icon}
                        className="size-5 text-ink transition-colors duration-500 ease-out group-hover:text-amber-deep"
                      />
                    </span>

                    <h3 className="mt-8 text-head-sm text-ink">{service.title}</h3>
                    <p className="mt-4 flex-1 text-body-md text-copy-muted">
                      {service.detail}
                    </p>

                    <ul className="mt-6 space-y-2 border-t border-line pt-6">
                      {service.outcomes.map((outcome) => (
                        <li
                          key={outcome}
                          className="flex items-start gap-3 text-label-md text-copy-muted"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 size-1 shrink-0 rounded-full bg-amber"
                          />
                          {outcome}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/services"
                      className="mt-8 inline-flex items-center gap-2 text-label-md font-medium text-ink transition-colors hover:text-amber-deep"
                    >
                      {service.cta}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </>
        ) : (
          // A single two-column band: intro + services on the left, one
          // tasteful photograph on the right, given a slow parallax drift
          // as the section scrolls into view.
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="What we do"
                title="Three ways we build **leadership teams**"
                description="Comprehensive talent solutions tailored to the demands of modern enterprise leadership."
              />

              <Stagger className="mt-10">
                {services.map((service) => (
                  <StaggerItem key={service.slug}>
                    <div className="group flex gap-5 border-b border-line py-6 first:pt-0 last:border-b-0 last:pb-0">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-ink/[0.04] transition-colors duration-500 ease-out group-hover:bg-amber/15">
                        <Icon
                          name={service.icon}
                          className="size-5 text-ink transition-colors duration-500 ease-out group-hover:text-amber-deep"
                        />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-head-sm text-ink">{service.title}</h3>
                        <p className="mt-2 text-body-md text-copy-muted">
                          {service.summary}
                        </p>
                        <Link
                          href="/services"
                          className="mt-3 inline-flex items-center gap-2 text-label-md font-medium text-ink transition-colors hover:text-amber-deep"
                        >
                          {service.cta}
                          <ArrowRight
                            aria-hidden="true"
                            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </Link>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-level1 lg:aspect-auto lg:min-h-[28rem]">
              <Parallax speed={0.08} className="absolute inset-[-10%]">
                <div className="absolute inset-0">
                  <Image
                    src={homeImagery.services.src}
                    alt={homeImagery.services.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Parallax>
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/35 to-transparent"
              />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
