import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Crumb {
  name: string;
  path: string;
}

export function Breadcrumbs({
  trail,
  tone = 'dark',
}: {
  trail: Crumb[];
  tone?: 'light' | 'dark';
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-label-md">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {isLast ? (
                <span
                  aria-current="page"
                  className={cn(tone === 'dark' ? 'text-white' : 'text-ink')}
                >
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.path}
                  className={cn(
                    'transition-colors',
                    tone === 'dark'
                      ? 'text-white/55 hover:text-white'
                      : 'text-copy-muted hover:text-ink',
                  )}
                >
                  {crumb.name}
                </Link>
              )}
              {!isLast && (
                <ChevronRight
                  aria-hidden="true"
                  className={cn(
                    'size-3.5',
                    tone === 'dark' ? 'text-white/30' : 'text-copy-faint',
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
