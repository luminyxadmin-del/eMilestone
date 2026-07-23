import * as React from 'react';
import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'flex min-h-32 w-full rounded border border-line bg-white px-4 py-3 text-body-md text-copy transition-all duration-200 placeholder:text-copy-faint',
      'focus-visible:border-ink focus-visible:shadow-glow focus-visible:outline-none focus-visible:ring-0',
      'disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive',
      className,
    )}
    {...props}
  />
));
Textarea.displayName = 'Textarea';

export { Textarea };
