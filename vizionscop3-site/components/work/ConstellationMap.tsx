"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import type { ProjectSlug } from "@/lib/constants";
import type { ConstellationEdge } from "@/lib/projects/constellation";
import { constellationEdges } from "@/lib/projects/constellation";
import type { Project } from "@/lib/projects/types";
import { cn } from "@/lib/utils";

const VIEW = 100;
const NODES: Record<ProjectSlug, { x: number; y: number; label: string }> = {
  "the-masjid": { x: 50, y: 15, label: "The Masjid" },
  "t-trac": { x: 20, y: 80, label: "T-Trac" },
  "vizionfit-pro": { x: 80, y: 80, label: "VizionFit Pro" },
};

function edgePath(from: ProjectSlug, to: ProjectSlug) {
  const a = NODES[from];
  const b = NODES[to];
  return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
}

export function ConstellationMap({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<{
    edge: ConstellationEdge | null;
  }>({ edge: null });

  return (
    <div className="relative mx-auto hidden aspect-square w-full max-w-4xl md:block">
      <svg
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        className="h-full w-full"
        role="img"
        aria-label="Constellation map: three projects and shared technologies"
      >
        <title>Constellation map</title>
        {constellationEdges.map((e) => {
          const d = edgePath(e.from, e.to);
          return (
            <motion.path
              key={`${e.from}-${e.to}`}
              d={d}
              fill="none"
              stroke="var(--color-void-gray)"
              strokeWidth={0.8 + e.weight * 0.15}
              initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: reduce ? 0 : 1.2,
                ease: "easeInOut",
              }}
              onMouseEnter={() => setHovered({ edge: e })}
              onMouseLeave={() => setHovered({ edge: null })}
            />
          );
        })}
        {projects.map((p) => {
          const n = NODES[p.slug];
          return (
            <motion.g
              key={p.slug}
              initial={reduce ? false : { scale: 1 }}
              whileHover={reduce ? undefined : { scale: 1.05 }}
            >
              <circle
                cx={n.x}
                cy={n.y}
                r={2.6}
                fill="var(--theme-primary)"
                stroke="var(--color-signal-white)"
                strokeWidth={0.4}
                className="cursor-pointer"
                onMouseEnter={() => setHovered({ edge: null })}
              />
              <text
                x={n.x}
                y={n.y - 4}
                textAnchor="middle"
                fill="var(--color-signal-white)"
                style={{ fontSize: 3.2 }}
                className="font-display font-semibold"
              >
                {n.label}
              </text>
            </motion.g>
          );
        })}
      </svg>
      {hovered.edge ? (
        <div
          className={cn(
            "pointer-events-none absolute left-1/2 top-4 z-10 w-max max-w-sm -translate-x-1/2 rounded-md border border-[var(--color-void-gray)] bg-[var(--color-midnight)] px-3 py-2 text-xs text-[var(--color-echo-gray)] shadow-elevation2",
          )}
          aria-live="polite"
        >
          <p className="font-mono text-[10px] uppercase tracking-wide text-[var(--color-signal-white)]">
            Shared stack
          </p>
          <p className="mt-1">{hovered.edge.sharedTech.join(" · ")}</p>
        </div>
      ) : null}
    </div>
  );
}
