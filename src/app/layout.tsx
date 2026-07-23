import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';
import { Toaster } from 'sonner';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/motion/ScrollProgress';
import { JsonLd } from '@/components/JsonLd';
import { organizationSchema, websiteSchema } from '@/lib/schema-org';
import { site } from '@/content/site';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['600', '700', '800'],
});

export const viewport: Viewport = {
  themeColor: '#0F172A',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.legalName} — Executive Search & Leadership Hiring`,
    template: `%s | ${site.legalName}`,
  },
  description: site.description,
  applicationName: site.legalName,
  keywords: [
    'executive search',
    'C-suite recruitment',
    'board appointments',
    'leadership hiring',
    'lateral hiring',
    'retained search',
    'recruitment consulting',
  ],
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  formatDetection: { telephone: true, address: false, email: false },
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    siteName: site.legalName,
    title: `${site.legalName} — Executive Search & Leadership Hiring`,
    description: site.description,
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: site.legalName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.legalName} — Executive Search & Leadership Hiring`,
    description: site.description,
    images: ['/og-default.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-surface antialiased">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <ScrollProgress />
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              borderRadius: '0.5rem',
              border: '1px solid #E2E8F0',
              fontFamily: 'var(--font-inter)',
            },
          }}
        />
      </body>
    </html>
  );
}
