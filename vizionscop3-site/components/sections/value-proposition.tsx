"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Cpu, Shield, Zap, LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

interface Proposition {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
}

const propositions: Proposition[] = [
  {
    icon: Cpu,
    title: "AI-Native",
    description:
      "Built with AI at the core, not bolted on. Every project leverages cutting-edge AI tools for faster delivery and smarter solutions.",
    iconBg: "bg-[var(--color-electric-cyan)]/10",
    iconColor: "text-[var(--color-electric-cyan)]",
  },
  {
    icon: Shield,
    title: "Enterprise-Ready",
    description:
      "Security, scalability, and reliability that meets the most demanding requirements. From startups to Fortune 500.",
    iconBg: "bg-[var(--color-plasma-violet)]/10",
    iconColor: "text-[var(--color-plasma-violet)]",
  },
  {
    icon: Zap,
    title: "Velocity-Driven",
    description:
      "Move from concept to production faster than traditional agencies. Enterprise quality at startup speed.",
    iconBg: "bg-[var(--color-solar-gold)]/10",
    iconColor: "text-[var(--color-solar-gold)]",
  },
];

export function ValueProposition() {
  return (
    <Section spacing="lg" className="relative overflow-hidden bg-[var(--color-deep-space)]">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {propositions.map((prop, index) => (
            <motion.div
              key={prop.title}
              className="group relative h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              <div className="relative flex h-full flex-col rounded-[var(--radius-xl)] border border-[var(--color-void-gray)]/30 bg-[var(--color-midnight)]/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-void-gray)]">
                <div
                  className={`mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-[var(--radius-lg)] ${prop.iconBg}`}
                >
                  <prop.icon className={`h-7 w-7 ${prop.iconColor}`} />
                </div>

                <h3 className="mb-4 font-[var(--font-display)] text-xl font-semibold text-[var(--color-signal-white)]">
                  {prop.title}
                </h3>

                <p className="text-base text-[var(--color-echo-gray)] leading-relaxed">
                  {prop.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
