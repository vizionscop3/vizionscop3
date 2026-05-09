import Link from "next/link";

import type { ProjectSlug } from "@/lib/constants";
import { getNextProjectSlug } from "@/lib/projects/data";

export function NextProjectNav({ current }: { current: ProjectSlug }) {
  const next = getNextProjectSlug(current);
  return (
    <div className="flex flex-col items-start gap-4 rounded-lg border border-[var(--color-void-gray)] bg-[var(--color-midnight)] p-6 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-echo-gray)]">
          Next project
        </p>
        <p className="mt-1 font-display text-lg font-semibold text-[var(--color-signal-white)]">
          Continue the constellation
        </p>
      </div>
      <Link
        href={`/work/${next}`}
        className="inline-flex min-h-11 w-full items-center justify-center rounded-md border-2 border-black bg-[var(--color-electric-cyan)] px-6 py-3 text-sm font-semibold text-black shadow-[4px_4px_0_0_#000] transition-all duration-[var(--duration-fast)] hover:-translate-x-0.5 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-cyan)] md:w-auto"
      >
        View next →
      </Link>
    </div>
  );
}
