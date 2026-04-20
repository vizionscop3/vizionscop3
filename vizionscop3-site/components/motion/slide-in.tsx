"use client";

import * as React from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";

interface SlideInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "left" | "right" | "up" | "down";
  distance?: number;
}

export function SlideIn({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = "left",
  distance = 100,
}: SlideInProps) {
  const prefersReducedMotion = useReducedMotion();

  const getInitialPosition = () => {
    if (prefersReducedMotion) return { x: 0, y: 0 };

    switch (direction) {
      case "left":
        return { x: -distance, y: 0 };
      case "right":
        return { x: distance, y: 0 };
      case "up":
        return { x: 0, y: distance };
      case "down":
        return { x: 0, y: -distance };
      default:
        return { x: 0, y: 0 };
    }
  };

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...getInitialPosition(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : duration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
