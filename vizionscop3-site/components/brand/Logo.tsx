import * as React from "react";
import Image from "next/image";
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
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
        <Image
          src="/assets/brand/vizionscop3-logo.png"
          alt={showText ? "" : "VizionScop3"}
          width={40}
          height={40}
          className="h-full w-full object-contain"
          sizes="40px"
          priority
          aria-hidden={showText ? true : undefined}
        />
      </div>
      {showText && (
        <span className="font-[var(--font-display)] text-xl font-bold tracking-tight text-[var(--color-signal-white)]">
          VizionScop3
        </span>
      )}
    </Link>
  );
}
