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
            src="/assets/marketing/founder-portrait.png"
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
            My name is Denward Lee Aulder, a first-generation Guyanese American
            raised in the Bedford-Stuyvesant neighborhood of Brooklyn. After
            graduating from Boys and Girls High School, I enlisted in the United
            States Air Force, where I earned a Top Secret security clearance and
            served alongside organizations including the NSA, CIA, and other
            agencies within the national security community.
          </p>
          <p className="mt-4 text-[var(--color-echo-gray)]">
            VizionScop3 emerged years after my service concluded. Technology has
            been a lifelong passion of mine since childhood, and the rise of AI
            drew me even deeper — I found myself fully immersed in exploring
            everything the technology could do and become. That curiosity
            eventually led me to Pursuit, a program a colleague introduced me
            to, which traditionally trained students to become software
            engineers. By the time my cohort began, Pursuit had evolved its
            curriculum into the AI-Native Builders program — and that pivot
            became the launching point for VizionScop3 as a technical solutions
            company.
          </p>
          <blockquote className="mt-8 border-l-2 border-[var(--color-electric-cyan)] pl-6 font-display text-xl font-medium text-[var(--color-signal-white)]">
            “Every product I've built started as something I needed and
            couldn't find. The day I realized that pain was a blueprint,
            VizionScop3 became inevitable.”
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
