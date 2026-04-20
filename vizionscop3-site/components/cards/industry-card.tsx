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
    <Link href={`/industries/${slug}`} className={cn("group block", className)}>
      <motion.article
        className="relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-void-gray)]/50 bg-[var(--color-deep-space)] p-6 transition-all duration-[var(--duration-normal)]"
        whileHover={{
          borderColor: "var(--color-plasma-violet)",
          boxShadow: "0 0 24px rgba(124, 58, 237, 0.15)",
        }}
      >
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[var(--radius-md)] bg-gradient-to-br from-[var(--color-plasma-violet)]/20 to-transparent">
          <Icon className="h-7 w-7 text-[var(--color-plasma-violet)]" />
        </div>

        <h3 className="mb-2 font-[var(--font-display)] text-xl font-semibold text-[var(--color-signal-white)]">
          {title}
        </h3>

        <p className="mb-4 flex-1 text-sm text-[var(--color-echo-gray)]">
          {description}
        </p>

        <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-plasma-violet)]">
          See how we help
          <ArrowRight className="h-4 w-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1" />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--color-plasma-violet)]/5 to-transparent opacity-0 transition-opacity duration-[var(--duration-normal)] group-hover:opacity-100" />
      </motion.article>
    </Link>
  );
}
