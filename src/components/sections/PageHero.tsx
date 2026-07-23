import { Container } from '@/components/ui/container';
import { Breadcrumbs, type Crumb } from '@/components/ui/breadcrumbs';
import { TextReveal } from '@/components/motion/TextReveal';
import { Reveal } from '@/components/motion/Reveal';
import { AmbientBackdrop } from '@/components/motion/AmbientBackdrop';
import type { ReactNode } from 'react';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  trail: Crumb[];
  children?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  description,
  trail,
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-ink pb-24 pt-40 text-white md:pb-32 md:pt-48">
      <AmbientBackdrop />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px]"
      />

      <Container className="relative">
        <Reveal direction="none">
          <Breadcrumbs trail={trail} />
        </Reveal>

        {eyebrow && (
          <Reveal delay={0.1}>
            <p className="eyebrow mt-10 flex items-center gap-3 text-white/50">
              <span aria-hidden="true" className="h-px w-8 bg-amber" />
              {eyebrow}
            </p>
          </Reveal>
        )}

        <TextReveal
          text={title}
          as="h1"
          delay={0.15}
          className="mt-6 max-w-4xl text-head-lg text-white md:text-display-lg"
        />

        <Reveal delay={0.4}>
          <p className="mt-8 max-w-2xl text-body-lg text-white/65">{description}</p>
        </Reveal>

        {children && (
          <Reveal delay={0.55} className="mt-12">
            {children}
          </Reveal>
        )}
      </Container>
    </section>
  );
}
