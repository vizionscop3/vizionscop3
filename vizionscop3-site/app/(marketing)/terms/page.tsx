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
          Limitation of liability
        </h2>
        <div className="space-y-4">
          <p>
            Please read this section carefully. It limits the liability of{" "}
            {siteConfig.legalName} and affects your legal rights.
          </p>
          <p>
            To the fullest extent permitted by applicable law,{" "}
            {siteConfig.legalName}, its officers, directors, members, employees,
            contractors, agents, and affiliates (collectively, the &quot;VizionScop3
            Parties&quot;) shall not be liable for any indirect, incidental, special,
            consequential, exemplary, or punitive damages, including without
            limitation damages for loss of profits, revenue, goodwill, use, data,
            business interruption, or other intangible losses, whether arising in
            contract, tort (including negligence), strict liability, or any other
            legal theory, even if {siteConfig.legalName} has been advised of the
            possibility of such damages.
          </p>
          <h3 className="font-display text-lg font-semibold text-[var(--color-signal-white)]">
            No warranties
          </h3>
          <p>
            The {siteConfig.legalName} website, services, content, and all related
            materials are provided on an &quot;as is&quot; and &quot;as available&quot;
            basis, without warranties of any kind, either express or implied. To the
            fullest extent permitted by law, {siteConfig.legalName} disclaims all
            warranties, including but not limited to implied warranties of
            merchantability, fitness for a particular purpose, title, and
            non-infringement. We do not warrant that the website or services will be
            uninterrupted, timely, secure, error-free, or free of viruses or other
            harmful components, nor do we warrant the accuracy, completeness, or
            reliability of any content, information, or materials provided through the
            site.
          </p>
          <h3 className="font-display text-lg font-semibold text-[var(--color-signal-white)]">
            Aggregate liability cap
          </h3>
          <p>
            To the maximum extent permitted by applicable law, the total cumulative
            liability of the VizionScop3 Parties to you for any and all claims arising
            out of or relating to your use of this website, the services offered
            through it, or these Terms of Service, regardless of the form of action,
            shall not exceed the greater of (a) one hundred U.S. dollars ($100.00) or
            (b) the total amount actually paid by you to {siteConfig.legalName} in the
            twelve (12) months immediately preceding the event giving rise to the
            claim.
          </p>
          <h3 className="font-display text-lg font-semibold text-[var(--color-signal-white)]">
            Third-party services and links
          </h3>
          <p>
            The website may contain links to or integrations with third-party websites,
            applications, or services that are not owned or controlled by{" "}
            {siteConfig.legalName}. We have no control over, and assume no
            responsibility for, the content, privacy practices, or operations of any
            third-party websites or services. You acknowledge and agree that{" "}
            {siteConfig.legalName} shall not be liable, directly or indirectly, for any
            damage or loss caused or alleged to be caused by or in connection with the
            use of or reliance on any such third-party content, products, or services.
          </p>
          <h3 className="font-display text-lg font-semibold text-[var(--color-signal-white)]">
            Project engagements governed separately
          </h3>
          <p>
            Nothing in these Terms of Service is intended to govern, modify, or limit
            the terms of any separately executed Master Services Agreement, Statement
            of Work, or other contractual agreement between {siteConfig.legalName} and
            a client. Liability arising from such project engagements is governed
            exclusively by the terms of those agreements.
          </p>
          <h3 className="font-display text-lg font-semibold text-[var(--color-signal-white)]">
            Jurisdictional limitations
          </h3>
          <p>
            Some jurisdictions do not allow the exclusion or limitation of certain
            warranties or liabilities, particularly with respect to incidental or
            consequential damages. To the extent that any portion of this section is
            held to be unenforceable in a given jurisdiction, the remaining provisions
            shall continue in full force and effect, and any unenforceable portion
            shall be limited or modified to the minimum extent necessary to make it
            enforceable while preserving the intent of this section.
          </p>
          <h3 className="font-display text-lg font-semibold text-[var(--color-signal-white)]">
            Basis of the bargain
          </h3>
          <p>
            You acknowledge that the limitations of liability set forth in this
            section are an essential element of the agreement between you and{" "}
            {siteConfig.legalName}, and that {siteConfig.legalName} would not provide
            access to its website or services without these limitations.
          </p>
          <h3 className="font-display text-lg font-semibold text-[var(--color-signal-white)]">
            Governing law
          </h3>
          <p>
            This limitation of liability and any disputes arising out of or related to
            these Terms of Service, the website, or the services shall be governed by
            and construed in accordance with the laws of the State of New York, without
            regard to its conflict of laws principles.
          </p>
        </div>
        <h2 className="font-display text-xl font-semibold text-[var(--color-signal-white)]">
          Intellectual property
        </h2>
        <p>
          Trademarks, branding, and site content are owned by {siteConfig.legalName}{" "}
          unless otherwise noted. You may not copy, scrape, or redistribute site
          assets without permission.
        </p>
      </Container>
    </Section>
  );
}
