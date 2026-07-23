'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { TextReveal } from '@/components/motion/TextReveal';
import { Magnetic } from '@/components/motion/MagneticButton';
import { AmbientBackdrop } from '@/components/motion/AmbientBackdrop';
import { site } from '@/content/site';

/**
 * The hero states the thesis of the business in one quiet, centered
 * statement — the milestone idea gets its literal payoff later, in the
 * process timeline further down the page.
 */
export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-ink pb-24 pt-36 text-white md:pt-40"
    >
      <AmbientBackdrop />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:36px_36px]"
      />

      <Container className="relative">
        <motion.div
          style={{ y, opacity }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow flex items-center gap-3 text-white/50"
          >
            <span aria-hidden="true" className="h-px w-8 bg-amber" />
            Retained executive search since 2009
            <span aria-hidden="true" className="h-px w-8 bg-amber" />
          </motion.p>

          <TextReveal
            text={site.tagline}
            as="h1"
            delay={0.15}
            tone="dark"
            className="mt-8 max-w-[20ch] justify-center text-head-lg text-white md:text-display-lg"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-8 max-w-2xl text-body-lg text-white/65"
          >
            We connect world-class leadership with premier organizations to drive
            sustainable growth and innovation — quietly, and with a shortlist you could
            hire from twice.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Magnetic>
              <Button asChild size="lg" variant="accent">
                <Link href="/for-employers">
                  Hire talent
                  <ArrowRight />
                </Link>
              </Button>
            </Magnetic>
            <Button asChild size="lg" variant="ghostInverse">
              <Link href="/for-talent">Join the network</Link>
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      <motion.a
        href="#stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        aria-label="Scroll to the next section"
        className="absolute bottom-8 left-1/2 flex size-11 -translate-x-1/2 items-center justify-center rounded-full border border-white/15 text-white/50 transition-colors hover:border-white/40 hover:text-white"
      >
        <motion.span
          animate={reduce ? {} : { y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
