'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/motion/Reveal';
import { Counter } from '@/components/motion/Counter';
import { AmbientBackdrop } from '@/components/motion/AmbientBackdrop';
import { homeDifference, processSteps } from '@/content/site';

/**
 * The "why eMilestones" anchor: a single dark ink band rather than a grid
 * of cards. Left carries the narrative; right is an all-in-code glass panel
 * — the milestone rail plus the proof stats — so the section stays balanced
 * without reaching for a photograph. Named BentoDifference for import
 * stability — nothing bento-shaped remains inside it.
 */
export function BentoDifference() {
  const reduce = useReducedMotion();

  return (
    <section className="section relative overflow-hidden bg-ink text-white">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber to-transparent"
      />
      <AmbientBackdrop />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:36px_36px]"
      />

      <Container className="relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[6fr_5fr] lg:gap-16">
          {/* LEFT — the narrative */}
          <div>
            <SectionHeading
              eyebrow={homeDifference.eyebrow}
              title={homeDifference.title}
              description={homeDifference.intro}
              tone="dark"
            />

            <Reveal delay={0.1} className="mt-12 max-w-xl">
              <p className="text-balance font-display text-head-lg text-white md:text-display-sm">
                {homeDifference.statement.lead}
                <span className="text-amber">{homeDifference.statement.accent}</span>.
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-6 max-w-xl">
              <p className="text-body-lg text-white/65">{homeDifference.supporting}</p>
            </Reveal>

            <Reveal delay={0.3} className="mt-10 flex flex-col items-start gap-6">
              <Link
                href={homeDifference.cta.href}
                className="group inline-flex items-center gap-2 text-label-md font-medium text-amber transition-colors duration-300 hover:text-amber-soft"
              >
                {homeDifference.cta.label}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5"
                />
              </Link>

              <p className="max-w-md text-body-md italic text-white/60">
                “{homeDifference.quote.quote}”
                <span className="mt-2 block text-label-md not-italic text-white/50">
                  {homeDifference.quote.attribution}
                </span>
              </p>
            </Reveal>
          </div>

          {/* RIGHT — glass panel: the milestone rail + proof stats */}
          <div className="lg:flex lg:items-center">
            <Reveal direction="left" distance={16} delay={0.15} className="relative w-full">
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-[2rem] bg-amber/10 blur-3xl"
              />

              <div className="relative overflow-hidden rounded-xl border border-white/15 bg-white/[0.06] p-8 shadow-level2 backdrop-blur-xl md:p-10">
                <p className="eyebrow text-white/50">How we run a search</p>

                <div className="relative mt-8 pl-6">
                  <div
                    aria-hidden="true"
                    className="absolute bottom-1 left-0 top-1 w-px bg-white/15"
                  />
                  <motion.div
                    aria-hidden="true"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: reduce ? 0.01 : 1, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-1 left-0 top-1 w-px origin-top bg-amber"
                  />

                  <ol className="space-y-4">
                    {processSteps.map((step, index) => (
                      <Reveal
                        key={step.step}
                        as="li"
                        direction="right"
                        distance={10}
                        delay={0.25 + index * 0.07}
                        className="relative"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute -left-6 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-amber"
                        />
                        <p className="text-body-md text-white">
                          <span className="mr-2 font-display text-label-sm tabular-nums text-amber/80">
                            {step.step}
                          </span>
                          {step.title}
                        </p>
                      </Reveal>
                    ))}
                  </ol>
                </div>

                <div className="mt-10 space-y-5 border-t border-white/10 pt-8">
                  {homeDifference.stats.map((stat, index) => (
                    <Reveal
                      key={stat.label}
                      delay={0.65 + index * 0.1}
                      className="flex items-baseline gap-4"
                    >
                      <p className="shrink-0 font-display text-head-sm tabular-nums text-amber">
                        <Counter
                          value={stat.value}
                          prefix={stat.prefix}
                          suffix={stat.suffix}
                          delay={index * 150}
                        />
                      </p>
                      <p className="text-label-md text-white/55">{stat.label}</p>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
