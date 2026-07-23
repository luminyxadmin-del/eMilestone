'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionGlow } from '@/components/ui/section-glow';
import { testimonials } from '@/content/site';
import type { Testimonial } from '@/types';

interface TestimonialsProps {
  items?: Testimonial[];
}

export function Testimonials({ items = testimonials }: TestimonialsProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const move = (step: number) => {
    setDirection(step);
    setIndex((current) => (current + step + items.length) % items.length);
  };

  const current = items[index];

  return (
    <section className="section relative overflow-hidden border-t border-line bg-surface-subtle">
      <SectionGlow />
      <Container width="narrow" className="relative">
        <p className="eyebrow flex items-center justify-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-amber" />
          In their words
        </p>

        <div className="relative mt-12 min-h-[220px] text-center">
          <Quote aria-hidden="true" className="mx-auto size-8 text-amber/40" />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.blockquote
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction * 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -30 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8"
            >
              <p className="font-display text-head-sm text-ink md:text-head-md">
                “{current.quote}”
              </p>
              <footer className="mt-8 text-label-md text-copy-muted">
                <span className="font-medium text-ink">{current.author}</span>
                <span aria-hidden="true" className="mx-2">
                  ·
                </span>
                {current.company}
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous quote"
            className="flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-ink"
          >
            <ArrowLeft className="size-4" />
          </button>

          <div className="flex gap-2" role="tablist" aria-label="Choose a quote">
            {items.map((item, i) => (
              <button
                key={item.author}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Quote ${i + 1} of ${items.length}`}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? 'w-8 bg-amber'
                    : 'w-1.5 bg-line-strong hover:bg-copy-faint'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Next quote"
            className="flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-ink"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </Container>
    </section>
  );
}
