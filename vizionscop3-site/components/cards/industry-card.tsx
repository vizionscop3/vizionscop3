"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  Building2,
  Briefcase,
  Shield,
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  nonprofits: Heart,
  "small-business": Building2,
  corporate: Briefcase,
  enterprise: Shield,
};

interface IndustryCardProps {
  slug: string;
  title: string;
  description: string;
  className?: string;
}

export function IndustryCard({
  slug,
  title,
  description,
  className,
}: IndustryCardProps) {
  const Icon = iconMap[slug] || Building2;

  return (
    <Link href={`/industries/${slug}`} className={cn("group block h-full", className)}>
      <motion.article
        className="relative flex h-full min-h-[240px] flex-col rounded-[var(--radius-xl)] border border-[var(--color-void-gray)]/30 bg-[var(--color-deep-space)] p-6 transition-all duration-[var(--duration-normal)]"
        whileHover={{
          borderColor: "var(--color-plasma-violet)",
          boxShadow: "0 0 24px rgba(124, 58, 237, 0.15)",
        }}
      >
        <div className="mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-gradient-to-br from-[var(--color-plasma-violet)]/20 to-transparent">
          <Icon className="h-6 w-6 text-[var(--color-plasma-violet)]" />
        </div>

        <h3 className="mb-3 font-[var(--font-display)] text-lg font-semibold text-[var(--color-signal-white)]">
          {title}
        </h3>

        <p className="mb-4 flex-1 text-base text-[var(--color-echo-gray)] leading-relaxed">
          {description}
        </p>

        <div className="mt-auto flex shrink-0 items-center gap-2 pt-2 text-sm font-medium text-[var(--color-plasma-violet)]">
          <span>See how we help</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1" />
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--color-plasma-violet)]/5 to-transparent opacity-0 transition-opacity duration-[var(--duration-normal)] group-hover:opacity-100" />
      </motion.article>
    </Link>
  );
}
