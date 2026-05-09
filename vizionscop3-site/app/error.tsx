"use client";

import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--color-obsidian)] text-[var(--color-signal-white)]">
        <Container className="flex min-h-screen flex-col items-center justify-center py-16 text-center">
          <Heading level="1">Something misaligned</Heading>
          <p className="mt-4 max-w-md text-[var(--color-echo-gray)]">
            {error.message || "An unexpected error occurred."}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button type="button" onClick={reset}>
              Try again
            </Button>
            <Link
              href="/"
              className="inline-flex min-h-11 items-center rounded-md border-2 border-[var(--color-void-gray)] px-5 py-2 text-sm font-semibold"
            >
              Go home
            </Link>
          </div>
        </Container>
      </body>
    </html>
  );
}
