import { Resend } from "resend";

import { requireContactEnv } from "@/lib/env";

export interface ContactEmailPayload {
  id: string;
  name: string;
  email: string;
  organization?: string | null;
  organizationType: string;
  projectTypes: string[];
  budgetRange: string;
  timeline: string;
  description: string;
}

const resendClient = () => new Resend(requireContactEnv().resendKey);

export async function sendContactNotification(row: ContactEmailPayload) {
  const { from, to } = requireContactEnv();
  const r = resendClient();
  const subject = `New inquiry from ${row.name}`;
  const text = [
    `Name: ${row.name}`,
    `Email: ${row.email}`,
    row.organization ? `Organization: ${row.organization}` : "",
    `Org type: ${row.organizationType}`,
    `Project types: ${row.projectTypes.join(", ")}`,
    `Budget: ${row.budgetRange}`,
    `Timeline: ${row.timeline}`,
    "",
    row.description,
  ]
    .filter(Boolean)
    .join("\n");

  await r.emails.send({
    from,
    to,
    subject,
    text,
  });
}

export async function sendContactConfirmation(row: ContactEmailPayload) {
  const { from } = requireContactEnv();
  const r = resendClient();
  await r.emails.send({
    from,
    to: row.email,
    subject: "We received your message — VizionScop3",
    text: `Hi ${row.name},\n\nThanks for reaching out. I review every inquiry within one business day.\n\n— VizionScop3`,
  });
}
