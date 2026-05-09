import {
  Code2,
  Compass,
  Database,
  Globe,
  Smartphone,
  Sparkles,
} from "lucide-react";
import type { ElementType } from "react";

import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { services } from "@/lib/services/data";
import type { Service } from "@/lib/services/types";

const iconMap: Record<Service["icon"], ElementType> = {
  Globe,
  Smartphone,
  Code2,
  Sparkles,
  Database,
  Compass,
};

export function ServicesGrid() {
  return (
    <Section className="bg-[var(--color-deep-space)]">
      <Container>
        <Heading level="2" className="text-[var(--color-signal-white)]">
          What we build
        </Heading>
        <p className="mt-4 max-w-2xl text-[var(--color-echo-gray)]">
          Six capabilities — shown here as tiles, not as a maze of landing pages.
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...services].sort((a, b) => a.order - b.order).map((s) => {
            const Icon = iconMap[s.icon as keyof typeof iconMap] ?? Globe;
            return (
              <Card key={s.id} className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-[var(--color-void-gray)] bg-[var(--color-obsidian)]">
                  <Icon className="h-5 w-5 text-[var(--color-electric-cyan)]" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-[var(--color-signal-white)]">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-echo-gray)]">
                    {s.shortDescription}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
