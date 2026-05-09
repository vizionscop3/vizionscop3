import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/constants";

export function CTABlock() {
  const cal = siteConfig.calendar;
  return (
    <Section>
      <Container className="rounded-xl border-2 border-[var(--color-electric-cyan)] bg-[var(--color-midnight)] p-8 shadow-[4px_4px_0_0_var(--color-electric-cyan)] md:p-12">
        <Heading level="2" className="text-[var(--color-signal-white)]">
          Ready when you are
        </Heading>
        <p className="mt-4 max-w-2xl text-[var(--color-echo-gray)]">
          If the work matters, start with a tight brief. We will reply within one
          business day.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center justify-center rounded-md border-2 border-black bg-[var(--color-electric-cyan)] px-6 py-3 text-sm font-semibold text-black shadow-[4px_4px_0_0_#000]"
          >
            Send a brief
          </Link>
          <a
            href={cal.embedUrl}
            className="inline-flex min-h-11 items-center justify-center rounded-md border-2 border-[var(--color-void-gray)] bg-[var(--color-deep-space)] px-6 py-3 text-sm font-semibold text-[var(--color-signal-white)]"
            target="_blank"
            rel="noreferrer"
          >
            Book time on Cal
          </a>
        </div>
      </Container>
    </Section>
  );
}
