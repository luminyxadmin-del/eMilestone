import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-label-sm uppercase tracking-[0.12em]',
  {
    variants: {
      variant: {
        default: 'bg-ink/5 text-ink',
        accent: 'bg-amber/15 text-amber-deep',
        outline: 'border border-line text-copy-muted',
        inverse: 'bg-white/10 text-white',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
