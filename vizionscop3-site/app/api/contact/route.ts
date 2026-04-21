import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import * as Sentry from "@sentry/nextjs";
import { siteConfig } from "@/lib/constants";
import { checkContactRateLimit } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile-verify";

function getClientKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  organization: z.string().optional(),
  organizationType: z.string(),
  projectType: z.array(z.string()),
  budgetRange: z.string().optional(),
  timeline: z.string().optional(),
  description: z.string().min(20),
  turnstileToken: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const rate = checkContactRateLimit(getClientKey(request));
    if (!rate.ok) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret) {
      const token = parsed.data.turnstileToken?.trim();
      if (!token) {
        return NextResponse.json(
          { error: "Human verification required" },
          { status: 400 }
        );
      }
      const ok = await verifyTurnstileToken(token, turnstileSecret);
      if (!ok) {
        return NextResponse.json(
          { error: "Verification failed. Please try again." },
          { status: 400 }
        );
      }
    }

    const {
      turnstileToken: _turnstile,
      name,
      email,
      organization,
      organizationType,
      projectType,
      budgetRange,
      timeline,
      description,
    } = parsed.data;

    const resendKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.links.email;

    if (process.env.NODE_ENV === "production" && (!resendKey || !from)) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 503 }
      );
    }

    if (!resendKey || !from) {
      return NextResponse.json({ success: true, dev: true });
    }

    const resend = new Resend(resendKey);
    const html = `
      <h1>New contact — ${escapeHtml(name)}</h1>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Organization:</strong> ${escapeHtml(organization ?? "")}</p>
      <p><strong>Organization type:</strong> ${escapeHtml(organizationType)}</p>
      <p><strong>Project types:</strong> ${escapeHtml(projectType.join(", "))}</p>
      <p><strong>Budget:</strong> ${escapeHtml(budgetRange ?? "")}</p>
      <p><strong>Timeline:</strong> ${escapeHtml(timeline ?? "")}</p>
      <p><strong>Description:</strong></p>
      <pre style="white-space:pre-wrap;font-family:inherit;">${escapeHtml(description)}</pre>
    `;

    const subject = `Contact: ${name.slice(0, 80)} — ${organizationType}`.slice(
      0,
      200
    );

    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject,
      html,
    });

    if (error) {
      Sentry.captureException(error);
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
