import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About — VizionScop3",
  description: `Meet ${siteConfig.founder.name} and the studio operating model.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Section className="pt-8">
        <Container>
          <Heading level="1" className="text-[var(--color-signal-white)]">
            About VizionScop3
          </Heading>
          <p className="mt-4 max-w-2xl text-[var(--color-echo-gray)]">
            Brooklyn-based engineering for teams that need clarity, receipts, and
            shipping discipline.
          </p>
        </Container>
      </Section>
      <Section className="bg-[var(--color-deep-space)]">
        <Container className="max-w-3xl space-y-6">
          <Heading level="2" className="text-[var(--color-signal-white)]">
            Origin
          </Heading>
          <p>
            [PLACEHOLDER: military service → Pursuit AI Native → early shipped
            products → why VizionScop3 LLC was formed.]
          </p>
          <Heading level="2" className="mt-12 text-[var(--color-signal-white)]">
            Beliefs
          </Heading>
          <ul className="list-disc space-y-2 text-[var(--color-echo-gray)]">
            <li>Accessibility and security are launch requirements.</li>
            <li>AI features must be observable, bounded, and testable.</li>
            <li>Small teams win with tight feedback loops and honest scoping.</li>
          </ul>
          <Heading level="2" className="mt-12 text-[var(--color-signal-white)]">
            Stack snapshot
          </Heading>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Next.js",
              "React Native / Expo",
              "Supabase",
              "PostgreSQL",
              "Pinecone",
              "Anthropic API",
            ].map((t) => (
              <div
                key={t}
                className="rounded-md border border-[var(--color-void-gray)] bg-[var(--color-midnight)] px-4 py-3 font-mono text-sm text-[var(--color-signal-white)]"
              >
                {t}
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center rounded-md border-2 border-black bg-[var(--color-electric-cyan)] px-6 py-3 text-sm font-semibold text-black shadow-[4px_4px_0_0_#000]"
            >
              Start a project →
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
