'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2, Send } from 'lucide-react';
import { talentProfileSchema, type TalentProfileInput } from '@/lib/validations';
import { sectors } from '@/content/site';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Field } from '@/components/ui/field';
import { ResumeDropzone } from '@/components/forms/ResumeDropzone';

export function TalentProfileForm() {
  const [resumePath, setResumePath] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TalentProfileInput>({ resolver: zodResolver(talentProfileSchema) });

  const onSubmit = async (values: TalentProfileInput) => {
    if (!resumePath) {
      toast.error('Add your resume before submitting.');
      return;
    }

    try {
      const response = await fetch('/api/talent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, resumePath }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        toast.error(result.message ?? 'We could not save that. Try again in a moment.');
        return;
      }
      toast.success('Profile received. A consultant will be in touch if there is a fit.');
      reset();
      setResumePath('');
    } catch {
      toast.error('Network problem. Check your connection and try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Full name"
          htmlFor="fullName"
          required
          error={errors.fullName?.message}
        >
          <Input
            id="fullName"
            autoComplete="name"
            aria-invalid={Boolean(errors.fullName)}
            {...register('fullName')}
          />
        </Field>
        <Field
          label="Email address"
          htmlFor="talent-email"
          required
          error={errors.email?.message}
        >
          <Input
            id="talent-email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register('email')}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Current title"
          htmlFor="currentTitle"
          error={errors.currentTitle?.message}
        >
          <Input
            id="currentTitle"
            placeholder="Chief Operating Officer"
            {...register('currentTitle')}
          />
        </Field>
        <Field
          label="Current company"
          htmlFor="currentCompany"
          error={errors.currentCompany?.message}
        >
          <Input
            id="currentCompany"
            autoComplete="organization"
            {...register('currentCompany')}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Sector" htmlFor="sector" error={errors.sector?.message}>
          <select
            id="sector"
            className="h-12 w-full rounded border border-line bg-white px-4 text-body-md text-copy focus:border-ink focus:shadow-glow focus:outline-none"
            {...register('sector')}
          >
            <option value="">Select a sector</option>
            {sectors.map((sector) => (
              <option key={sector.slug} value={sector.name}>
                {sector.name}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="Years of experience"
          htmlFor="yearsExperience"
          error={errors.yearsExperience?.message}
        >
          <Input
            id="yearsExperience"
            type="number"
            min={0}
            max={60}
            placeholder="18"
            {...register('yearsExperience')}
          />
        </Field>
      </div>

      <Field
        label="LinkedIn profile"
        htmlFor="linkedinUrl"
        error={errors.linkedinUrl?.message}
        hint="Optional"
      >
        <Input
          id="linkedinUrl"
          type="url"
          placeholder="https://linkedin.com/in/…"
          {...register('linkedinUrl')}
        />
      </Field>

      <div className="space-y-2">
        <span className="text-label-md font-medium text-ink">
          Resume <span className="text-amber-deep">*</span>
        </span>
        <ResumeDropzone onUploaded={setResumePath} />
      </div>

      <Field
        label="Anything else we should know"
        htmlFor="notes"
        error={errors.notes?.message}
        hint="Optional"
      >
        <Textarea
          id="notes"
          rows={4}
          placeholder="Geographic constraints, sectors you would rule out, timing…"
          {...register('notes')}
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
            Submit profile
          </>
        )}
      </Button>

      <p className="text-label-md text-copy-muted">
        Your profile is visible only to consultants working a relevant mandate. We never
        contact your current employer.
      </p>
    </form>
  );
}
