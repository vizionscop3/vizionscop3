"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Cpu, Shield, Zap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const propositions = [
  {
    icon: Cpu,
    title: "AI-Native",
    description:
      "Built with AI at the core, not bolted on. Every project leverages cutting-edge AI tools for faster delivery and smarter solutions.",
    color: "electric-cyan",
  },
  {
    icon: Shield,
    title: "Enterprise-Ready",
    description:
      "Security, scalability, and reliability that meets the most demanding requirements. From startups to Fortune 500.",
    color: "plasma-violet",
  },
  {
    icon: Zap,
    title: "Velocity-Driven",
    description:
      "Move from concept to production faster than traditional agencies. Enterprise quality at startup speed.",
    color: "solar-gold",
  },
];

export function ValueProposition() {
  return (
    <Section className="relative overflow-hidden bg-[var(--color-deep-space)]">
      <Container>
        <div className="grid gap-8 md:grid-cols-3">
          {propositions.map((prop, index) => (
            <motion.div
              key={prop.title}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              <div className="relative rounded-[var(--radius-lg)] border border-[var(--color-void-gray)]/50 bg-[var(--color-midnight)]/50 p-8 backdrop-blur-sm">
                <div
                  className={`mb-4 flex h-14 w-14 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-${prop.color})]/10`}
                >
                  <prop.icon
                    className={`h-7 w-7 text-[var(--color-${prop.color})]`}
                  />
                </div>

                <h3 className="mb-3 font-[var(--font-display)] text-xl font-semibold text-[var(--color-signal-white)]">
                  {prop.title}
                </h3>

                <p className="text-[var(--color-echo-gray)]">{prop.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
