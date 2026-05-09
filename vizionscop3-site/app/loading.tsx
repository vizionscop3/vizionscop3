import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <Container className="py-16">
      <div className="animate-pulse space-y-4">
        <div className="h-10 w-2/3 rounded-md bg-[var(--color-midnight)]" />
        <div className="h-4 w-full rounded-md bg-[var(--color-midnight)]" />
        <div className="h-4 w-5/6 rounded-md bg-[var(--color-midnight)]" />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="h-48 rounded-lg bg-[var(--color-midnight)]" />
          <div className="h-48 rounded-lg bg-[var(--color-midnight)]" />
          <div className="h-48 rounded-lg bg-[var(--color-midnight)]" />
        </div>
      </div>
    </Container>
  );
}
