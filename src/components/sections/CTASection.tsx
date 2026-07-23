import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/motion/Reveal';
import { AmbientBackdrop } from '@/components/motion/AmbientBackdrop';
import { Magnetic } from '@/components/motion/MagneticButton';
import { AccentText } from '@/components/ui/accent-text';

interface CTASectionProps {
  eyebrow?: string;
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}

export function CTASection({
  eyebrow = 'Next step',
  title,
  description,
  primary,
  secondary,
}: CTASectionProps) {
  return (
    <section className="section relative overflow-hidden bg-ink text-white">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber to-transparent"
      />
      <AmbientBackdrop />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow flex items-center justify-center gap-3 text-white/50">
              <span aria-hidden="true" className="h-px w-8 bg-amber" />
              {eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 text-head-lg text-white md:text-display-sm">
              <AccentText text={title} tone="dark" />
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-body-lg text-white/65">
              {description}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
              <Magnetic>
                <Button asChild size="lg" variant="accent">
                  <Link href={primary.href}>
                    {primary.label}
                    <ArrowRight />
                  </Link>
                </Button>
              </Magnetic>
              {secondary && (
                <Button asChild size="lg" variant="ghostInverse">
                  <Link href={secondary.href}>{secondary.label}</Link>
                </Button>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
