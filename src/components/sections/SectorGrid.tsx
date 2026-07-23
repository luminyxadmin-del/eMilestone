import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { Icon } from '@/lib/icon';
import { sectors } from '@/content/site';

interface SectorGridProps {
  showRoles?: boolean;
  /** Renders each sector's deeper `detail` copy and an anonymized
   *  `examplePlacement` — reserved for the page that owns sector depth. */
  detailed?: boolean;
  eyebrow?: string;
  title?: string;
  description?: string;
}

export function SectorGrid({
  showRoles = true,
  detailed = false,
  eyebrow = 'Practice areas',
  title = 'Sectors of **focus**',
  description = 'Our consultants bring operating experience, not just search experience, to each of these markets.',
}: SectorGridProps) {
  return (
    <section className="section bg-white">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <Stagger className="mt-16 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector) => (
            <StaggerItem key={sector.slug}>
              <article className="group flex h-full flex-col bg-white p-8 transition-colors duration-500 hover:bg-surface-subtle md:p-10">
                <span className="flex size-11 items-center justify-center rounded-full border border-line bg-white">
                  <Icon
                    name={sector.icon}
                    className="size-5 text-ink transition-colors duration-500 group-hover:text-amber-deep"
                  />
                </span>
                <h3 className="mt-6 text-head-sm text-ink">{sector.name}</h3>
                <p className="mt-3 flex-1 text-body-md text-copy-muted">
                  {detailed && sector.detail ? sector.detail : sector.description}
                </p>

                {showRoles && (
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {sector.roles.map((role) => (
                      <li
                        key={role}
                        className="rounded-full border border-line px-3 py-1 text-label-md text-copy-muted"
                      >
                        {role}
                      </li>
                    ))}
                  </ul>
                )}

                {detailed && sector.examplePlacement && (
                  <p className="mt-6 border-t border-line pt-6 text-label-md text-copy-muted">
                    <span className="font-medium text-ink">Recent placement — </span>
                    {sector.examplePlacement}
                  </p>
                )}
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
