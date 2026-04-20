"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  slug: string;
  title: string;
  client?: string;
  isConfidential?: boolean;
  industry: string;
  services: string[];
  heroImage: string;
  summary: string;
  className?: string;
}

export function ProjectCard({
  slug,
  title,
  client,
  isConfidential,
  industry,
  services,
  heroImage,
  summary,
  className,
}: ProjectCardProps) {
  return (
    <Link href={`/work/${slug}`} className={cn("group block", className)}>
      <motion.article
        className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-void-gray)]/50 bg-[var(--color-deep-space)]"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={heroImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-deep-space)] via-transparent to-transparent" />

          <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-obsidian)]/80 text-[var(--color-signal-white)] opacity-0 backdrop-blur-sm transition-all duration-[var(--duration-normal)] group-hover:opacity-100">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>

        <div className="p-6">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge variant="primary">{industry}</Badge>
            {services.slice(0, 2).map((service) => (
              <Badge key={service} variant="outline">
                {service}
              </Badge>
            ))}
          </div>

          <h3 className="mb-1 font-[var(--font-display)] text-lg font-semibold text-[var(--color-signal-white)] transition-colors group-hover:text-[var(--color-electric-cyan)]">
            {title}
          </h3>

          <p className="mb-3 flex items-center gap-2 text-sm text-[var(--color-echo-gray)]">
            {isConfidential ? (
              <>
                <Lock className="h-3.5 w-3.5" />
                Confidential Client
              </>
            ) : (
              client
            )}
          </p>

          <p className="line-clamp-2 text-sm text-[var(--color-echo-gray)]">
            {summary}
          </p>
        </div>
      </motion.article>
    </Link>
  );
}
