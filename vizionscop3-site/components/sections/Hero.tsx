"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { CursorHalo } from "@/components/motion/CursorHalo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

export function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);

  return (
    <section ref={heroRef}
      className="relative flex min-h-[90vh] md:min-h-screen flex-col justify-center overflow-hidden pt-6 md:pt-10"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[var(--color-obsidian)]"
        aria-hidden
      />
      <div
        className="hero-mesh pointer-events-none absolute inset-0 scale-110"
        aria-hidden
      />
      <CursorHalo heroRef={heroRef} />

      <Container className="relative z-10 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 inline-flex rounded-full border border-[var(--color-electric-cyan)]/30 bg-[var(--color-electric-cyan)]/10 px-4 py-1.5 text-sm font-medium text-[var(--color-electric-cyan)]">
            AI-native technology studio
          </p>
          <Heading as="h1" size="hero" className="mb-6">
            Branding. Building. Consulting.
          </Heading>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-[var(--color-echo-gray)] md:text-xl">
            Stop guessing at the problem. We engineer AI-powered solutions that
            streamline your operations, eliminate friction in your workflows, and
            give you back the one thing technology is supposed to deliver — your
            time. Let&apos;s map the path forward together.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/contact">
                Start a project
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/work">View selected work</Link>
            </Button>
          </div>
        </div>
      </Container>

      <div
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[var(--color-echo-gray)]"
        aria-hidden
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </div>
    </section>
  );
}
