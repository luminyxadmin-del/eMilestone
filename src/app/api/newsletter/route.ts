import { NextResponse } from 'next/server';
import { newsletterSchema } from '@/lib/validations';
import { createAdminClient, isSupabaseConfigured } from '@/lib/supabase/admin';
import { clientKey, rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const { allowed } = rateLimit(clientKey(request, 'newsletter'), 5, 60_000);
  if (!allowed) {
    return NextResponse.json(
      { message: 'Too many attempts. Try again shortly.' },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: 'That request was malformed.' }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { message: 'Enter a valid email address.' },
      { status: 422 },
    );
  }
  if (parsed.data.website) return NextResponse.json({ ok: true }, { status: 201 });

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { message: 'Subscriptions are not configured yet.' },
      { status: 503 },
    );
  }

  const sourcePath =
    typeof (payload as { sourcePath?: unknown }).sourcePath === 'string'
      ? (payload as { sourcePath: string }).sourcePath
      : null;

  const supabase = createAdminClient();
  const { error } = await supabase
    .from('newsletter_subscribers')
    .upsert(
      { email: parsed.data.email.toLowerCase(), source_path: sourcePath },
      { onConflict: 'email', ignoreDuplicates: false },
    );

  if (error) {
    return NextResponse.json(
      { message: 'We could not subscribe you just now.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
