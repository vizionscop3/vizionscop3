const DEFAULT_SITE_URL = "https://vizionscop3.com";

/** Absolute origin for metadata and JSON-LD; avoids `new URL()` throwing when the env omits a scheme (e.g. `localhost:3000`). */
export function normalizeSiteUrl(raw?: string | null): string {
  const trimmed = raw?.trim().replace(/\/$/, "") ?? "";
  if (!trimmed) return DEFAULT_SITE_URL;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/^(localhost|127\.0\.0\.1)(\:|$)/i.test(trimmed)) {
    return `http://${trimmed}`;
  }
  return `https://${trimmed}`;
}

const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

/** Cal.com booking URL for embeds and CTAs. Override with NEXT_PUBLIC_CAL_EMBED_URL, or set NEXT_PUBLIC_CAL_USERNAME (+ optional NEXT_PUBLIC_CAL_EVENT_PATH). */
function resolveCalBooking(): { username: string; embedUrl: string } {
  const override = process.env.NEXT_PUBLIC_CAL_EMBED_URL?.trim();
  if (override) {
    try {
      const href = /^https?:\/\//i.test(override) ? override : `https://${override}`;
      const u = new URL(href);
      const host = u.hostname.replace(/^www\./i, "");
      if (host === "cal.com" || host.endsWith(".cal.com")) {
        const pathParts = u.pathname.split("/").filter(Boolean);
        const username = pathParts[0] ?? "ceovizion";
        const embedUrl = `${u.origin}${u.pathname}`.replace(/\/$/, "");
        return { username, embedUrl };
      }
    } catch {
      /* use composed URL below */
    }
  }
  const username =
    process.env.NEXT_PUBLIC_CAL_USERNAME?.trim() || "ceovizion";
  const eventPath =
    process.env.NEXT_PUBLIC_CAL_EVENT_PATH?.trim().replace(/^\/+|\/+$/g, "") ??
    "";
  const embedUrl = eventPath
    ? `https://cal.com/${username}/${eventPath}`
    : `https://cal.com/${username}`;
  return { username, embedUrl };
}

const calBooking = resolveCalBooking();

export const siteConfig = {
  name: "VizionScop3 LLC",
  legalName: "VizionScop3 LLC",
  domain: "vizionscop3.com",
  url: SITE_URL,
  description:
    "VizionScop3 is an AI-native technology studio building serious tools for nonprofits, businesses, and enterprises.",
  ogImage: "/opengraph-image",
  founder: {
    name: "Denward Lee Aulder",
    handle: "Vizion",
    title: "Founder & CEO",
  },
  contact: {
    email: "contact@vizionscop3.com",
    phone: "+1 516-395-7264",
    address: {
      line1: "308 Marion street",
 
      city: "Brooklyn",
      state: "NY",
      postalCode: "11233",
 
      country: "US",
    },
  },
  social: {
    github: "https://github.com/vizionscop3",
    linkedin: "https://www.linkedin.com/in/leeaulder",
    twitter: "https://x.com/ceovizion",
  },
  calendar: {
    username: calBooking.username,
    embedUrl: calBooking.embedUrl,
  },
} as const;

export const navigation = {
  primary: [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footer: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;

export const credibilityPills = [
  "U.S. Air Force veteran",
  "Top Secret clearance",
  "Brooklyn, NY",
] as const;

/** Static fallback; superseded by Supabase `build_status` when wired (V2.5). */
export const buildStatusStatic = {
  isLive: true,
  messages: [
    "Currently shipping: T-Trac Phase 4 beta",
    "Now accepting Q3 project briefs",
    "The Masjid: 36,313+ hadiths indexed",
    "Constellation map — three AI-native products, one thesis",
  ],
} as const;

export const PROJECT_SLUGS = [
  "the-masjid",
  "t-trac",
  "vizionfit-pro",
] as const;

export type ProjectSlug = (typeof PROJECT_SLUGS)[number];
