import { cn } from '@/lib/utils';
import { Reveal } from '@/components/motion/Reveal';
import { AccentText } from '@/components/ui/accent-text';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  className,
}: SectionHeadingProps) {
  const dark = tone === 'dark';

  return (
    <Reveal
      className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}
    >
      {eyebrow && (
        <p
          className={cn(
            'eyebrow mb-5 flex items-center gap-3',
            align === 'center' && 'justify-center',
            dark && 'text-white/50',
          )}
        >
          <span aria-hidden="true" className="h-px w-8 bg-amber" />
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'text-head-lg md:text-display-sm',
          dark ? 'text-white' : 'text-ink',
        )}
      >
        <AccentText text={title} tone={dark ? 'dark' : 'light'} />
      </h2>
      {description && (
        <p
          className={cn('mt-6 text-body-lg', dark ? 'text-white/65' : 'text-copy-muted')}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
