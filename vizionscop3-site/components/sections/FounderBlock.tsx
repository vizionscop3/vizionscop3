import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/constants";

export function FounderBlock() {
  return (
    <Section className="bg-[var(--color-deep-space)]">
      <Container className="grid gap-10 lg:grid-cols-[280px_1fr] lg:items-start">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[280px] shrink-0 overflow-hidden rounded-lg border border-[var(--color-void-gray)] lg:mx-0">
          <Image
            src="https://placehold.co/800x1000/1a1a2e/00f0ff/png?text=Vizion"
            alt={`${siteConfig.founder.name}, ${siteConfig.founder.title}`}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 280px, min(90vw, 400px)"
            quality={85}
          />
        </div>
        <div>
          <Heading level="2" className="text-[var(--color-signal-white)]">
            Founder
          </Heading>
          <p className="mt-2 font-mono text-sm text-[var(--color-echo-gray)]">
            {siteConfig.founder.name} · {siteConfig.founder.title}
          </p>
          <p className="mt-6 text-[var(--color-echo-gray)]">
            [PLACEHOLDER: first paragraph — origin story, military background,
            and why VizionScop3 exists.]
          </p>
          <p className="mt-4 text-[var(--color-echo-gray)]">
            [PLACEHOLDER: second paragraph — what AI-native means in practice and
            how you work with clients.]
          </p>
          <blockquote className="mt-8 border-l-2 border-[var(--color-electric-cyan)] pl-6 font-display text-xl font-medium text-[var(--color-signal-white)]">
            “If it ships, it has to earn trust on day one.”
          </blockquote>
          <Link
            href="/about"
            className="mt-8 inline-flex min-h-11 items-center text-sm font-semibold text-[var(--color-electric-cyan)] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-cyan)]"
          >
            Read the full story →
          </Link>
        </div>
      </Container>
    </Section>
  );
}
