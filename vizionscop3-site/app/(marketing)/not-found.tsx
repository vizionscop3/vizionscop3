import Link from "next/link";

import { AnkhEasterEgg } from "@/components/brand/Ankh";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

export default function MarketingNotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <div className="mb-4 flex items-center gap-2 text-[var(--color-echo-gray)]">
        <span className="font-mono text-sm">404</span>
        <AnkhEasterEgg />
      </div>
      <Heading level="1" className="text-[var(--color-signal-white)]">
        This page is still in the workshop
      </Heading>
      <p className="mt-4 max-w-md text-[var(--color-echo-gray)]">
        The route you requested is not published. Head back to work or contact
        us if you believe this is a mistake.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/work"
          className="inline-flex min-h-11 items-center rounded-md border-2 border-black bg-[var(--color-electric-cyan)] px-6 py-3 text-sm font-semibold text-black shadow-[4px_4px_0_0_#000]"
        >
          View work
        </Link>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-md border-2 border-[var(--color-void-gray)] px-6 py-3 text-sm font-semibold text-[var(--color-signal-white)]"
        >
          Home
        </Link>
      </div>
    </Container>
  );
}
