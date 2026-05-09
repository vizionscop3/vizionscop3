"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { Button } from "@/components/ui/Button";

const CalIframe = dynamic(() => import("@/components/forms/CalEmbed"), {
  ssr: false,
  loading: () => (
    <div
      className="mt-4 min-h-[600px] w-full animate-pulse rounded-md border border-[var(--color-void-gray)] bg-[var(--color-deep-space)]"
      aria-hidden
    />
  ),
});

export function CalEmbedGate() {
  const [show, setShow] = useState(false);
  const username = process.env.NEXT_PUBLIC_CAL_USERNAME ?? "vizionscop3";
  const href = `https://cal.com/${username}`;

  return (
    <div className="mt-4 space-y-3">
      {show ? (
        <CalIframe />
      ) : (
        <>
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => setShow(true)}
          >
            Load scheduling widget
          </Button>
          <p className="text-sm text-[var(--color-echo-gray)]">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center font-medium text-[var(--color-signal-white)] underline decoration-[var(--color-electric-cyan)] decoration-2 underline-offset-2"
            >
              Open Cal.com in a new tab
            </a>
          </p>
        </>
      )}
    </div>
  );
}
