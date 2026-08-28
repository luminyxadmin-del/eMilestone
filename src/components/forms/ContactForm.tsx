'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2, Send } from 'lucide-react';
import { contactSchema, type ContactInput } from '@/lib/validations';
import { inquiryTypes } from '@/content/site';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Field } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function ContactForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      phone: '',
      inquiryType: 'general',
      message: '',
      website: '',
    },
  });

  const onSubmit = async (values: ContactInput) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, sourcePath: window.location.pathname }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        toast.error(result.message ?? 'We could not send that. Try again in a moment.');
        return;
      }
      toast.success('Message sent. A consultant will reply within one business day.');
      reset();
    } catch {
      toast.error('Network problem. Check your connection and try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="First name"
          htmlFor="firstName"
          required
          error={errors.firstName?.message}
        >
          <Input
            id="firstName"
            autoComplete="given-name"
            aria-invalid={Boolean(errors.firstName)}
            {...register('firstName')}
          />
        </Field>
        <Field
          label="Last name"
          htmlFor="lastName"
          required
          error={errors.lastName?.message}
        >
          <Input
            id="lastName"
            autoComplete="family-name"
            aria-invalid={Boolean(errors.lastName)}
            {...register('lastName')}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Email address"
          htmlFor="email"
          required
          error={errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register('email')}
          />
        </Field>
        <Field
          label="Phone"
          htmlFor="phone"
          error={errors.phone?.message}
          hint="Optional"
        >
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            {...register('phone')}
          />
        </Field>
      </div>

      <Field
        label="Company"
        htmlFor="company"
        error={errors.company?.message}
        hint="Optional"
      >
        <Input
          id="company"
          autoComplete="organization"
          {...register('company')}
        />
      </Field>

      <Field
        label="Inquiry type"
        htmlFor="inquiryType"
        required
        error={errors.inquiryType?.message}
      >
        <Controller
          name="inquiryType"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="inquiryType" aria-invalid={Boolean(errors.inquiryType)}>
                <SelectValue placeholder="Choose one" />
              </SelectTrigger>
              <SelectContent>
                {inquiryTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      <Field
        label="Message"
        htmlFor="message"
        required
        error={errors.message?.message}
        hint="Tell us about the role, the timeline, and anything that makes this search unusual."
      >
        <Textarea
          id="message"
          rows={6}
          aria-invalid={Boolean(errors.message)}
          {...register('message')}
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
        variant="accent"
        disabled={isSubmitting}
        className="w-full sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" />
            Sending
          </>
        ) : (
          <>
            <Send />
            Send message
          </>
        )}
      </Button>

      <p className="text-label-md text-copy-muted">
        Everything you send is treated as confidential. We never share your details with a
        client without your explicit approval.
      </p>
    </form>
  );
}
