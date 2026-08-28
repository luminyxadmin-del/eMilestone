'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Icon } from '@/lib/icon';
import { processSteps } from '@/content/site';
import type { ProcessStep } from '@/types';

/**
 * The signature milestone rail. A hairline track runs the height of the
 * section and fills with amber as the reader scrolls, so the visual literally
 * measures progress through a search — which is what the firm is named for.
 * `steps` defaults to the client-facing search process, but the same rail
 * works for any staged sequence (e.g. the candidate-facing join process).
 */
export function ProcessTimeline({
  eyebrow = 'How we work',
  title = 'Our **methodology**',
  description = 'A rigorous, multi-phase approach designed to secure top-tier executive talent — and to tell you exactly where the search stands at any moment.',
  steps = processSteps,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  steps?: ProcessStep[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 65%', 'end 55%'],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section className="section bg-warm-tint">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div ref={ref} className="relative mt-20">
          {/* Track */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[27px] top-2 w-px bg-line md:left-[calc(6rem+27px)]"
          />
          {/* Fill */}
          <motion.div
            aria-hidden="true"
            style={{ scaleY: reduce ? 1 : scaleY }}
            className="absolute bottom-0 left-[27px] top-2 w-px origin-top bg-amber md:left-[calc(6rem+27px)]"
          />

          <ol className="space-y-14">
            {steps.map((step, index) => (
              <motion.li
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative grid gap-6 md:grid-cols-[6rem_1fr] md:gap-10"
              >
                <p className="hidden pt-1 text-right font-display text-head-sm tabular-nums text-copy-faint md:block">
                  {step.step}
                </p>

                <div className="relative pl-20">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 flex size-14 items-center justify-center rounded-full border border-line bg-white shadow-level1"
                  >
                    <Icon name={step.icon} className="size-5 text-ink" />
                  </span>

                  <h3 className="text-head-sm text-ink">
                    <span className="mr-3 font-display tabular-nums text-copy-faint md:hidden">
                      {step.step}
                    </span>
                    {step.title}
                  </h3>
                  <p className="mt-2 text-body-md font-medium text-ink-muted">
                    {step.summary}
                  </p>
                  <p className="mt-3 max-w-2xl text-body-md text-copy-muted">
                    {step.detail}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
