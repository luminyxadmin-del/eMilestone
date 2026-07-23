import { z } from 'zod';

const name = z
  .string()
  .trim()
  .min(2, 'Use at least 2 characters.')
  .max(60, 'Keep this under 60 characters.');

const email = z
  .string()
  .trim()
  .min(1, 'Enter your email address.')
  .email('Enter a valid email address, like name@company.com.');

const optionalUrl = z
  .string()
  .trim()
  .url('Enter a full URL, starting with https://')
  .optional()
  .or(z.literal(''));

/* Honeypot: bots fill hidden fields, humans do not. */
const honeypot = z.string().max(0, 'This submission was rejected.').optional();

export const contactSchema = z.object({
  firstName: name,
  lastName: name,
  email,
  company: z.string().trim().max(120).optional().or(z.literal('')),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  inquiryType: z.enum(['general', 'client', 'candidate', 'media'], {
    errorMap: () => ({ message: 'Choose an inquiry type.' }),
  }),
  message: z
    .string()
    .trim()
    .min(20, 'Tell us a little more — at least 20 characters.')
    .max(4000, 'Keep this under 4000 characters.'),
  website: honeypot,
});
export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email,
  website: honeypot,
});
export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const talentProfileSchema = z.object({
  fullName: name,
  email,
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  currentTitle: z.string().trim().max(120).optional().or(z.literal('')),
  currentCompany: z.string().trim().max(120).optional().or(z.literal('')),
  sector: z.string().trim().max(80).optional().or(z.literal('')),
  yearsExperience: z.coerce
    .number()
    .int('Enter a whole number of years.')
    .min(0)
    .max(60)
    .optional(),
  linkedinUrl: optionalUrl,
  notes: z.string().trim().max(2000).optional().or(z.literal('')),
  resumePath: z.string().trim().optional().or(z.literal('')),
  website: honeypot,
});
export type TalentProfileInput = z.infer<typeof talentProfileSchema>;

export const jobApplicationSchema = z.object({
  jobSlug: z.string().trim().min(1),
  jobId: z.string().uuid().optional().or(z.literal('')),
  fullName: name,
  email,
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  linkedinUrl: optionalUrl,
  coverNote: z.string().trim().max(3000).optional().or(z.literal('')),
  resumePath: z.string().trim().optional().or(z.literal('')),
  website: honeypot,
});
export type JobApplicationInput = z.infer<typeof jobApplicationSchema>;

export const careerApplicationSchema = jobApplicationSchema.extend({
  department: z.string().trim().max(80).optional().or(z.literal('')),
});
export type CareerApplicationInput = z.infer<typeof careerApplicationSchema>;

/* Resume upload constraints, shared by the client picker and the server route. */
export const RESUME_MAX_BYTES = 5 * 1024 * 1024;
export const RESUME_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const;

export function validateResumeFile(file: File): string | null {
  if (!RESUME_MIME_TYPES.includes(file.type as (typeof RESUME_MIME_TYPES)[number])) {
    return 'Upload a PDF or Word document.';
  }
  if (file.size > RESUME_MAX_BYTES) {
    return 'That file is over 5 MB. Compress it or upload a shorter version.';
  }
  return null;
}
