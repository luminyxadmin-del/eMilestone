'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/section-heading';
import { SectionGlow } from '@/components/ui/section-glow';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { Icon } from '@/lib/icon';
import { sectors } from '@/content/site';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/**
 * A hover-driven preview of practice areas: the roles list stays collapsed
 * until the card is engaged, so the grid reads clean at rest and rewards
 * exploration rather than dumping every detail up front. The icon chip is
 * warm even before interaction, so the grid doesn't read as a flat, neutral
 * list until someone hovers.
 */
export function SectorShowcase() {
  const reduce = useReducedMotion();

  return (
    <section className="section relative overflow-hidden border-t border-line bg-surface-subtle">
      <SectionGlow />
      <Container className="relative">
        <SectionHeading
          eyebrow="Where we place leaders"
          title="Specialist sectors, one standard of **rigor**"
          description="Hover a sector to see the roles our consultants place most often within it."
        />

        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.slice(0, 6).map((sector, index) => (
            <StaggerItem key={sector.slug}>
              <motion.article
                whileHover={reduce ? undefined : { y: -8 }}
                transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                className="card-premium group relative flex h-full flex-col p-8 hover:border-amber/30"
              >
                {/* Warm wash, fades in on hover — reads as ambient depth, not decoration */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber/[0.08] via-transparent to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                />

                <div className="relative flex h-full flex-col">
                  <span
                    aria-hidden="true"
                    className="absolute right-0 top-0 font-display text-label-sm tabular-nums text-copy-faint transition-colors duration-500 ease-out group-hover:text-amber-deep"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <motion.span
                    initial={{ scale: 0.7, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{
                      duration: reduce ? 0.01 : 0.5,
                      delay: reduce ? 0 : 0.15 + index * 0.06,
                      ease: EASE_OUT,
                    }}
                    className="flex size-12 items-center justify-center rounded-full bg-amber/10 ring-1 ring-amber/10 transition-all duration-500 ease-out group-hover:scale-105 group-hover:bg-amber/20 group-hover:ring-amber/30"
                  >
                    <Icon
                      name={sector.icon}
                      className="size-5 text-amber-deep transition-colors duration-500 ease-out group-hover:text-amber"
                    />
                  </motion.span>

                  <h3 className="relative mt-6 inline-block w-fit text-head-sm text-ink">
                    {sector.name}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-amber transition-transform duration-500 ease-out group-hover:scale-x-100"
                    />
                  </h3>
                  <p className="mt-3 text-body-md text-copy-muted">{sector.description}</p>

                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
                    <ul className="mt-2 flex flex-wrap gap-2 overflow-hidden transition-[margin-top] duration-500 ease-out group-hover:mt-6">
                      {sector.roles.map((role, roleIndex) => (
                        <li
                          key={role}
                          style={{ transitionDelay: `${roleIndex * 60}ms` }}
                          className="translate-y-1 rounded-full border border-line px-3 py-1 text-label-md text-copy-muted opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100"
                        >
                          {role}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-10 flex justify-center">
          <Button asChild variant="outline" size="md">
            <Link href="/expertise">View all 16 sectors</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
