"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { ConstellationMobile } from "@/components/work/ConstellationMobile";
import { getAllProjectsSorted } from "@/lib/projects/data";
import type { Project } from "@/lib/projects/types";

const ConstellationMap = dynamic(
  () =>
    import("@/components/work/ConstellationMap").then((m) => m.ConstellationMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="relative mx-auto hidden aspect-square w-full max-w-4xl animate-pulse rounded-lg bg-[var(--color-midnight)]/40 md:block"
        aria-hidden
      />
    ),
  },
);

const filters = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI / ML" },
  { id: "mobile", label: "Mobile" },
  { id: "healthcare", label: "Healthcare" },
] as const;

type FilterId = (typeof filters)[number]["id"];

export default function WorkPage() {
  const projects = getAllProjectsSorted();
  const [active, setActive] = useState<FilterId>("all");

  const visible = useMemo(() => {
    if (active === "all") return projects;
    return projects.filter((p) => p.filters.includes(active));
  }, [active, projects]);

  return (
    <>
      <Section className="pt-8">
        <Container>
          <Heading level="1" className="text-[var(--color-signal-white)]">
            Work
          </Heading>
          <p className="mt-4 max-w-2xl text-[var(--color-echo-gray)]">
            A constellation of products — each engineered for a specific human
            problem, sharing stack DNA.
          </p>
          <div
            className="mt-8 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Work filters"
          >
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={active === f.id}
                className={`min-h-11 rounded-md border-2 px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-cyan)] ${
                  active === f.id
                    ? "border-[var(--color-electric-cyan)] text-[var(--color-electric-cyan)]"
                    : "border-[var(--color-void-gray)] text-[var(--color-echo-gray)]"
                }`}
                onClick={() => setActive(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Container>
      </Section>
      <Section className="pt-0">
        <Container>
          <ConstellationMap projects={projects as Project[]} />
          <ConstellationMobile projects={visible} />
          <ul className="sr-only" aria-label="Projects in this filter">
            {visible.map((p) => (
              <li key={p.slug}>
                {p.name}: {p.tagline}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center text-sm text-[var(--color-echo-gray)]">
            Prefer the map? Desktop shows relationships; mobile stacks the same
            facts without sacrificing clarity.
          </p>
        </Container>
      </Section>
    </>
  );
}
