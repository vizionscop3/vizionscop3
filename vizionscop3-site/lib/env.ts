import { z } from "zod";

import { normalizeSiteUrl } from "@/lib/constants";
import { HttpError } from "@/lib/http";

/** Vercel often stores “unset” vars as ""; treat as missing so optional fields don’t fail parsers at build time. */
function emptyToUndefined(value: unknown): unknown {
  if (typeof value !== "string") return value;
  const t = value.trim();
  return t === "" ? undefined : t;
}

/** Resend `from` allows a bare email or `Display Name <email@domain.com>`. */
function isValidResendFrom(value: string): boolean {
  const trimmed = value.trim();
  const lt = trimmed.lastIndexOf("<");
  const gt = trimmed.lastIndexOf(">");
  if (lt !== -1 && gt > lt) {
    const addr = trimmed.slice(lt + 1, gt).trim();
    return z.string().email().safeParse(addr).success;
  }
  return z.string().email().safeParse(trimmed).success;
}

/**
 * Zod `.url()` rejects common dashboard mistakes (`vizionscop3.com` with no scheme).
 * Align with `normalizeSiteUrl` in constants. Empty on Vercel → deployment host.
 */
function siteUrlForEnv(raw: unknown): string {
  const str = typeof raw === "string" ? raw.trim() : "";
  if (str !== "") {
    return normalizeSiteUrl(str);
  }
  const vercelHost = process.env.VERCEL_URL?.trim();
  if (vercelHost) {
    return normalizeSiteUrl(vercelHost);
  }
  return "http://localhost:3000";
}

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.preprocess(siteUrlForEnv, z.string().url()),
  NEXT_PUBLIC_SITE_NAME: z.preprocess(
    emptyToUndefined,
    z.string().min(1).optional(),
  ),
  NEXT_PUBLIC_SUPABASE_URL: z.preprocess(
    emptyToUndefined,
    z.string().url().optional(),
  ),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.preprocess(
    emptyToUndefined,
    z.string().min(1).optional(),
  ),
  SUPABASE_SERVICE_ROLE_KEY: z.preprocess(
    emptyToUndefined,
    z.string().min(1).optional(),
  ),
  RESEND_API_KEY: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
  RESEND_FROM_EMAIL: z.preprocess(
    emptyToUndefined,
    z
      .string()
      .refine(isValidResendFrom, { message: "Invalid email" })
      .optional(),
  ),
  RESEND_TO_EMAIL: z.preprocess(
    emptyToUndefined,
    z.string().email().optional(),
  ),
  NEXT_PUBLIC_CAL_USERNAME: z.preprocess(emptyToUndefined, z.string().optional()),
  NEXT_PUBLIC_HCAPTCHA_SITE_KEY: z.preprocess(
    emptyToUndefined,
    z.string().optional(),
  ),
  HCAPTCHA_SECRET_KEY: z.preprocess(emptyToUndefined, z.string().optional()),
  NEXT_PUBLIC_SENTRY_DSN: z.preprocess(
    emptyToUndefined,
    z.string().optional(),
  ),
  NODE_ENV: z.enum(["development", "production", "test"]).optional(),
  VERCEL_ENV: z.preprocess(emptyToUndefined, z.string().optional()),
});

type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const parsed = envSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
    RESEND_TO_EMAIL: process.env.RESEND_TO_EMAIL,
    NEXT_PUBLIC_CAL_USERNAME: process.env.NEXT_PUBLIC_CAL_USERNAME,
    NEXT_PUBLIC_HCAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY,
    HCAPTCHA_SECRET_KEY: process.env.HCAPTCHA_SECRET_KEY,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NODE_ENV: process.env.NODE_ENV as Env["NODE_ENV"],
    VERCEL_ENV: process.env.VERCEL_ENV,
  });

  if (!parsed.success) {
    console.error(parsed.error.flatten());
    throw new Error("Invalid environment configuration");
  }

  return parsed.data;
}

export const env = loadEnv();

const CONTACT_UNAVAILABLE =
  "We're unable to accept submissions right now. Please email contact@vizionscop3.com.";

export function requireContactEnv() {
  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = env.RESEND_API_KEY;
  const from = env.RESEND_FROM_EMAIL;
  const to = env.RESEND_TO_EMAIL;

  if (!supabaseUrl || !serviceKey || !resendKey || !from || !to) {
    console.error(
      "[contact] Missing env: set NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_TO_EMAIL on the host (e.g. Vercel).",
    );
    throw new HttpError(503, CONTACT_UNAVAILABLE);
  }

  return {
    supabaseUrl,
    serviceKey,
    resendKey,
    from,
    to,
    hcaptchaSecret: env.HCAPTCHA_SECRET_KEY,
    hcaptchaSiteKey: env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY,
  };
}
