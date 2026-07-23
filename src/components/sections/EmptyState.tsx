import Link from 'next/link';
import { Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: { label: string; href: string };
}

/** An empty screen is an invitation to act, so it always offers a next step. */
export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-md border border-dashed border-line bg-surface-subtle px-8 py-20 text-center">
      <Inbox aria-hidden="true" className="mx-auto size-8 text-copy-faint" />
      <h3 className="mt-6 text-head-sm text-ink">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-body-md text-copy-muted">{description}</p>
      {action && (
        <Button asChild variant="outline" className="mt-8">
          <Link href={action.href}>{action.label}</Link>
        </Button>
      )}
    </div>
  );
}
