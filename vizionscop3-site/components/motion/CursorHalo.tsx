"use client";

import { motion, useMotionValue, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  heroRef: React.RefObject<HTMLElement | null>;
};

export function CursorHalo({ heroRef }: Props) {
  const [enabled, setEnabled] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 120, damping: 20, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mq.matches);
    const onChange = () => setEnabled(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const { scrollY } = useScroll();
  useEffect(() => {
    const unsub = scrollY.on("change", (y) => {
      const el = heroRef.current;
      if (!el) return;
      const h = el.offsetHeight;
      setPastHero(y > h - 40);
    });
    return () => unsub();
  }, [scrollY, heroRef]);

  useEffect(() => {
    if (!enabled || pastHero) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX - 40);
      y.set(e.clientY - 40);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, pastHero, x, y]);

  if (!enabled || pastHero) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 h-[80px] w-[80px] rounded-full opacity-50 blur-[1px]"
      style={{
        x: springX,
        y: springY,
        background:
          "radial-gradient(circle, var(--theme-primary) 0%, transparent 70%)",
      }}
    />
  );
}
