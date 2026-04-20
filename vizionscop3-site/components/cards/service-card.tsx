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
    <Link href={`/services/${slug}`} className={cn("group block", className)}>
      <motion.article
        className="relative h-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-void-gray)]/50 bg-[var(--color-deep-space)] p-6 transition-all duration-[var(--duration-normal)]"
        whileHover={{
          borderColor: "var(--color-electric-cyan)",
          boxShadow: "0 0 24px rgba(0, 240, 255, 0.15)",
        }}
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-midnight)]">
          <Icon className="h-6 w-6 text-[var(--color-electric-cyan)]" />
        </div>

        <h3 className="mb-2 font-[var(--font-display)] text-lg font-semibold text-[var(--color-signal-white)]">
          {title}
        </h3>

        <p className="mb-4 text-sm text-[var(--color-echo-gray)]">{description}</p>

        <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-electric-cyan)] opacity-0 transition-opacity duration-[var(--duration-fast)] group-hover:opacity-100">
          Learn more
          <ArrowRight className="h-4 w-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1" />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--color-electric-cyan)]/5 to-transparent opacity-0 transition-opacity duration-[var(--duration-normal)] group-hover:opacity-100" />
      </motion.article>
    </Link>
  );
}
