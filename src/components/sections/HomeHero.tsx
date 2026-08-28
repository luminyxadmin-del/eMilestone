'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, MapPin } from 'lucide-react';
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
      <Image
        src={site.heroBannerUrl}
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover [filter:brightness(1.2)_saturate(1.1)]"
      />
      {/* Dark only behind the text column on the left — including over
          whatever map-pin labels the photo has baked in there — so the right
          half of the image stays fully uncovered and reads crystal clear. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/65 to-transparent"
      />
      <AmbientBackdrop />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:36px_36px]"
      />

      <Container className="relative">
        <motion.div
          style={{ y, opacity }}
          className="mr-auto flex max-w-xl flex-col items-start text-left lg:max-w-2xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow flex flex-wrap items-center justify-start gap-x-3 gap-y-2 text-white/70"
          >
            <span aria-hidden="true" className="h-px w-8 bg-amber" />
            <a
              href="https://www.luminyx.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-soft transition-colors hover:text-amber"
            >
              A Luminyx Ventures company
            </a>
            <span aria-hidden="true" className="hidden h-1 w-1 rounded-full bg-white/35 sm:block" />
            Retained executive search since 2009
            <span aria-hidden="true" className="h-px w-8 bg-amber" />
          </motion.p>

          <TextReveal
            text={site.tagline}
            as="h1"
            delay={0.15}
            tone="dark"
            className="mt-8 max-w-[20ch] justify-start text-head-lg text-white md:text-display-lg"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-8 max-w-xl text-body-lg text-white/80"
          >
            Executive search with on-the-ground reach across India, the UAE and Africa —
            delivered with discretion, market intelligence and judgment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-12 flex flex-col items-start gap-4 sm:flex-row"
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

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="mt-14 w-full border-y border-white/25 py-5"
          >
            <p className="text-label-sm font-semibold uppercase tracking-[0.18em] text-white/60">
              Regional presence
            </p>
            <div className="mt-4 grid divide-y divide-white/20 text-left sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <PresenceCard place="India" address="Mumbai · Vikhroli West" />
              <PresenceCard place="UAE" address="Al Hulaila, Ras Al Khaimah" />
              <PresenceCard place="Africa" address="East Africa · Nairobi to Kigali" />
            </div>
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

function PresenceCard({ place, address }: { place: string; address: string }) {
  return (
    <div className="py-3 sm:px-5 sm:py-0 first:pl-0 last:pr-0">
      <div className="flex items-center gap-2 text-label-sm font-semibold uppercase tracking-[0.14em] text-amber-soft">
        <MapPin aria-hidden="true" className="size-3.5" />
        {place}
      </div>
      <p className="mt-1.5 text-label-md text-white/80">{address}</p>
    </div>
  );
}
