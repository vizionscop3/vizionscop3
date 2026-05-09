"use client";

import { useEffect, useState } from "react";

import { buildStatusStatic } from "@/lib/constants";

export function LiveBuildTicker() {
  const [i, setI] = useState(0);
  const items = buildStatusStatic.messages;

  useEffect(() => {
    const prefersReduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduce) return;
    const id = window.setInterval(() => {
      setI((n) => (n + 1) % items.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, [items.length]);

  return (
    <div className="flex h-8 items-center justify-center gap-3 border-b border-[var(--color-void-gray)] bg-[var(--color-deep-space)] px-4 text-xs text-[var(--color-echo-gray)]">
      <span
        className="h-2 w-2 rounded-full bg-[var(--color-circuit-green)]"
        aria-hidden
      />
      <p className="font-mono text-[11px] uppercase tracking-wide text-[var(--color-signal-white)]">
        {items[i]}
      </p>
    </div>
  );
}
