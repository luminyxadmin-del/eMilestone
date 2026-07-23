import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { SectionGlow } from '@/components/ui/section-glow';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { Icon } from '@/lib/icon';
import type { ValuePillar } from '@/types';
import { cn } from '@/lib/utils';

interface ValueGridProps {
  eyebrow?: string;
  title: string;
  description?: string;
  items: ValuePillar[];
  columns?: 2 | 3 | 4;
  background?: 'white' | 'subtle';
}

export function ValueGrid({
  eyebrow,
  title,
  description,
  items,
  columns = 3,
  background = 'white',
}: ValueGridProps) {
  return (
    <section
      className={cn(
        'section relative overflow-hidden border-t border-line',
        background === 'white' ? 'bg-warm-tint' : 'bg-surface-subtle',
      )}
    >
      {background !== 'white' && <SectionGlow variant="soft" />}
      <Container className="relative">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <Stagger
          className={cn(
            'mt-16 grid gap-6',
            columns === 2 && 'md:grid-cols-2',
            columns === 3 && 'md:grid-cols-3',
            columns === 4 && 'sm:grid-cols-2 lg:grid-cols-4',
          )}
        >
          {items.map((item) => (
            <StaggerItem key={item.title}>
              <article className="card-premium group h-full p-8">
                <span className="flex size-12 items-center justify-center rounded-full bg-ink/[0.04] transition-colors duration-500 ease-out group-hover:bg-amber/15">
                  <Icon
                    name={item.icon}
                    className="size-5 text-ink transition-colors duration-500 ease-out group-hover:text-amber-deep"
                  />
                </span>
                <h3 className="mt-6 text-head-sm text-ink">{item.title}</h3>
                <p className="mt-3 text-body-md text-copy-muted">{item.description}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
