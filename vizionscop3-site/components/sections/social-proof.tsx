"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import { FadeIn } from "@/components/motion/fade-in";
import { metrics } from "@/lib/constants";

const testimonials = [
  {
    quote:
      "VizionScop3 transformed our digital presence completely. The AI-native approach meant we got to market 3x faster than our previous vendor.",
    author: "Sarah Chen",
    role: "CTO",
    company: "TechStart Inc",
  },
  {
    quote:
      "Working with Vizion felt like having a true partner invested in our mission. The donor platform exceeded every expectation.",
    author: "Marcus Johnson",
    role: "Executive Director",
    company: "Community Foundation",
  },
  {
    quote:
      "Enterprise-grade quality with startup speed. Our data pipeline handles 10M+ events daily without breaking a sweat.",
    author: "Priya Patel",
    role: "VP of Engineering",
    company: "DataFlow Corp",
  },
];

const proofMetrics = [
  { value: metrics.uptime, label: "Uptime SLA" },
  { value: metrics.satisfaction, label: "Client Satisfaction" },
  { value: `${metrics.mvpDays}-day`, label: "Average MVP" },
];

export function SocialProof() {
  return (
    <Section>
      <Container>
        <FadeIn className="mb-12 text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-[var(--color-solar-gold)]">
            Trusted By
          </span>
          <Heading as="h2" size="xl" className="mb-4">
            What Clients Say
          </Heading>
        </FadeIn>

        {/* Logo placeholder wall */}
        <FadeIn className="mb-16">
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-40 md:gap-12">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-8 w-24 rounded bg-[var(--color-void-gray)]/50 md:h-10 md:w-32"
              />
            ))}
          </div>
          <p className="mt-4 text-center text-sm text-[var(--color-echo-gray)]">
            Client logos displayed with permission
          </p>
        </FadeIn>

        {/* Testimonials */}
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </div>

        {/* Metrics */}
        <FadeIn>
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-void-gray)]/50 bg-[var(--color-deep-space)] p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-3">
              {proofMetrics.map((metric, index) => (
                <div key={metric.label} className="text-center">
                  <div className="mb-2 font-[var(--font-mono)] text-4xl font-bold text-[var(--color-electric-cyan)] md:text-5xl">
                    {metric.value}
                  </div>
                  <div className="text-[var(--color-echo-gray)]">{metric.label}</div>
                  {index < proofMetrics.length - 1 && (
                    <div className="absolute right-0 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-[var(--color-void-gray)]/50 md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
