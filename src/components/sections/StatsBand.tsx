import { Container } from '@/components/ui/container';
import { Counter } from '@/components/motion/Counter';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { Icon } from '@/lib/icon';
import { stats } from '@/content/site';
import type { Stat } from '@/types';

interface StatsBandProps {
  items?: Stat[];
}

export function StatsBand({ items = stats }: StatsBandProps) {
  return (
    <section className="border-y border-line bg-surface-subtle">
      <Container>
        <Stagger className="grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
          {items.map((stat) => (
            <StaggerItem key={stat.label} className="px-2 py-14 md:px-10">
              <Icon name={stat.icon} className="size-5 text-amber-deep" />
              <p className="mt-6 font-display text-head-lg tabular-nums text-ink md:text-display-sm">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-body-md text-copy-muted">{stat.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
