import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy — VizionScop3",
  description: "How VizionScop3 collects, uses, and protects personal data.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Section className="pt-8">
      <Container className="max-w-3xl space-y-6 text-[var(--color-echo-gray)]">
        <Heading level="1" className="text-[var(--color-signal-white)]">
          Privacy policy
        </Heading>
        <p className="text-sm">
          Effective: May 7, 2026 · Operator: {siteConfig.legalName} · Location:{" "}
          {siteConfig.contact.address.city}, {siteConfig.contact.address.state}
        </p>
        <h2 className="font-display text-xl font-semibold text-[var(--color-signal-white)]">
          Summary
        </h2>
        <p>
          This policy describes how {siteConfig.legalName} handles information on
          this marketing website and through the contact form. It is not medical or
          legal advice.
        </p>
        <h2 className="font-display text-xl font-semibold text-[var(--color-signal-white)]">
          What we collect
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Contact submissions (name, email, organization, project description,
            and related metadata such as IP address for abuse prevention).
          </li>
          <li>
            Basic analytics events (via Vercel Analytics) such as page views and
                performance timings — not used to sell personal data.
          </li>
        </ul>
        <h2 className="font-display text-xl font-semibold text-[var(--color-signal-white)]">
          Why we collect it
        </h2>
        <p>
          To respond to inquiries, operate the site, protect against spam and
          abuse, and improve reliability and accessibility.
        </p>
        <h2 className="font-display text-xl font-semibold text-[var(--color-signal-white)]">
          Processors
        </h2>
        <p>
          We use service providers that may process data on our behalf (for
          example: hosting, transactional email, database storage, spam
          prevention, and error monitoring). Contracts limit use to providing the
          service.
        </p>
        <h2 className="font-display text-xl font-semibold text-[var(--color-signal-white)]">
          Retention
        </h2>
        <p>
          [PLACEHOLDER: retention periods for contact records, logs, and backups —
          customize to your legal counsel guidance.]
        </p>
        <h2 className="font-display text-xl font-semibold text-[var(--color-signal-white)]">
          Your choices
        </h2>
        <p>
          You may request access, correction, or deletion where applicable by
          emailing{" "}
          <a
            className="text-[var(--color-electric-cyan)] hover:underline"
            href={`mailto:${siteConfig.contact.email}`}
          >
            {siteConfig.contact.email}
          </a>
          . We may need to verify your request.
        </p>
        <h2 className="font-display text-xl font-semibold text-[var(--color-signal-white)]">
          Children
        </h2>
        <p>This site is not directed to children under 13.</p>
        <h2 className="font-display text-xl font-semibold text-[var(--color-signal-white)]">
          Updates
        </h2>
        <p>
          We may update this policy. The effective date above will change when we
          do.
        </p>
      </Container>
    </Section>
  );
}
