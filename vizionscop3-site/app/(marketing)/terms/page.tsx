import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service — VizionScop3",
  description: "Terms governing use of the VizionScop3 marketing website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Section className="pt-8">
      <Container className="max-w-3xl space-y-6 text-[var(--color-echo-gray)]">
        <Heading level="1" className="text-[var(--color-signal-white)]">
          Terms of service
        </Heading>
        <p className="text-sm">
          Effective: May 7, 2026 · Operator: {siteConfig.legalName} · Contact:{" "}
          <a
            className="text-[var(--color-electric-cyan)] hover:underline"
            href={`mailto:${siteConfig.contact.email}`}
          >
            {siteConfig.contact.email}
          </a>
        </p>
        <h2 className="font-display text-xl font-semibold text-[var(--color-signal-white)]">
          Agreement
        </h2>
        <p>
          By using this website, you agree to these terms. If you do not agree,
          do not use the site.
        </p>
        <h2 className="font-display text-xl font-semibold text-[var(--color-signal-white)]">
          No warranty
        </h2>
        <p>
          This site is provided &quot;as is&quot; without warranties of any kind.
          Content may change without notice.
        </p>
        <h2 className="font-display text-xl font-semibold text-[var(--color-signal-white)]">
          Limitation of liability
        </h2>
        <p>
          [PLACEHOLDER: limitation of liability clause — have legal counsel
          finalize for New York jurisdiction and your risk posture.]
        </p>
        <h2 className="font-display text-xl font-semibold text-[var(--color-signal-white)]">
          Intellectual property
        </h2>
        <p>
          Trademarks, branding, and site content are owned by {siteConfig.legalName}{" "}
          unless otherwise noted. You may not copy, scrape, or redistribute site
          assets without permission.
        </p>
        <h2 className="font-display text-xl font-semibold text-[var(--color-signal-white)]">
          Third-party services
        </h2>
        <p>
          The site may link to third-party tools (for example scheduling). Those
          services have their own terms.
        </p>
        <h2 className="font-display text-xl font-semibold text-[var(--color-signal-white)]">
          Governing law
        </h2>
        <p>
          These terms are governed by the laws of the State of New York, without
          regard to conflict-of-law rules.
        </p>
      </Container>
    </Section>
  );
}
