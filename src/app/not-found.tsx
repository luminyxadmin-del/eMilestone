import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-ink py-32 text-white">
      <Container width="narrow" className="text-center">
        <p className="eyebrow flex items-center justify-center gap-3 text-white/50">
          <span aria-hidden="true" className="h-px w-8 bg-amber" />
          Error 404
        </p>
        <h1 className="mt-8 text-head-lg text-white md:text-display-sm">
          This page is no longer here
        </h1>
        <p className="mx-auto mt-6 max-w-md text-body-lg text-white/60">
          The link may be out of date, or the page may have moved. Start from the
          homepage, or tell us what you were looking for.
        </p>
        <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" variant="accent">
            <Link href="/">Go to the homepage</Link>
          </Button>
          <Button asChild size="lg" variant="ghostInverse">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
