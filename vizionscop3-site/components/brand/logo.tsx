import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 transition-opacity hover:opacity-80",
        className
      )}
      aria-label="VizionScop3 - Home"
    >
      <div className="relative flex h-10 w-10 items-center justify-center">
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          <rect
            x="2"
            y="2"
            width="36"
            height="36"
            rx="8"
            className="fill-[var(--color-electric-cyan)]"
          />
          <path
            d="M12 28L20 12L28 28"
            className="stroke-[var(--color-obsidian)]"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="20"
            cy="22"
            r="3"
            className="fill-[var(--color-obsidian)]"
          />
        </svg>
      </div>
      {showText && (
        <span className="font-[var(--font-display)] text-xl font-bold tracking-tight text-[var(--color-signal-white)]">
          VizionScop3
        </span>
      )}
    </Link>
  );
}
