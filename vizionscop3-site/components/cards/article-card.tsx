"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface ArticleCardProps {
  slug: string;
  title: string;
  excerpt: string;
  heroImage: string;
  category: string;
  publishedAt: string;
  readTime: number;
  className?: string;
}

export function ArticleCard({
  slug,
  title,
  excerpt,
  heroImage,
  category,
  publishedAt,
  readTime,
  className,
}: ArticleCardProps) {
  return (
    <Link href={`/insights/${slug}`} className={cn("group block", className)}>
      <motion.article
        className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-void-gray)]/50 bg-[var(--color-deep-space)]"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={heroImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-deep-space)] via-transparent to-transparent" />

          <div className="absolute left-4 top-4">
            <Badge variant="secondary">{category}</Badge>
          </div>

          <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-obsidian)]/80 text-[var(--color-signal-white)] opacity-0 backdrop-blur-sm transition-all duration-[var(--duration-normal)] group-hover:opacity-100">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>

        <div className="p-6">
          <h3 className="mb-2 font-[var(--font-display)] text-lg font-semibold text-[var(--color-signal-white)] transition-colors group-hover:text-[var(--color-electric-cyan)]">
            {title}
          </h3>

          <p className="mb-4 line-clamp-2 text-sm text-[var(--color-echo-gray)]">
            {excerpt}
          </p>

          <div className="flex items-center gap-4 text-xs text-[var(--color-echo-gray)]">
            <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {readTime} min read
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
