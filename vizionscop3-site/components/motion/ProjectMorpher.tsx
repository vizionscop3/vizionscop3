"use client";

import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";

import type { ProjectSlug } from "@/lib/constants";
import { usePortfolioTheme } from "@/lib/theme/ThemeProvider";

export function ProjectMorpher({
  slug,
  children,
}: {
  slug: ProjectSlug;
  children: React.ReactNode;
}) {
  const { setTheme } = usePortfolioTheme();
  const reduceMotion = useReducedMotion();
  const touchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTouch = () => {
    if (touchTimer.current) {
      clearTimeout(touchTimer.current);
      touchTimer.current = null;
    }
  };

  const onEnter = useCallback(() => {
    setTheme(slug);
  }, [setTheme, slug]);

  const onLeave = useCallback(() => {
    setTheme(null);
  }, [setTheme]);

  useEffect(() => () => clearTouch(), []);

  return (
    <div
      className="h-full transition-[transform] duration-[var(--duration-normal)]"
      style={{
        transitionTimingFunction: reduceMotion
          ? "ease-out"
          : "var(--ease-out-expo)",
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onTouchStart={() => {
        clearTouch();
        onEnter();
        touchTimer.current = setTimeout(() => {
          onLeave();
        }, 4000);
      }}
    >
      {children}
    </div>
  );
}
