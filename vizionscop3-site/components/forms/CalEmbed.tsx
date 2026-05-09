"use client";

import { siteConfig } from "@/lib/constants";

export default function CalEmbed() {
  const embedBase = siteConfig.calendar.embedUrl;
  const src = embedBase.includes("?")
    ? `${embedBase}&embed=true`
    : `${embedBase}?embed=true`;
  return (
    <iframe
      title="Cal.com scheduling"
      src={src}
      className="mt-4 min-h-[600px] w-full rounded-md border border-[var(--color-void-gray)] bg-[var(--color-deep-space)]"
      loading="lazy"
      allow="payment"
    />
  );
}
