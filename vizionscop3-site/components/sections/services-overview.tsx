"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/cards/service-card";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { FadeIn } from "@/components/motion/fade-in";
import { services } from "@/lib/constants";

export function ServicesOverview() {
  return (
    <Section spacing="xl">
      <Container>
        <FadeIn className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-[var(--color-electric-cyan)]">
            What We Build
          </span>
          <Heading as="h2" size="xl" className="mb-6">
            Six Core Practices
          </Heading>
          <p className="text-lg text-[var(--color-echo-gray)] leading-relaxed">
            From concept to production, we deliver comprehensive technology
            solutions that drive business growth and operational excellence.
          </p>
        </FadeIn>

        <Stagger className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.slug} className="h-full">
              <ServiceCard
                slug={service.slug}
                title={service.title}
                description={service.shortDescription}
                icon={service.icon}
              />
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </FadeIn>
      </Container>
    </Section>
  );
}
