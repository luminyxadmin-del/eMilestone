import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { Icon } from '@/lib/icon';
import { clientOutcomes } from '@/content/site';

export function ClientOutcomes() {
  return (
    <section className="section border-t border-line bg-warm-tint">
      <Container>
        <SectionHeading
          eyebrow="Proof, not promises"
          title="Recent **outcomes**"
          description="Client identities stay confidential — the results speak for the discipline behind them."
        />

        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {clientOutcomes.map((outcome) => (
            <StaggerItem key={outcome.mandate}>
              <article className="card-premium group flex h-full flex-col p-8">
                <span className="flex size-11 items-center justify-center rounded-full bg-ink/[0.04] transition-colors duration-500 ease-out group-hover:bg-amber/15">
                  <Icon
                    name={outcome.icon}
                    className="size-5 text-ink transition-colors duration-500 ease-out group-hover:text-amber-deep"
                  />
                </span>

                <p className="mt-6 font-display text-head-md tabular-nums text-ink">
                  {outcome.metric.value}
                </p>
                <p className="mt-1 text-label-md text-copy-muted">{outcome.metric.label}</p>

                <div className="mt-6 border-t border-line pt-6">
                  <p className="eyebrow text-copy-faint">{outcome.sector}</p>
                  <h3 className="mt-2 text-body-md font-medium text-ink">
                    {outcome.mandate}
                  </h3>
                  <p className="mt-2 text-body-md text-copy-muted">{outcome.description}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
