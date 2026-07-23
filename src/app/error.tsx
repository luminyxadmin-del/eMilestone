'use client';

import { useEffect } from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center bg-surface-subtle py-32">
      <Container width="narrow" className="text-center">
        <p className="eyebrow flex items-center justify-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-amber" />
          Something broke
        </p>
        <h1 className="mt-8 text-head-lg text-ink">This page did not load</h1>
        <p className="mx-auto mt-6 max-w-md text-body-lg text-copy-muted">
          The error has been logged. Try again — if it keeps happening, email
          contact@milestones.com and we will look into it.
        </p>
        <div className="mt-12">
          <Button size="lg" onClick={reset}>
            Try again
          </Button>
        </div>
      </Container>
    </section>
  );
}
