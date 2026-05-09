import { Container } from "@/components/ui/Container";
import { credibilityPills } from "@/lib/constants";

export function FounderIdentityStrip() {
  return (
    <section className="border-y border-[var(--color-void-gray)] bg-[var(--color-deep-space)] py-6">
      <Container className="flex flex-wrap items-center justify-center gap-3">
        {credibilityPills.map((pill) => (
          <span
            key={pill}
            className="rounded-full border border-[var(--color-void-gray)] bg-[var(--color-midnight)] px-4 py-1.5 text-xs font-medium text-[var(--color-echo-gray)]"
          >
            {pill}
          </span>
        ))}
      </Container>
    </section>
  );
}
