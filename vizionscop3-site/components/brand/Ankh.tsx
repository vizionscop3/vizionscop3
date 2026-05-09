"use client";

import { useCallback, useState } from "react";

import { Button } from "@/components/ui/Button";

function AnkhIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3v4" />
      <path d="M10 7h4" />
      <path d="M12 11a3 3 0 0 1 3 3v7H9v-7a3 3 0 0 1 3-3Z" />
      <path d="M9 14H7a2 2 0 0 1-2-2v-1" />
      <path d="M15 14h2a2 2 0 0 0 2-2v-1" />
    </svg>
  );
}

export function AnkhEasterEgg({ className }: { className?: string }) {
  const [, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  const handleClick = useCallback(() => {
    setCount((c) => {
      const n = c + 1;
      if (n >= 3) {
        setOpen(true);
        return 0;
      }
      return n;
    });
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={className}
        aria-label="Ankh symbol (decorative)"
      >
        <AnkhIcon className="h-5 w-5 text-[var(--color-electric-cyan)]" />
      </button>
      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ankh-dialog-title"
        >
          <div className="max-w-md rounded-lg border-2 border-[var(--color-electric-cyan)] bg-[var(--color-midnight)] p-6 shadow-[4px_4px_0_0_var(--color-electric-cyan)]">
            <h2
              id="ankh-dialog-title"
              className="font-display text-xl font-semibold text-[var(--color-signal-white)]"
            >
              Ankh — life and continuity
            </h2>
            <p className="mt-3 text-sm text-[var(--color-echo-gray)]">
              This symbol is a quiet nod to craft with intention: software that
              lasts, documentation that survives handoffs, and systems that
              evolve without losing their center.
            </p>
            <Button
              variant="secondary"
              className="mt-6 w-full"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
