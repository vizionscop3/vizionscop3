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
    <Section spacing="xl">
      <Container>
        <FadeIn className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-[var(--color-solar-gold)]">
            Trusted By
          </span>
          <Heading as="h2" size="xl" className="mb-6">
            What Clients Say
          </Heading>
        </FadeIn>

        {/* Logo placeholder wall */}
        <FadeIn className="mb-16">
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-40 md:gap-16">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-8 w-24 rounded bg-[var(--color-void-gray)]/50 md:h-10 md:w-32"
              />
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-[var(--color-echo-gray)]">
            Client logos displayed with permission
          </p>
        </FadeIn>

        {/* Testimonials */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              className="h-full"
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
          <div className="mx-auto max-w-4xl rounded-[var(--radius-xl)] border border-[var(--color-void-gray)]/30 bg-[var(--color-deep-space)] p-10 md:p-16">
            <div className="grid grid-cols-3 gap-8">
              {proofMetrics.map((metric) => (
                <div key={metric.label} className="relative text-center">
                  <div className="mb-3 font-[var(--font-mono)] text-3xl font-bold text-[var(--color-electric-cyan)] md:text-5xl">
                    {metric.value}
                  </div>
                  <div className="text-sm text-[var(--color-echo-gray)] md:text-base">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
