'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { navigation, site } from '@/content/site';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();

  useMotionValueEvent(scrollY, 'change', (latest) => setScrolled(latest > 24));

  // Close the mobile sheet whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  // Lock body scroll behind the mobile sheet.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        setOpenGroup(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  // The bar starts transparent over a dark hero, so it needs light text. Once
  // scrolled — or once the mobile sheet (which is opaque white) is open — it
  // switches to the glass-on-light treatment with dark ink text.
  const lightBar = scrolled || mobileOpen;

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[70] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded focus:bg-ink focus:px-4 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>

      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        {/* The glass/blur background lives on its own layer, behind the
            nav content, rather than on the header itself. A `backdrop-filter`
            toggling on the SAME element that paints the button's text is a
            known Chromium repaint bug — the text can silently fail to
            recomposite after the filter engages mid-scroll. Splitting them
            into DOM siblings (this decorative div paints first, `nav` paints
            after and sits above it — the same stacking approach used
            throughout this codebase) means a glitch on the blur layer can
            no longer touch the text layer at all. */}
        <div
          aria-hidden="true"
          className={cn(
            'absolute inset-0 transition-[background-color,box-shadow,backdrop-filter] duration-500',
            lightBar ? 'glass shadow-level1' : 'border-b border-transparent bg-transparent',
          )}
        />
        <nav
          aria-label="Primary"
          className="relative mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-8 px-4 md:px-12"
        >
          <Link href="/" className="shrink-0" aria-label={`${site.legalName} — home`}>
            <Image
              src={site.logoUrl}
              alt={site.legalName}
              width={290}
              height={99}
              priority
              className="h-14 w-auto sm:h-16"
            />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <li
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setOpenGroup(item.label)}
                onMouseLeave={() => item.children && setOpenGroup(null)}
                onFocus={() => item.children && setOpenGroup(item.label)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setOpenGroup(null);
                  }
                }}
              >
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  aria-expanded={item.children ? openGroup === item.label : undefined}
                  className={cn(
                    'relative flex items-center gap-1 rounded px-3 py-2 text-label-md transition-colors duration-500',
                    lightBar
                      ? isActive(item.href)
                        ? 'text-ink'
                        : 'text-copy-muted hover:text-ink'
                      : isActive(item.href)
                        ? 'text-white'
                        : 'text-white/75 hover:text-white',
                  )}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        'size-3.5 transition-transform duration-300',
                        openGroup === item.label && 'rotate-180',
                      )}
                    />
                  )}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-marker"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-amber"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>

                <AnimatePresence>
                  {item.children && openGroup === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: reduce ? 0 : 8, scale: reduce ? 1 : 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: reduce ? 0 : 8, scale: reduce ? 1 : 0.98 }}
                      transition={{ duration: reduce ? 0.01 : 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-0 top-full w-72 pt-3"
                    >
                      <div className="rounded-lg border-x border-b border-line border-t-2 border-t-amber bg-white p-2 shadow-level3">
                        <p className="eyebrow px-3 pb-2 pt-1.5 text-copy-faint">
                          About {site.name}
                        </p>
                        <div className="hairline mb-1" />
                        <ul>
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="group relative block rounded-md py-2.5 pl-4 pr-3 transition-colors duration-300 hover:bg-amber/[0.06]"
                              >
                                <span
                                  aria-hidden="true"
                                  className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 scale-y-0 rounded-full bg-amber transition-transform duration-300 ease-out group-hover:scale-y-100"
                                />
                                <span className="block text-label-md font-medium text-ink transition-colors duration-300 group-hover:text-amber-deep">
                                  {child.label}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {/* Explicit, self-contained styles per navbar state rather than
                routing through the shared `Button` variant system — this is
                the one CTA that has to swap its own background AND text
                color together on every scroll transition, so keeping both
                pairs spelled out here removes any ambiguity about which
                variant is "supposed" to apply when. */}
            <Link
              href="/for-talent#submit"
              className={cn(
                'hidden h-9 items-center justify-center whitespace-nowrap rounded px-4 text-label-md font-medium transition-colors duration-500 ease-out sm:inline-flex',
                lightBar
                  ? 'bg-ink text-white shadow-level1 hover:bg-ink-soft'
                  : 'bg-white text-ink shadow-level2 hover:bg-surface-subtle',
              )}
            >
              Upload resume
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className={cn(
                'flex size-11 items-center justify-center rounded transition-colors duration-500 lg:hidden',
                lightBar ? 'text-ink hover:bg-ink/5' : 'text-white hover:bg-white/10',
              )}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white pt-20 lg:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
              }}
              className="h-full overflow-y-auto px-4 pb-12 pt-6"
            >
              {navigation.map((item) => (
                <motion.li
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="border-b border-line"
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'block py-5 font-display text-head-sm',
                      isActive(item.href) ? 'text-ink' : 'text-copy-muted',
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="-mt-2 space-y-3 pb-5 pl-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block text-body-md text-copy-muted transition-colors hover:text-ink"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="pt-8"
              >
                <Button asChild size="lg" className="w-full">
                  <Link href="/for-talent#submit">Upload resume</Link>
                </Button>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
