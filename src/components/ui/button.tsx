import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-ink text-white shadow-level1 hover:bg-ink-soft hover:shadow-level2',
        accent: 'bg-amber text-ink shadow-level1 hover:bg-amber-soft hover:shadow-level2',
        outline:
          'border border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-ink/5',
        inverse: 'bg-white text-ink shadow-level2 hover:bg-surface-subtle',
        ghostInverse:
          'border border-white/25 text-white hover:border-white/60 hover:bg-white/10',
        ghost: 'text-ink hover:bg-ink/5',
        link: 'text-ink underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-4 text-label-md',
        md: 'h-11 px-6 text-label-md',
        lg: 'h-14 px-8 text-body-md',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
