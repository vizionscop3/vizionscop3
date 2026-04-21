"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Code,
  Database,
  Brain,
  Lightbulb,
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Smartphone,
  Code,
  Database,
  Brain,
  Lightbulb,
};

interface ServiceCardProps {
  slug: string;
  title: string;
  description: string;
  icon: string;
  className?: string;
}

export function ServiceCard({
  slug,
  title,
  description,
  icon,
  className,
}: ServiceCardProps) {
  const Icon = iconMap[icon] || Code;

  return (
    <Link href={`/services/${slug}`} className={cn("group block h-full", className)}>
      <motion.article
        className="relative flex h-full min-h-[280px] flex-col rounded-[var(--radius-xl)] border border-[var(--color-void-gray)]/30 bg-[var(--color-deep-space)] p-8 transition-all duration-[var(--duration-normal)]"
        whileHover={{
          borderColor: "var(--color-electric-cyan)",
          boxShadow: "0 0 24px rgba(0, 240, 255, 0.15)",
        }}
      >
        <div className="mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-midnight)]">
          <Icon className="h-7 w-7 text-[var(--color-electric-cyan)]" />
        </div>

        <h3 className="mb-3 font-[var(--font-display)] text-xl font-semibold text-[var(--color-signal-white)]">
          {title}
        </h3>

        <p className="mb-6 flex-1 text-base text-[var(--color-echo-gray)] leading-relaxed">
          {description}
        </p>

        <div className="mt-auto flex shrink-0 items-center gap-2 pt-4 text-sm font-medium text-[var(--color-electric-cyan)]">
          <span>Learn more</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1" />
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--color-electric-cyan)]/5 to-transparent opacity-0 transition-opacity duration-[var(--duration-normal)] group-hover:opacity-100" />
      </motion.article>
    </Link>
  );
}
