"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { metrics } from "@/lib/constants";

function AnimatedBackground() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-obsidian)] via-[var(--color-deep-space)] to-[var(--color-obsidian)]" />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-obsidian)] via-[var(--color-deep-space)] to-[var(--color-obsidian)]" />

      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Glowing orbs */}
      <motion.div
        className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-[var(--color-electric-cyan)]/10 blur-[128px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -right-32 top-1/2 h-96 w-96 rounded-full bg-[var(--color-plasma-violet)]/10 blur-[128px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

function MetricCounter({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-[var(--font-mono)] text-2xl font-bold text-[var(--color-electric-cyan)] md:text-3xl">
        {value}
      </div>
      <div className="text-xs text-[var(--color-echo-gray)] md:text-sm">{label}</div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      <AnimatedBackground />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          >
            <span className="mb-6 inline-block rounded-full border border-[var(--color-electric-cyan)]/30 bg-[var(--color-electric-cyan)]/10 px-4 py-1.5 text-sm font-medium text-[var(--color-electric-cyan)]">
              AI-Native Technology Solutions
            </span>
          </motion.div>

          <motion.h1
            className="mb-6 font-[var(--font-display)] text-4xl font-bold leading-[1.1] tracking-tight text-[var(--color-signal-white)] md:text-5xl lg:text-6xl xl:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          >
            Engineering the Future.
            <br />
            <span className="bg-gradient-to-r from-[var(--color-electric-cyan)] to-[var(--color-plasma-violet)] bg-clip-text text-transparent">
              Delivered Today.
            </span>
          </motion.h1>

          <motion.p
            className="mx-auto mb-8 max-w-2xl text-lg text-[var(--color-echo-gray)] md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          >
            VizionScop3 builds AI-native technology solutions for organizations
            ready to lead. Web, mobile, software, databases, and AI infrastructure.
          </motion.p>

          <motion.div
            className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
          >
            <Button size="lg" asChild>
              <Link href="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/work">
                <Play className="mr-2 h-5 w-5" />
                Explore Our Work
              </Link>
            </Button>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 border-t border-[var(--color-void-gray)]/50 pt-8 md:gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
          >
            <MetricCounter value={metrics.clients} label="Clients Served" />
            <div className="h-8 w-px bg-[var(--color-void-gray)]/50" />
            <MetricCounter value={metrics.projects} label="Projects Shipped" />
            <div className="h-8 w-px bg-[var(--color-void-gray)]/50" />
            <MetricCounter value={metrics.practices} label="Core Practices" />
          </motion.div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-[var(--color-void-gray)] p-1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="h-2 w-1 rounded-full bg-[var(--color-electric-cyan)]"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
