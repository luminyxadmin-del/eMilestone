import type { Metadata } from 'next';
import { site } from '@/content/site';
import { absoluteUrl } from '@/lib/utils';

interface SeoInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path,
  image = '/og-default.png',
  type = 'website',
  publishedTime,
  noIndex = false,
}: SeoInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image.startsWith('http') ? image : absoluteUrl(image);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    openGraph: {
      title: `${title} | ${site.legalName}`,
      description,
      url,
      siteName: site.legalName,
      locale: 'en_US',
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${site.legalName}`,
      description,
      images: [ogImage],
    },
  };
}
