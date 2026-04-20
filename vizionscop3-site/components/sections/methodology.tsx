"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Search, PenTool, Hammer, TrendingUp, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { FadeIn } from "@/components/motion/fade-in";

const phases = [
  {
    number: "01",
    title: "Discover",
    description: "Deep-dive into your goals, constraints, and opportunities",
    icon: Search,
    color: "electric-cyan",
  },
  {
    number: "02",
    title: "Architect",
    description: "Design scalable systems with AI-accelerated planning",
    icon: PenTool,
    color: "plasma-violet",
  },
  {
    number: "03",
    title: "Build",
    description: "Rapid development with continuous delivery",
    icon: Hammer,
    color: "solar-gold",
  },
  {
    number: "04",
    title: "Evolve",
    description: "Ongoing optimization and feature expansion",
    icon: TrendingUp,
    color: "circuit-green",
  },
];

export function Methodology() {
  return (
    <Section className="overflow-hidden bg-[var(--color-deep-space)]">
      <Container>
        <FadeIn className="mb-16 text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-[var(--color-electric-cyan)]">
            Our Process
          </span>
          <Heading as="h2" size="xl" className="mb-4">
            The VizionScop3 Method
          </Heading>
          <p className="mx-auto max-w-2xl text-lg text-[var(--color-echo-gray)]">
            A proven AI-native development process that delivers enterprise quality
            at startup speed.
          </p>
        </FadeIn>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-[var(--color-electric-cyan)] via-[var(--color-plasma-violet)] to-[var(--color-circuit-green)] md:left-1/2 md:block" />

          <div className="space-y-12 md:space-y-0">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.number}
                className="relative"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.19, 1, 0.22, 1],
                }}
              >
                <div
                  className={`md:flex md:items-center md:gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="flex-1 md:text-right">
                    {index % 2 === 0 && (
                      <div className="mb-8 md:mb-0">
                        <PhaseCard phase={phase} />
                      </div>
                    )}
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-8 top-0 z-10 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-[var(--color-obsidian)] bg-[var(--color-electric-cyan)] md:left-1/2 md:block" />

                  <div className="flex-1">
                    {index % 2 !== 0 && (
                      <div className="mb-8 md:mb-0">
                        <PhaseCard phase={phase} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile timeline dot */}
                <div className="absolute left-8 top-0 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-[var(--color-obsidian)] bg-[var(--color-electric-cyan)] md:hidden" />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function PhaseCard({ phase }: { phase: (typeof phases)[0] }) {
  return (
    <div className="ml-12 rounded-[var(--radius-lg)] border border-[var(--color-void-gray)]/50 bg-[var(--color-midnight)]/50 p-6 backdrop-blur-sm md:ml-0">
      <div className="mb-4 flex items-center gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-${phase.color})]/10`}
        >
          <phase.icon className={`h-6 w-6 text-[var(--color-${phase.color})]`} />
        </div>
        <div>
          <span className="font-[var(--font-mono)] text-sm text-[var(--color-echo-gray)]">
            Phase {phase.number}
          </span>
          <h3 className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-signal-white)]">
            {phase.title}
          </h3>
        </div>
      </div>
      <p className="text-[var(--color-echo-gray)]">{phase.description}</p>
    </div>
  );
}
