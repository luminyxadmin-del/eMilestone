import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/motion/Reveal';
import { AmbientBackdrop } from '@/components/motion/AmbientBackdrop';
import { Icon } from '@/lib/icon';
import { recruiterComparison } from '@/content/site';

/**
 * A side-by-side contrast rather than a card grid: eMilestones gets a
 * genuine elevated glass panel, the typical-recruiter column stays flat and
 * muted on the section's own ink background — the asymmetry itself is the
 * point, so the difference reads before anyone reads a word.
 */
export function RecruiterComparison() {
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

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-0">
          {/* eMilestones — the elevated column */}
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-xl border border-amber/20 bg-amber/[0.06] p-8 shadow-level2 backdrop-blur-sm lg:mr-6 lg:p-10">
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
                    className="flex items-start gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <Icon
                      name="Check"
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-amber"
                    />
                    <div>
                      <p className="eyebrow text-white/50">{row.point}</p>
                      <p className="mt-1 text-body-md text-white">{row.us}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Typical recruiter — flat and muted */}
          <Reveal delay={0.15}>
            <div className="lg:ml-6 lg:border-l lg:border-white/10 lg:pl-10">
              <p className="font-display text-head-sm text-white/55">
                {recruiterComparison.themLabel}
              </p>

              <ul className="mt-6 divide-y divide-white/10">
                {recruiterComparison.rows.map((row, index) => (
                  <Reveal
                    key={row.point}
                    as="li"
                    delay={0.3 + index * 0.08}
                    className="flex items-start gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <Icon
                      name="X"
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-white/30"
                    />
                    <div>
                      <p className="eyebrow text-white/50">{row.point}</p>
                      <p className="mt-1 text-body-md text-white/60">{row.them}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Reveal>
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
