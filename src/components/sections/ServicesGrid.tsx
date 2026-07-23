'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { SectionGlow } from '@/components/ui/section-glow';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { Reveal } from '@/components/motion/Reveal';
import { Icon } from '@/lib/icon';
import { services } from '@/content/site';
import { cn } from '@/lib/utils';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const GLOW_POSITION: Record<number, string> = {
  0: '-top-16 right-0',
  1: 'top-1/3 -right-10',
  2: '-bottom-16 right-0',
};

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
          <ServicesInteractive />
        )}
      </Container>
    </section>
  );
}

// Direction-aware 3D flip: exit direction must reflect the switch that is
// happening NOW, not whichever direction was current when the exiting panel
// was first rendered — hence `custom` on both AnimatePresence and the exit
// variant, per Framer Motion's own pattern for directional transitions.
const flipVariants = {
  enter: (direction: 1 | -1) => ({ opacity: 0, rotateY: direction * 90 }),
  center: { opacity: 1, rotateY: 0 },
  exit: (direction: 1 | -1) => ({ opacity: 0, rotateY: direction * -90 }),
};

// A two-column tab pair: the three services on the left select which
// service's detail (pulled straight from `services[].detail/outcomes`)
// renders in the dark panel on the right — no content is repeated between
// the two columns, and none of it overlaps the process rail or the
// recruiter-comparison rows elsewhere on the page.
function ServicesInteractive() {
  const [{ index: active, direction }, setState] = useState<{
    index: number;
    direction: 1 | -1;
  }>({ index: 0, direction: 1 });
  const reduce = useReducedMotion();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeService = services[active];

  const goTo = (index: number) => {
    setState((prev) =>
      index === prev.index ? prev : { index, direction: index > prev.index ? 1 : -1 },
    );
  };

  const focusTab = (index: number) => {
    goTo(index);
    tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      focusTab((index + 1) % services.length);
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      focusTab((index - 1 + services.length) % services.length);
    } else if (event.key === 'Home') {
      event.preventDefault();
      focusTab(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      focusTab(services.length - 1);
    }
  };

  return (
    // `items-stretch` (the grid default, made explicit) is what keeps the
    // dark panel's top level with the heading and its bottom level with the
    // last service item — both columns fill the same row height.
    <div className="mt-10 grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal delay={0.1}>
        <div>
          <SectionHeading
            eyebrow="What we do"
            title="Three ways we build **leadership teams**"
            description="Comprehensive talent solutions tailored to the demands of modern enterprise leadership."
          />

          <div
            role="tablist"
            aria-label="Our services"
            aria-orientation="vertical"
            className="mt-10 lg:pr-2"
          >
            {services.map((service, index) => {
              const isActive = index === active;
              return (
                <button
                  key={service.slug}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`service-tab-${service.slug}`}
                  aria-selected={isActive}
                  aria-controls={`service-panel-${service.slug}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => goTo(index)}
                  onMouseEnter={() => goTo(index)}
                  onFocus={() => goTo(index)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                  className={cn(
                    'group relative flex w-full items-center gap-5 rounded-md py-6 pl-6 pr-4 text-left transition-colors duration-300 ease-out',
                    index !== services.length - 1 && 'border-b border-line',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="service-active-marker"
                      transition={
                        reduce
                          ? { duration: 0.01 }
                          : { type: 'spring', stiffness: 380, damping: 32 }
                      }
                      className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-amber"
                    />
                  )}
                  <span
                    className={cn(
                      'flex size-11 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ease-out',
                      isActive ? 'bg-amber/15' : 'bg-ink/[0.04] group-hover:bg-amber/10',
                    )}
                  >
                    <Icon
                      name={service.icon}
                      className={cn(
                        'size-5 transition-colors duration-300 ease-out',
                        isActive ? 'text-amber-deep' : 'text-ink',
                      )}
                    />
                  </span>
                  <div className="min-w-0">
                    <h3
                      className={cn(
                        'text-head-sm transition-colors duration-300 ease-out',
                        isActive ? 'text-ink' : 'text-copy-muted',
                      )}
                    >
                      {service.title}
                    </h3>
                    <p className="mt-1 text-body-md text-copy-faint">{service.summary}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* The dark panel: entrance reveal fires once on scroll-in; the
          content inside flips per active tab via its own AnimatePresence,
          independent of the outer reveal. Stretches to the left column's
          full height via `items-stretch` above, so it never resizes when
          the active service — and therefore its content length — changes. */}
      <Reveal
        distance={20}
        duration={0.6}
        delay={0.15}
        className="relative overflow-hidden rounded-lg border border-white/10 bg-ink shadow-level2 lg:min-h-[28rem]"
      >
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute size-72 rounded-full bg-amber/10 blur-3xl transition-[top,bottom] duration-700 ease-out',
            GLOW_POSITION[active],
          )}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px]"
        />

        <div
          role="tabpanel"
          id={`service-panel-${activeService.slug}`}
          aria-labelledby={`service-tab-${activeService.slug}`}
          className="relative flex h-full flex-col justify-center p-8 md:p-12"
          style={reduce ? undefined : { perspective: 1400 }}
        >
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={activeService.slug}
              custom={direction}
              variants={reduce ? undefined : flipVariants}
              initial={reduce ? { opacity: 0 } : 'enter'}
              animate={reduce ? { opacity: 1 } : 'center'}
              exit={reduce ? { opacity: 0 } : 'exit'}
              transition={{ duration: reduce ? 0.01 : 0.6, ease: EASE_OUT }}
              style={
                reduce
                  ? undefined
                  : { transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }
              }
            >
              <div className="flex items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-amber/15">
                  <Icon name={activeService.icon} className="size-5 text-amber" />
                </span>
                <h3 className="font-display text-head-md text-white">
                  {activeService.title}
                </h3>
              </div>

              <p className="mt-6 text-body-lg text-white/70">{activeService.detail}</p>

              <ul className="mt-8 space-y-3 border-t border-white/10 pt-6">
                {activeService.outcomes.map((outcome, index) => (
                  <motion.li
                    key={outcome}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduce ? 0.01 : 0.4,
                      delay: reduce ? 0 : 0.6 + index * 0.09,
                      ease: EASE_OUT,
                    }}
                    className="flex items-start gap-3 text-body-md text-white/70"
                  >
                    <motion.span
                      aria-hidden="true"
                      initial={reduce ? { scale: 1 } : { scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={
                        reduce
                          ? { duration: 0.01 }
                          : {
                              type: 'spring',
                              stiffness: 420,
                              damping: 20,
                              delay: 0.65 + index * 0.09,
                            }
                      }
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber"
                    />
                    {outcome}
                  </motion.li>
                ))}
              </ul>

              <Link
                href="/services"
                className="group/cta mt-8 inline-flex items-center gap-2 text-label-md font-medium text-amber transition-colors duration-300 hover:text-amber-soft"
              >
                {activeService.cta}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1"
                />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </div>
  );
}
