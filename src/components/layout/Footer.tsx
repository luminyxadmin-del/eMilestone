import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, Mail, Phone } from 'lucide-react';
import { site, footerNavigation } from '@/content/site';
import { NewsletterForm } from '@/components/forms/NewsletterForm';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber to-transparent"
      />

      <div className="mx-auto max-w-[1280px] px-4 py-20 md:px-12 md:py-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block" aria-label={`${site.legalName} — home`}>
              <Image
                src={site.logoUrl}
                alt={site.legalName}
                width={290}
                height={99}
                className="h-11 w-auto"
              />
            </Link>
            <p className="mt-6 max-w-sm text-body-md text-white/60">
              Elevating executive search through precision, insight and established
              networks. Connecting world-class leadership with premier organizations.
            </p>

            <div className="mt-10 max-w-sm">
              <p className="eyebrow mb-4 text-white/50">Executive briefing</p>
              <NewsletterForm tone="dark" />
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            {footerNavigation.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="eyebrow mb-5 text-white/50">{group.title}</h2>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-label-md text-white/70 transition-colors hover:text-amber"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-12 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-6">
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 text-label-md text-white/60 transition-colors hover:text-amber"
            >
              <Mail aria-hidden="true" className="size-4" />
              {site.email}
            </a>
            <a
              href={`tel:${site.phoneHref}`}
              className="flex items-center gap-2 text-label-md text-white/60 transition-colors hover:text-amber"
            >
              <Phone aria-hidden="true" className="size-4" />
              {site.phone}
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-label-md text-white/60 transition-colors hover:text-amber"
            >
              <Linkedin aria-hidden="true" className="size-4" />
              LinkedIn
            </a>
          </div>
          <p className="text-label-md text-white/60">
            © {year} {site.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
