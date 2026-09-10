import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations';
import { createAdminClient, isSupabaseConfigured } from '@/lib/supabase/admin';
import { clientKey, rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const { allowed } = rateLimit(clientKey(request, 'contact'), 5, 60_000);
  if (!allowed) {
    return NextResponse.json(
      { message: 'Too many messages in a short time. Wait a minute and try again.' },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: 'That request was malformed.' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        message: 'Some fields need attention.',
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  // Honeypot tripped — accept silently so bots learn nothing.
  if (parsed.data.website) return NextResponse.json({ ok: true }, { status: 201 });

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { message: 'Messaging is not configured yet.' },
      { status: 503 },
    );
  }

  const sourcePath =
    typeof (payload as { sourcePath?: unknown }).sourcePath === 'string'
      ? (payload as { sourcePath: string }).sourcePath
      : null;

  const supabase = createAdminClient();
  const { error } = await supabase.from('contact_submissions').insert({
    first_name: parsed.data.firstName,
    last_name: parsed.data.lastName,
    email: parsed.data.email,
    company: parsed.data.company || null,
    phone: parsed.data.phone || null,
    inquiry_type: parsed.data.inquiryType,
    message: parsed.data.message,
    source_path: sourcePath,
  });

  if (error) {
    return NextResponse.json(
      {
        message:
          'We could not record that message. Email support@emilestones.net instead.',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
