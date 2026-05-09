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
        <div className="space-y-4">
          <p>
            We retain personal information only for as long as necessary to fulfill
            the purposes outlined in this Privacy Policy, comply with our legal
            obligations, resolve disputes, and enforce our agreements. Specific
            retention periods are as follows:
          </p>
          <h3 className="font-display text-lg font-semibold text-[var(--color-signal-white)]">
            Contact form submissions
          </h3>
          <p>
            Information submitted through our contact form is retained for up to
            twenty-four (24) months from the date of submission to support ongoing
            client communications, project planning, and follow-up engagement.
            Submissions that result in an active client relationship are retained for
            the duration of that relationship and an additional seven (7) years
            thereafter for business, tax, and legal recordkeeping purposes.
            Submissions identified as spam or invalid are deleted within thirty (30)
            days.
          </p>
          <h3 className="font-display text-lg font-semibold text-[var(--color-signal-white)]">
            Email correspondence
          </h3>
          <p>
            Emails exchanged with {siteConfig.legalName} are retained for up to seven
            (7) years to support client relationship management, project continuity,
            and compliance with applicable tax and business record requirements.
          </p>
          <h3 className="font-display text-lg font-semibold text-[var(--color-signal-white)]">
            Server logs and technical data
          </h3>
          <p>
            Access logs, error logs, and security-related technical data — including
            IP addresses, user agent strings, and request metadata — are retained for
            up to ninety (90) days for security monitoring, fraud prevention, and
            operational diagnostics, after which they are automatically purged or
            anonymized.
          </p>
          <h3 className="font-display text-lg font-semibold text-[var(--color-signal-white)]">
            Analytics data
          </h3>
          <p>
            Aggregated and anonymized analytics data may be retained indefinitely for
            business intelligence purposes. Individual session data is retained
            according to the policies of our analytics providers, typically not
            exceeding twenty-five (25) months.
          </p>
          <h3 className="font-display text-lg font-semibold text-[var(--color-signal-white)]">
            Backup systems
          </h3>
          <p>
            Routine backups of our systems are retained for up to ninety (90) days on
            a rolling basis. When personal information is deleted from our active
            systems, residual copies in backups are overwritten in the normal course
            of backup rotation and are not actively accessed except in the event of
            system recovery.
          </p>
          <h3 className="font-display text-lg font-semibold text-[var(--color-signal-white)]">
            Legal and compliance holds
          </h3>
          <p>
            Notwithstanding the periods above, we may retain certain information for
            longer periods when required by applicable law, when needed to establish,
            exercise, or defend legal claims, or when subject to a legal hold or
            regulatory investigation.
          </p>
          <h3 className="font-display text-lg font-semibold text-[var(--color-signal-white)]">
            Your rights regarding retention
          </h3>
          <p>
            You may request deletion of your personal information at any time by
            contacting us at{" "}
            <a
              className="text-[var(--color-electric-cyan)] hover:underline"
              href={`mailto:${siteConfig.contact.email}`}
            >
              {siteConfig.contact.email}
            </a>
            . We will honor verified deletion requests within thirty (30) days,
            except where retention is required by law or necessary to support an
            ongoing client engagement, dispute, or legal obligation.
          </p>
        </div>
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
