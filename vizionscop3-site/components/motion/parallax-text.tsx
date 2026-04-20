"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxTextProps {
  children: string;
  className?: string;
  baseVelocity?: number;
}

export function ParallaxText({
  children,
  className,
  baseVelocity = -2,
}: ParallaxTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", `${baseVelocity * 100}%`]
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "overflow-hidden whitespace-nowrap",
        className
      )}
    >
      <motion.div className="flex gap-8" style={{ x }}>
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="font-[var(--font-display)] text-7xl font-bold text-[var(--color-void-gray)]/30 md:text-8xl lg:text-9xl"
          >
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
