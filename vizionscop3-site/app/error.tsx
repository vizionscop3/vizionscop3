"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Home, AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <Section spacing="xl" className="flex min-h-screen items-center pt-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
              <AlertTriangle className="h-10 w-10 text-red-500" />
            </div>
          </div>

          {/* Message */}
          <Heading as="h1" size="lg" className="mb-4">
            Something went wrong
          </Heading>
          <p className="mb-8 text-lg text-[var(--color-echo-gray)]">
            We encountered an unexpected error. Our team has been notified and
            is working on a fix.
          </p>

          {/* Error ID */}
          {error.digest && (
            <p className="mb-8 font-[var(--font-mono)] text-sm text-[var(--color-echo-gray)]">
              Error ID: {error.digest}
            </p>
          )}

          {/* Actions */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button onClick={reset} size="lg">
              <RefreshCcw className="mr-2 h-5 w-5" />
              Try Again
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Go Home
              </Link>
            </Button>
          </div>

          {/* Support */}
          <p className="mt-12 text-sm text-[var(--color-echo-gray)]">
            If this problem persists, please{" "}
            <Link
              href="/contact"
              className="text-[var(--color-electric-cyan)] hover:underline"
            >
              contact us
            </Link>
            .
          </p>
        </div>
      </Container>
    </Section>
  );
}
