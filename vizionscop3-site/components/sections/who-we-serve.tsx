"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { IndustryCard } from "@/components/cards/industry-card";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { FadeIn } from "@/components/motion/fade-in";
import { industries } from "@/lib/constants";

export function WhoWeServe() {
  return (
    <Section>
      <Container>
        <FadeIn className="mb-12 text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-[var(--color-plasma-violet)]">
            Who We Serve
          </span>
          <Heading as="h2" size="xl" className="mb-4">
            Solutions for Every Scale
          </Heading>
          <p className="mx-auto max-w-2xl text-lg text-[var(--color-echo-gray)]">
            From mission-driven nonprofits to enterprise organizations, we tailor
            our approach to meet your unique challenges and goals.
          </p>
        </FadeIn>

        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => (
            <StaggerItem key={industry.slug}>
              <IndustryCard
                slug={industry.slug}
                title={industry.title}
                description={industry.description}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
