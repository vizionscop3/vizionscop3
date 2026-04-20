import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <Section spacing="xl" className="flex min-h-screen items-center pt-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <span className="font-[var(--font-mono)] text-9xl font-bold text-[var(--color-electric-cyan)]/20 md:text-[200px]">
              404
            </span>
          </div>

          {/* Message */}
          <Heading as="h1" size="lg" className="mb-4">
            Page not found
          </Heading>
          <p className="mb-8 text-lg text-[var(--color-echo-gray)]">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>

          {/* Actions */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Go Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/services">
                <Search className="mr-2 h-5 w-5" />
                Explore Services
              </Link>
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 rounded-[var(--radius-lg)] border border-[var(--color-void-gray)]/50 bg-[var(--color-deep-space)] p-6">
            <p className="mb-4 text-sm font-medium text-[var(--color-signal-white)]">
              Looking for something specific?
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link
                href="/work"
                className="flex items-center text-[var(--color-echo-gray)] transition-colors hover:text-[var(--color-electric-cyan)]"
              >
                Our Work
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
              <Link
                href="/about"
                className="flex items-center text-[var(--color-echo-gray)] transition-colors hover:text-[var(--color-electric-cyan)]"
              >
                About Us
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center text-[var(--color-echo-gray)] transition-colors hover:text-[var(--color-electric-cyan)]"
              >
                Contact
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
