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
    <Link href={`/work/${slug}`} className={cn("group block h-full", className)}>
      <motion.article
        className="relative flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-void-gray)]/30 bg-[var(--color-midnight)]"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
      >
        <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
          <Image
            src={heroImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-midnight)] via-transparent to-transparent" />

          <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-obsidian)]/80 text-[var(--color-signal-white)] opacity-0 backdrop-blur-sm transition-all duration-[var(--duration-normal)] group-hover:opacity-100">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge variant="primary">{industry}</Badge>
            {services.slice(0, 1).map((service) => (
              <Badge key={service} variant="outline">
                {service}
              </Badge>
            ))}
          </div>

          <h3 className="mb-2 font-[var(--font-display)] text-lg font-semibold leading-tight text-[var(--color-signal-white)] transition-colors group-hover:text-[var(--color-electric-cyan)]">
            {title}
          </h3>

          <p className="mb-3 flex items-center gap-2 text-sm text-[var(--color-echo-gray)]">
            {isConfidential ? (
              <>
                <Lock className="h-3.5 w-3.5 shrink-0" />
                <span>Confidential Client</span>
              </>
            ) : (
              client
            )}
          </p>

          <p className="mt-auto line-clamp-2 text-sm text-[var(--color-echo-gray)] leading-relaxed">
            {summary}
          </p>
        </div>
      </motion.article>
    </Link>
  );
}
