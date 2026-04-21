"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Search, PenTool, Hammer, TrendingUp, LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { FadeIn } from "@/components/motion/fade-in";

interface Phase {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

const phases: Phase[] = [
  {
    number: "01",
    title: "Discover",
    description: "Deep-dive into your goals, constraints, and opportunities",
    icon: Search,
    iconBg: "bg-[var(--color-electric-cyan)]/10",
    iconColor: "text-[var(--color-electric-cyan)]",
  },
  {
    number: "02",
    title: "Architect",
    description: "Design scalable systems with AI-accelerated planning",
    icon: PenTool,
    iconBg: "bg-[var(--color-plasma-violet)]/10",
    iconColor: "text-[var(--color-plasma-violet)]",
  },
  {
    number: "03",
    title: "Build",
    description: "Rapid development with continuous delivery",
    icon: Hammer,
    iconBg: "bg-[var(--color-solar-gold)]/10",
    iconColor: "text-[var(--color-solar-gold)]",
  },
  {
    number: "04",
    title: "Evolve",
    description: "Ongoing optimization and feature expansion",
    icon: TrendingUp,
    iconBg: "bg-[var(--color-circuit-green)]/10",
    iconColor: "text-[var(--color-circuit-green)]",
  },
];

export function Methodology() {
  return (
    <Section spacing="xl" className="overflow-hidden bg-[var(--color-deep-space)]">
      <Container>
        <FadeIn className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-[var(--color-electric-cyan)]">
            Our Process
          </span>
          <Heading as="h2" size="xl" className="mb-6">
            The VizionScop3 Method
          </Heading>
          <p className="text-lg text-[var(--color-echo-gray)] leading-relaxed">
            A proven AI-native development process that delivers enterprise quality
            at startup speed.
          </p>
        </FadeIn>

        <div className="relative mx-auto max-w-5xl">
          {/* Connection line */}
          <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-gradient-to-b from-[var(--color-electric-cyan)] via-[var(--color-plasma-violet)] to-[var(--color-circuit-green)] md:left-1/2 md:-translate-x-1/2 md:block" />

          <div className="space-y-8 md:space-y-16">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.number}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.19, 1, 0.22, 1],
                }}
              >
                <div
                  className={`flex items-start gap-6 md:items-center md:gap-16 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                    <PhaseCard phase={phase} alignRight={index % 2 === 0} />
                  </div>

                  {/* Center dot - desktop */}
                  <div className="absolute left-6 top-6 z-10 hidden h-5 w-5 -translate-x-1/2 rounded-full border-4 border-[var(--color-obsidian)] bg-[var(--color-electric-cyan)] md:left-1/2 md:top-1/2 md:-translate-y-1/2 md:block" />

                  {/* Spacer for alternating layout */}
                  <div className="hidden flex-1 md:block" />
                </div>

                {/* Mobile timeline dot */}
                <div className="absolute left-6 top-6 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-[var(--color-obsidian)] bg-[var(--color-electric-cyan)] md:hidden" />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function PhaseCard({ phase, alignRight }: { phase: Phase; alignRight?: boolean }) {
  return (
    <div className={`ml-10 rounded-[var(--radius-xl)] border border-[var(--color-void-gray)]/30 bg-[var(--color-midnight)]/50 p-6 backdrop-blur-sm md:ml-0 ${alignRight ? "md:mr-0" : ""}`}>
      <div className={`mb-4 flex items-center gap-4 ${alignRight ? "md:flex-row-reverse" : ""}`}>
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-lg)] ${phase.iconBg}`}>
          <phase.icon className={`h-6 w-6 ${phase.iconColor}`} />
        </div>
        <div className={alignRight ? "md:text-right" : ""}>
          <span className="font-[var(--font-mono)] text-sm text-[var(--color-echo-gray)]">
            Phase {phase.number}
          </span>
          <h3 className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-signal-white)]">
            {phase.title}
          </h3>
        </div>
      </div>
      <p className={`text-[var(--color-echo-gray)] leading-relaxed ${alignRight ? "md:text-right" : ""}`}>
        {phase.description}
      </p>
    </div>
  );
}
