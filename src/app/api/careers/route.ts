import { NextResponse } from 'next/server';
import { jobApplicationSchema } from '@/lib/validations';
import { createAdminClient, isSupabaseConfigured } from '@/lib/supabase/admin';
import { clientKey, rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const { allowed } = rateLimit(clientKey(request, 'applications'), 4, 60_000);
  if (!allowed) {
    return NextResponse.json(
      { message: 'Too many submissions. Try again shortly.' },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: 'That request was malformed.' }, { status: 400 });
  }

  const parsed = jobApplicationSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        message: 'Some fields need attention.',
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }
  if (parsed.data.website) return NextResponse.json({ ok: true }, { status: 201 });

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { message: 'Applications are not configured yet.' },
      { status: 503 },
    );
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from('job_applications').insert({
    job_id: parsed.data.jobId || null,
    job_slug: parsed.data.jobSlug,
    full_name: parsed.data.fullName,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    linkedin_url: parsed.data.linkedinUrl || null,
    cover_note: parsed.data.coverNote || null,
    resume_path: parsed.data.resumePath || null,
  });

  if (error) {
    return NextResponse.json(
      { message: 'We could not record your application.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
