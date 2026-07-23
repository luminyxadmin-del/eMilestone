import type { Metadata } from 'next';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { ContactForm } from '@/components/forms/ContactForm';
import { AccentText } from '@/components/ui/accent-text';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema-org';
import { buildMetadata } from '@/lib/seo';
import { site, offices, businessHours } from '@/content/site';

const trail = [
  { name: 'Home', path: '/' },
  { name: 'Contact Us', path: '/contact' },
];

export const metadata: Metadata = buildMetadata({
  title: 'Contact Us',
  description:
    'Connect with the eMilestones team to start a confidential conversation about your executive search needs. Offices in New York, London and Singapore.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <PageHero
        eyebrow="Contact"
        title="Get in **touch**"
        description="We are ready to assist with your executive search needs. Connect with our team to start a conversation — every enquiry is read by a consultant, not a queue."
        trail={trail}
      />

      <section className="section bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,22rem)] lg:gap-20">
            <Reveal>
              <h2 className="text-head-md text-ink">
                <AccentText text="Send us a **message**" />
              </h2>
              <p className="mt-3 text-body-md text-copy-muted">
                Tell us what you are trying to solve. We reply within one business day.
              </p>
              <div className="mt-10">
                <ContactForm />
              </div>
            </Reveal>

            <Stagger className="space-y-6">
              <StaggerItem>
                <article className="rounded-md border border-line bg-surface-subtle p-8">
                  <Mail aria-hidden="true" className="size-5 text-amber-deep" />
                  <h3 className="mt-5 text-body-lg font-semibold text-ink">Email us</h3>
                  <p className="mt-1 text-label-md text-copy-muted">
                    For general enquiries and swift responses.
                  </p>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-3 inline-block text-body-md font-medium text-ink underline-offset-4 hover:underline"
                  >
                    {site.email}
                  </a>
                </article>
              </StaggerItem>

              <StaggerItem>
                <article className="rounded-md border border-line bg-surface-subtle p-8">
                  <Phone aria-hidden="true" className="size-5 text-amber-deep" />
                  <h3 className="mt-5 text-body-lg font-semibold text-ink">Call us</h3>
                  <p className="mt-1 text-label-md text-copy-muted">
                    Speak directly with an executive consultant.
                  </p>
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="mt-3 inline-block text-body-md font-medium text-ink underline-offset-4 hover:underline"
                  >
                    {site.phone}
                  </a>
                </article>
              </StaggerItem>

              <StaggerItem>
                <article className="rounded-md border border-line bg-surface-subtle p-8">
                  <Clock aria-hidden="true" className="size-5 text-amber-deep" />
                  <h3 className="mt-5 text-body-lg font-semibold text-ink">
                    Business hours
                  </h3>
                  <dl className="mt-4 space-y-2">
                    {businessHours.map((entry) => (
                      <div
                        key={entry.days}
                        className="flex justify-between gap-4 text-label-md"
                      >
                        <dt className="text-copy-muted">{entry.days}</dt>
                        <dd className="text-right text-ink">{entry.hours}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              </StaggerItem>
            </Stagger>
          </div>
        </Container>
      </section>

      <section className="section bg-surface-subtle">
        <Container>
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-amber" />
              Our offices
            </p>
            <h2 className="mt-6 text-head-lg text-ink">
              <AccentText text="Three locations, one **standard**" />
            </h2>
          </Reveal>

          <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {offices.map((office) => (
              <StaggerItem key={office.city}>
                <article className="flex h-full flex-col rounded-md border border-line bg-white p-8">
                  <div className="flex items-center gap-2">
                    <MapPin aria-hidden="true" className="size-4 text-amber-deep" />
                    <span className="text-label-sm uppercase tracking-[0.14em] text-copy-muted">
                      {office.label}
                    </span>
                  </div>
                  <h3 className="mt-4 text-head-sm text-ink">{office.city}</h3>
                  <address className="mt-3 flex-1 whitespace-pre-line text-body-md not-italic text-copy-muted">
                    {office.address.join('\n')}
                  </address>
                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block text-label-md font-medium text-ink underline-offset-4 hover:underline"
                  >
                    Get directions
                  </a>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </>
  );
}
