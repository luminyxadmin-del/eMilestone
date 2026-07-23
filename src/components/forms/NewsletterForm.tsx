'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ArrowRight, Loader2 } from 'lucide-react';
import { newsletterSchema, type NewsletterInput } from '@/lib/validations';
import { cn } from '@/lib/utils';

export function NewsletterForm({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterInput>({ resolver: zodResolver(newsletterSchema) });

  const onSubmit = async (values: NewsletterInput) => {
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, sourcePath: window.location.pathname }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        toast.error(result.message ?? 'That did not go through. Try again in a moment.');
        return;
      }
      toast.success('Subscribed. Look out for the next briefing.');
      reset();
    } catch {
      toast.error('Network problem. Check your connection and try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="name@company.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'newsletter-email-error' : undefined}
          className={cn(
            'h-12 flex-1 rounded border px-4 text-body-md transition-all duration-200 focus:outline-none',
            dark
              ? 'border-white/15 bg-white/5 text-white placeholder:text-white/55 focus:border-amber'
              : 'border-line bg-white text-copy placeholder:text-copy-faint focus:border-ink focus:shadow-glow',
          )}
          {...register('email')}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          aria-label="Subscribe to the executive briefing"
          className={cn(
            'flex size-12 shrink-0 items-center justify-center rounded transition-all duration-300 disabled:opacity-50',
            dark
              ? 'bg-amber text-ink hover:bg-amber-soft'
              : 'bg-ink text-white hover:bg-ink-soft',
          )}
        >
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <ArrowRight className="size-4" />
          )}
        </button>
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        {...register('website')}
      />

      {errors.email && (
        <p
          id="newsletter-email-error"
          role="alert"
          className={cn(
            'mt-2 text-label-md',
            dark ? 'text-amber-soft' : 'text-destructive',
          )}
        >
          {errors.email.message}
        </p>
      )}
    </form>
  );
}
