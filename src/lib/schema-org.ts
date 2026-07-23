import { site, offices, faqs, sectors } from '@/content/site';
import { absoluteUrl } from '@/lib/utils';
import type { FaqItem } from '@/types';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${site.url}/#organization`,
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    description: site.description,
    email: site.email,
    telephone: site.phone,
    foundingDate: site.founded,
    sameAs: [site.social.linkedin, site.social.x],
    areaServed: ['IN'],
    knowsAbout: sectors.map((s) => s.name),
    address: offices.map((office) => ({
      '@type': 'PostalAddress',
      streetAddress: office.address[0],
      addressLocality: office.city,
      addressCountry: 'IN',
    })),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.legalName,
    publisher: { '@id': `${site.url}/#organization` },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(items: FaqItem[] = faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function jobPostingSchema(job: {
  title: string;
  summary: string;
  location: string;
  employment_type: string;
  posted_at: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.summary,
    datePosted: job.posted_at,
    employmentType: job.employment_type,
    hiringOrganization: {
      '@type': 'Organization',
      name: site.legalName,
      sameAs: site.url,
    },
    jobLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: job.location },
    },
  };
}
