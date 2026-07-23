'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2, Send } from 'lucide-react';
import { jobApplicationSchema, type JobApplicationInput } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Field } from '@/components/ui/field';
import { ResumeDropzone } from '@/components/forms/ResumeDropzone';

interface JobApplicationFormProps {
  jobSlug: string;
  jobId?: string;
  jobTitle: string;
  /** Careers applications post to a different table than client mandates. */
  endpoint?: '/api/applications' | '/api/careers';
}

export function JobApplicationForm({
  jobSlug,
  jobId,
  jobTitle,
  endpoint = '/api/applications',
}: JobApplicationFormProps) {
  const [resumePath, setResumePath] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JobApplicationInput>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: { jobSlug, jobId: jobId ?? '' },
  });

  const onSubmit = async (values: JobApplicationInput) => {
    if (!resumePath) {
      toast.error('Add your resume before applying.');
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, resumePath }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        toast.error(result.message ?? 'We could not submit that. Try again in a moment.');
        return;
      }
      toast.success(
        `Applied to ${jobTitle}. You will hear from us within five business days.`,
      );
      reset({ jobSlug, jobId: jobId ?? '' });
      setResumePath('');
    } catch {
      toast.error('Network problem. Check your connection and try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <input type="hidden" {...register('jobSlug')} />
      <input type="hidden" {...register('jobId')} />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Full name"
          htmlFor="app-name"
          required
          error={errors.fullName?.message}
        >
          <Input
            id="app-name"
            autoComplete="name"
            aria-invalid={Boolean(errors.fullName)}
            {...register('fullName')}
          />
        </Field>
        <Field
          label="Email address"
          htmlFor="app-email"
          required
          error={errors.email?.message}
        >
          <Input
            id="app-email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register('email')}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Phone"
          htmlFor="app-phone"
          error={errors.phone?.message}
          hint="Optional"
        >
          <Input id="app-phone" type="tel" autoComplete="tel" {...register('phone')} />
        </Field>
        <Field
          label="LinkedIn profile"
          htmlFor="app-linkedin"
          error={errors.linkedinUrl?.message}
          hint="Optional"
        >
          <Input
            id="app-linkedin"
            type="url"
            placeholder="https://linkedin.com/in/…"
            {...register('linkedinUrl')}
          />
        </Field>
      </div>

      <div className="space-y-2">
        <span className="text-label-md font-medium text-ink">
          Resume <span className="text-amber-deep">*</span>
        </span>
        <ResumeDropzone onUploaded={setResumePath} />
      </div>

      <Field
        label="Cover note"
        htmlFor="app-note"
        error={errors.coverNote?.message}
        hint="Optional, but it helps."
      >
        <Textarea
          id="app-note"
          rows={5}
          placeholder={`Why this role, and what you would do in the first 90 days.`}
          {...register('coverNote')}
        />
      </Field>

      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        {...register('website')}
      />

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" />
            Submitting
          </>
        ) : (
          <>
            <Send />
            Apply for this role
          </>
        )}
      </Button>
    </form>
  );
}
