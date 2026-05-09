import type { Metadata } from "next";

import { CalEmbedGate } from "@/components/forms/CalEmbedGate";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact — VizionScop3",
  description: `Reach ${siteConfig.legalName} for project inquiries and partnerships.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Section className="pt-8">
        <Container>
          <Heading level="1" className="text-[var(--color-signal-white)]">
            Contact
          </Heading>
          <p className="mt-4 max-w-2xl text-[var(--color-echo-gray)]">
            Tell us what you are building. We respond within one business day.
          </p>
        </Container>
      </Section>
      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          <ContactForm />
          <div>
            <Heading level="2" className="text-[var(--color-signal-white)]">
              Prefer scheduling?
            </Heading>
            <p className="mt-3 text-sm text-[var(--color-echo-gray)]">
              Book a 30-minute working session on Cal — ideal for scoping and fit
              checks.
            </p>
            <CalEmbedGate />
          </div>
        </Container>
      </Section>
    </>
  );
}
