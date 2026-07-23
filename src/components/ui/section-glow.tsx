import { cn } from '@/lib/utils';

interface SectionGlowProps {
  variant?: 'corner' | 'soft';
}

/**
 * Decorative amber radial glow bleeding from a section corner — atmosphere,
 * not a graphic. Sits behind content (render it first, before a `relative`
 * Container, so normal stacking order keeps it underneath) and is always
 * hidden from assistive tech since it carries no meaning.
 */
export function SectionGlow({ variant = 'corner' }: SectionGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0',
        variant === 'corner' ? 'bg-amber-glow' : 'bg-amber-glow-soft',
      )}
    />
  );
}
