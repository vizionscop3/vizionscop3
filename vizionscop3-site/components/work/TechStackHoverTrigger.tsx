"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import type { Project } from "@/lib/projects/types";
import { cn } from "@/lib/utils";

export function TechStackHoverTrigger({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const panelId = useId();
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [hovered, setHovered] = useState(false);
  const [stuckOpen, setStuckOpen] = useState(false);

  const clearLeaveTimer = useCallback(() => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
  }, []);

  const open = hovered || stuckOpen;

  const handleEnter = useCallback(() => {
    clearLeaveTimer();
    setHovered(true);
  }, [clearLeaveTimer]);

  const handleLeave = useCallback(() => {
    clearLeaveTimer();
    leaveTimer.current = setTimeout(() => setHovered(false), 120);
  }, [clearLeaveTimer]);

  useEffect(() => {
    if (!stuckOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setStuckOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stuckOpen]);

  return (
    <div
      className={cn("relative inline-flex", className)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        className={cn(
          "min-h-11 rounded-md border-2 border-[var(--color-void-gray)] px-4 text-sm font-semibold text-[var(--color-echo-gray)] transition-colors",
          "hover:border-[var(--color-electric-cyan)] hover:text-[var(--color-electric-cyan)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-cyan)]",
          open && "border-[var(--color-electric-cyan)] text-[var(--color-electric-cyan)]",
        )}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setStuckOpen((s) => !s)}
      >
        Tech stack
      </button>
      {open ? (
        <div
          id={panelId}
          role="region"
          aria-label={`Technology stack for ${project.name}`}
          className={cn(
            "absolute bottom-full left-1/2 z-50 mb-0 w-[min(100vw-2rem,20rem)] max-h-[min(70vh,24rem)] -translate-x-1/2 overflow-y-auto",
            "rounded-lg border border-[var(--color-void-gray)] bg-[var(--color-midnight)] p-4 shadow-[0_8px_32px_rgba(0,0,0,0.45)]",
            // Invisible hover bridge so the pointer can reach the panel without closing
            "before:pointer-events-auto before:absolute before:inset-x-0 before:top-full before:h-3 before:content-['']",
          )}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <p className="font-mono text-[10px] uppercase tracking-wide text-[var(--color-signal-white)]">
            {project.name}
          </p>
          <dl className="mt-3 space-y-3">
            {project.techStack.map((stack) => (
              <div key={stack.category}>
                <dt className="font-mono text-[10px] uppercase tracking-wide text-[var(--color-echo-gray)]">
                  {stack.category}
                </dt>
                <dd className="mt-1.5">
                  <ul className="flex flex-wrap gap-1.5">
                    {stack.technologies.map((t) => (
                      <li key={`${stack.category}-${t}`}>
                        <span
                          title={stack.tooltip ?? undefined}
                          className="inline-flex rounded-sm border border-[var(--color-void-gray)] bg-[var(--color-deep-space)] px-2 py-1 font-mono text-[11px] uppercase tracking-wide text-[var(--color-echo-gray)]"
                        >
                          {t}
                        </span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </div>
  );
}
