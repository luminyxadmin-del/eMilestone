/**
 * In-memory fixed-window limiter. Adequate for a single instance and for
 * blunting form spam; swap for Upstash Redis if you scale horizontally.
 */
const windows = new Map<string, { count: number; expires: number }>();

export function rateLimit(key: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const entry = windows.get(key);

  if (!entry || entry.expires < now) {
    windows.set(key, { count: 1, expires: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  entry.count += 1;
  if (entry.count > limit) return { allowed: false, remaining: 0 };
  return { allowed: true, remaining: limit - entry.count };
}

export function clientKey(request: Request, scope: string): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() ?? 'unknown';
  return `${scope}:${ip}`;
}

/** Periodically drop expired windows so the map cannot grow unbounded. */
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of windows) if (entry.expires < now) windows.delete(key);
}, 300_000).unref?.();
