export const siteConfig = {
  name: "VizionScop3 LLC",
  legalName: "VizionScop3 LLC",
  domain: "vizionscop3.com",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://vizionscop3.com",
  description:
    "VizionScop3 is an AI-native technology studio building serious tools for nonprofits, businesses, and enterprises.",
  ogImage: "/opengraph-image",
  founder: {
    name: "Denward Lee Aulder",
    handle: "Vizion",
    title: "Founder & CEO",
  },
  contact: {
    email: "hello@vizionscop3.com",
    phone: "[PLACEHOLDER: business phone]",
    address: {
      line1: "[PLACEHOLDER: registered LLC street address]",
      city: "Brooklyn",
      state: "NY",
      postalCode: "[PLACEHOLDER]",
      country: "US",
    },
  },
  social: {
    github: "https://github.com/vizionscop3",
    linkedin: "[PLACEHOLDER: LinkedIn URL]",
    twitter: "[PLACEHOLDER]",
  },
  calendar: {
    username: "vizionscop3",
    embedUrl: "https://cal.com/vizionscop3/30min",
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
