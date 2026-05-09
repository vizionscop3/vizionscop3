import { NextResponse } from "next/server";

import { env, requireContactEnv } from "@/lib/env";
import { verifyHCaptcha } from "@/lib/email/hcaptcha";
import { sendContactConfirmation, sendContactNotification } from "@/lib/email/resend";
import { HttpError } from "@/lib/http";
import { assertContactRateLimit } from "@/lib/security/rate-limit";
import { createServiceClient } from "@/lib/supabase/service";
import { contactSchema } from "@/lib/validation/contact.schema";

export const runtime = "edge";

function clientIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() ?? "unknown";
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: Request) {
  try {
    const ip = clientIp(req);
    await assertContactRateLimit(ip);
    const json: unknown = await req.json();
    const parsed = contactSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }
    const data = parsed.data;
    const strictCaptcha =
      process.env.NODE_ENV === "production" &&
      Boolean(env.HCAPTCHA_SECRET_KEY);
    if (strictCaptcha) {
      const ok = await verifyHCaptcha(
        data.hcaptchaToken,
        env.HCAPTCHA_SECRET_KEY,
      );
      if (!ok) {
        return NextResponse.json({ error: "Captcha verification failed" }, { status: 400 });
      }
    }

    requireContactEnv();

    const supabase = createServiceClient();
    const { data: row, error } = await supabase
      .from("contact_submissions")
      .insert({
        name: data.name,
        email: data.email,
        organization: data.organization ?? null,
        organization_type: data.organizationType,
        project_types: data.projectTypes,
        budget_range: data.budgetRange,
        timeline: data.timeline,
        description: data.description,
        ip_address: ip,
        user_agent: req.headers.get("user-agent"),
        referrer: req.headers.get("referer"),
      })
      .select("id")
      .single();

    if (error || !row) {
      return NextResponse.json({ error: "Could not save submission" }, { status: 500 });
    }

    const payload = {
      id: row.id,
      name: data.name,
      email: data.email,
      organization: data.organization,
      organizationType: data.organizationType,
      projectTypes: data.projectTypes,
      budgetRange: data.budgetRange,
      timeline: data.timeline,
      description: data.description,
    };

    try {
      await Promise.all([
        sendContactNotification(payload),
        sendContactConfirmation(payload),
      ]);
    } catch {
      await supabase.from("contact_submissions").delete().eq("id", row.id);
      return NextResponse.json(
        { error: "Could not deliver inquiry — please try again or email hello@vizionscop3.com" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof HttpError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
