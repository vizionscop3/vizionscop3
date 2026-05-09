"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  ariaLabel?: string;
  end: number;
  suffix?: string;
  duration?: number;
};

export function CountUp({
  ariaLabel,
  end,
  suffix = "",
  duration = 1.2,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    const prefersReduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ms = prefersReduce ? 0 : duration * 1000;
    const start = performance.now();

    const tick = (now: number) => {
      const t = ms === 0 ? 1 : Math.min(1, (now - start) / ms);
      const current = Math.round(end * t);
      if (!cancelled) setValue(current);
      if (t < 1 && !cancelled) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    return () => {
      cancelled = true;
    };
  }, [duration, end, inView]);

  return (
    <span ref={ref} aria-label={ariaLabel}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
