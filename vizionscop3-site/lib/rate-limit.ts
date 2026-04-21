type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

function prune(now: number) {
  for (const [key, b] of buckets) {
    if (now > b.resetAt) buckets.delete(key);
  }
}

export function checkContactRateLimit(clientKey: string): { ok: true } | { ok: false } {
  const now = Date.now();
  prune(now);
  const existing = buckets.get(clientKey);
  if (!existing || now > existing.resetAt) {
    buckets.set(clientKey, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }
  if (existing.count >= MAX_REQUESTS) {
    return { ok: false };
  }
  existing.count += 1;
  return { ok: true };
}
