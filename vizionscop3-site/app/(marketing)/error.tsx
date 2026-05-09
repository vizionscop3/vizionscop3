"use client";

import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
      <Heading level="1" className="text-[var(--color-signal-white)]">
        Something went wrong
      </Heading>
      <p className="mt-4 max-w-md text-[var(--color-echo-gray)]">
        {error.message || "Please try again in a moment."}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button type="button" onClick={reset}>
          Try again
        </Button>
        <Link
          href="/contact"
          className="inline-flex min-h-11 items-center rounded-md border-2 border-[var(--color-void-gray)] px-5 py-2 text-sm font-semibold text-[var(--color-signal-white)]"
        >
          Contact
        </Link>
      </div>
    </Container>
  );
}
