import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      'flex h-12 w-full rounded border border-line bg-white px-4 text-body-md text-copy transition-all duration-200 placeholder:text-copy-faint',
      'focus-visible:border-ink focus-visible:shadow-glow focus-visible:outline-none focus-visible:ring-0',
      'disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive',
      className,
    )}
    {...props}
  />
));
Input.displayName = 'Input';

export { Input };
