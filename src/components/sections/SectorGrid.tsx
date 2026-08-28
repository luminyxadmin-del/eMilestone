'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { Icon } from '@/lib/icon';
import { sectors } from '@/content/site';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

interface SectorGridProps {
  showRoles?: boolean;
  /** Renders each sector's deeper `detail` copy and an anonymized
   *  `examplePlacement` — reserved for the page that owns sector depth.
   *  Also switches the card treatment to the premium variant, since this
   *  is currently only ever used by the Expertise page's full 16-sector
   *  grid, not the lighter-weight grid elsewhere (e.g. For Employers). */
  detailed?: boolean;
  eyebrow?: string;
  title?: string;
  description?: string;
}

export function SectorGrid({
  showRoles = true,
  detailed = false,
  eyebrow = 'Practice areas',
  title = 'Sectors of **focus**',
  description = 'Our consultants bring operating experience, not just search experience, to each of these markets.',
}: SectorGridProps) {
  const reduce = useReducedMotion();

  return (
    <section className="section bg-white">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        {detailed ? (
          <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector, index) => (
              <StaggerItem key={sector.slug}>
                <article className="card-premium group relative flex h-full flex-col p-8 hover:border-amber/30 md:p-10">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber/[0.08] via-transparent to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                  />

                  <div className="relative flex h-full flex-col">
                    <motion.span
                      initial={reduce ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{
                        duration: reduce ? 0.01 : 0.5,
                        delay: reduce ? 0 : 0.1 + (index % 6) * 0.06,
                        ease: EASE_OUT,
                      }}
                      className="flex size-11 items-center justify-center rounded-full bg-amber/10 ring-1 ring-amber/10 transition-all duration-500 ease-out group-hover:scale-105 group-hover:bg-amber/20 group-hover:ring-amber/30"
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
                    <p className="mt-3 flex-1 text-body-md text-copy-muted">
                      {sector.detail ?? sector.description}
                    </p>

                    {showRoles && (
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {sector.roles.map((role) => (
                          <li
                            key={role}
                            className="rounded-full border border-line px-3 py-1 text-label-md text-copy-muted transition-colors duration-300 ease-out group-hover:border-amber/25 group-hover:text-ink"
                          >
                            {role}
                          </li>
                        ))}
                      </ul>
                    )}

                    {sector.examplePlacement && (
                      <p className="mt-6 rounded-md border border-line bg-surface-subtle p-4 text-label-md text-copy-muted transition-colors duration-300 ease-out group-hover:border-amber/20 group-hover:bg-amber/[0.04]">
                        <span className="font-medium text-ink">Recent placement — </span>
                        {sector.examplePlacement}
                      </p>
                    )}
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <Stagger className="mt-16 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector) => (
              <StaggerItem key={sector.slug}>
                <article className="group flex h-full flex-col bg-white p-8 transition-colors duration-500 hover:bg-surface-subtle md:p-10">
                  <span className="flex size-11 items-center justify-center rounded-full border border-line bg-white">
                    <Icon
                      name={sector.icon}
                      className="size-5 text-ink transition-colors duration-500 group-hover:text-amber-deep"
                    />
                  </span>
                  <h3 className="mt-6 text-head-sm text-ink">{sector.name}</h3>
                  <p className="mt-3 flex-1 text-body-md text-copy-muted">
                    {sector.description}
                  </p>

                  {showRoles && (
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {sector.roles.map((role) => (
                        <li
                          key={role}
                          className="rounded-full border border-line px-3 py-1 text-label-md text-copy-muted"
                        >
                          {role}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </Container>
    </section>
  );
}
