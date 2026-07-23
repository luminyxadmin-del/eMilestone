import { NextResponse } from 'next/server';
import { talentProfileSchema } from '@/lib/validations';
import { createAdminClient, isSupabaseConfigured } from '@/lib/supabase/admin';
import { clientKey, rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const { allowed } = rateLimit(clientKey(request, 'talent'), 4, 60_000);
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

  const parsed = talentProfileSchema.safeParse(payload);
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
      { message: 'Submissions are not configured yet.' },
      { status: 503 },
    );
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from('talent_profiles').insert({
    full_name: parsed.data.fullName,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    current_title: parsed.data.currentTitle || null,
    current_company: parsed.data.currentCompany || null,
    sector: parsed.data.sector || null,
    years_experience: parsed.data.yearsExperience ?? null,
    linkedin_url: parsed.data.linkedinUrl || null,
    resume_path: parsed.data.resumePath || null,
    notes: parsed.data.notes || null,
  });

  if (error) {
    return NextResponse.json(
      { message: 'We could not save your profile.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
