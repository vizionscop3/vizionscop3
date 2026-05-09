"use client";

import { Analytics } from "@vercel/analytics/react";

/**
 * `/_vercel/insights/script.js` is only served on the Vercel platform.
 * Omitting the widget locally avoids 404 + console errors (Lighthouse best-practices).
 */
export function AnalyticsProvider() {
  const env = process.env.NEXT_PUBLIC_VERCEL_ENV;
  if (env !== "production" && env !== "preview") {
    return null;
  }
  return <Analytics />;
}
