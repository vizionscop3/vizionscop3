import * as React from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company?: string;
  image?: string;
  className?: string;
}

export function TestimonialCard({
  quote,
  author,
  role,
  company,
  image,
  className,
}: TestimonialCardProps) {
  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-[var(--radius-xl)] border border-[var(--color-void-gray)]/30 bg-[var(--color-deep-space)] p-8",
        className
      )}
    >
      <Quote className="mb-5 h-8 w-8 shrink-0 text-[var(--color-electric-cyan)]/40" />

      <blockquote className="mb-6 flex-1 text-base leading-relaxed text-[var(--color-signal-white)]">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <footer className="mt-auto flex items-center gap-4">
        {image ? (
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
            <Image
              src={image}
              alt={author}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-midnight)]">
            <span className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-electric-cyan)]">
              {author.charAt(0)}
            </span>
          </div>
        )}

        <div className="min-w-0">
          <cite className="not-italic">
            <span className="block truncate font-medium text-[var(--color-signal-white)]">
              {author}
            </span>
            <span className="block truncate text-sm text-[var(--color-echo-gray)]">
              {role}
              {company && `, ${company}`}
            </span>
          </cite>
        </div>
      </footer>
    </article>
  );
}
