"use client";

import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { ProjectMorpher } from "@/components/motion/ProjectMorpher";
import { ProjectCard } from "@/components/work/ProjectCard";
import { getFeaturedProjects } from "@/lib/projects/data";

export function FeaturedWork() {
  const items = getFeaturedProjects();
  return (
    <Section id="featured-work">
      <Container>
        <Heading level="2" className="max-w-2xl text-[var(--color-signal-white)]">
          Featured work
        </Heading>
        <p className="mt-4 max-w-2xl text-[var(--color-echo-gray)]">
          Three products in one constellation — each built for a different human
          need, connected by the same engineering standards.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((p) => (
            <ProjectMorpher key={p.slug} slug={p.slug}>
              <ProjectCard project={p} />
            </ProjectMorpher>
          ))}
        </div>
      </Container>
    </Section>
  );
}
