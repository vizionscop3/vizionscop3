import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

const steps = [
  { title: "Discover", body: "Map constraints, risks, and the smallest viable proof." },
  { title: "Architect", body: "Model data, choose boundaries, and define observability." },
  { title: "Build", body: "Ship in tight loops with security and accessibility built in." },
  { title: "Evolve", body: "Measure, harden, and extend without rewriting the foundation." },
];

export function MethodSection() {
  return (
    <Section>
      <Container>
        <Heading level="2" className="text-[var(--color-signal-white)]">
          Method
        </Heading>
        <p className="mt-4 max-w-2xl text-[var(--color-echo-gray)]">
          A delivery rhythm designed for executives who need receipts, not vibes.
        </p>
        <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="rounded-lg border border-[var(--color-void-gray)] bg-[var(--color-midnight)] p-6"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-echo-gray)]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold text-[var(--color-signal-white)]">
                {s.title}
              </h3>
              <p className="mt-3 text-sm text-[var(--color-echo-gray)]">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
