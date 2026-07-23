'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/motion/Reveal';
import { AmbientBackdrop } from '@/components/motion/AmbientBackdrop';
import { Icon } from '@/lib/icon';
import { recruiterComparison } from '@/content/site';
import { cn } from '@/lib/utils';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/**
 * A side-by-side contrast rather than a card grid: eMilestones gets a
 * genuine elevated glass panel, the typical-recruiter column stays flat and
 * muted — but both are the SAME card shape (identical border/padding), so
 * their headers and rows line up exactly; only the color treatment differs.
 */
export function RecruiterComparison() {
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
        <SectionHeading
          eyebrow={recruiterComparison.eyebrow}
          title={recruiterComparison.title}
          description={recruiterComparison.intro}
          tone="dark"
        />

        <div className="mt-16 grid items-stretch gap-8 lg:grid-cols-2">
          {/* eMilestones — the elevated column */}
          <Reveal delay={0.1}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-amber/20 bg-amber/[0.06] p-8 shadow-level2 backdrop-blur-sm lg:p-10">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-amber" />

              <p className="font-display text-head-sm text-amber">
                {recruiterComparison.usLabel}
              </p>

              <ul className="mt-6 divide-y divide-amber/10">
                {recruiterComparison.rows.map((row, index) => (
                  <Reveal
                    key={row.point}
                    as="li"
                    delay={0.3 + index * 0.08}
                    className="group -mx-3 flex items-start gap-3 rounded-md px-3 py-4 transition-colors duration-300 ease-out first:pt-0 last:pb-0 hover:bg-amber/[0.06]"
                  >
                    <motion.span
                      initial={reduce ? { scale: 1 } : { scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={
                        reduce
                          ? { duration: 0.01 }
                          : {
                              type: 'spring',
                              stiffness: 420,
                              damping: 20,
                              delay: 0.4 + index * 0.08,
                            }
                      }
                      className="mt-1 flex size-4 shrink-0 items-center justify-center"
                    >
                      <Icon name="Check" aria-hidden="true" className="size-4 text-amber" />
                    </motion.span>
                    <div>
                      <p className="eyebrow text-white/50">{row.point}</p>
                      <p className="mt-1 text-body-md text-white transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                        {row.us}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Typical recruiter — same shape and craft as the left card
              (glass, shadow, hairline, choreographed entrance), kept
              subordinate on purpose through color alone: no amber, dimmer
              text, a thinner top line — premium finish, muted verdict. */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            whileHover={reduce ? undefined : { y: -3 }}
            transition={{ duration: reduce ? 0.01 : 0.6, delay: 0.18, ease: EASE_OUT }}
            className="group/card relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-8 shadow-level1 backdrop-blur-sm transition-colors duration-500 ease-out hover:border-white/20 lg:p-10"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:repeating-linear-gradient(135deg,#fff_0,#fff_1px,transparent_1px,transparent_12px)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-white/[0.04] blur-3xl transition-opacity duration-500 ease-out group-hover/card:opacity-70"
            />

            <p className="relative font-display text-head-sm text-white/55">
              {recruiterComparison.themLabel}
            </p>

            <ul className="relative mt-6 divide-y divide-white/10">
              {recruiterComparison.rows.map((row, index) => (
                <motion.li
                  key={row.point}
                  initial={
                    reduce ? { opacity: 0 } : { opacity: 0, x: 24, filter: 'blur(6px)' }
                  }
                  whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: reduce ? 0.01 : 0.55,
                    delay: reduce ? 0 : 0.36 + index * 0.09,
                    ease: EASE_OUT,
                  }}
                  className={cn(
                    'group -mx-3 flex items-start gap-3 rounded-md px-3 py-4',
                    'transition-colors duration-300 ease-out first:pt-0 last:pb-0 hover:bg-white/[0.05]',
                  )}
                >
                  <motion.span
                    initial={reduce ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={
                      reduce
                        ? { duration: 0.01 }
                        : {
                            type: 'spring',
                            stiffness: 380,
                            damping: 18,
                            delay: 0.5 + index * 0.09,
                          }
                    }
                    className="mt-1 flex size-4 shrink-0 items-center justify-center"
                  >
                    <Icon
                      name="X"
                      aria-hidden="true"
                      className="size-4 text-white/30 transition-colors duration-300 ease-out group-hover:text-white/50"
                    />
                  </motion.span>
                  <div>
                    <p className="eyebrow text-white/50">{row.point}</p>
                    <p className="mt-1 text-body-md text-white/60 transition-colors duration-300 ease-out group-hover:text-white/85">
                      {row.them}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <Reveal delay={0.9} className="mt-14">
          <Link
            href={recruiterComparison.cta.href}
            className="group inline-flex items-center gap-2 text-label-md font-medium text-amber transition-colors duration-300 hover:text-amber-soft"
          >
            {recruiterComparison.cta.label}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5"
            />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
