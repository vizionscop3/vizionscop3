import type { Project } from "@/lib/projects/types";
import type { ProjectSlug } from "@/lib/constants";

const ph = (
  w: number,
  h: number,
  text: string,
): Pick<Project["heroImage"], "src" | "width" | "height"> => ({
  src: `https://placehold.co/${w}x${h}/1a1a2e/00f0ff/png?text=${encodeURIComponent(text)}`,
  width: w,
  height: h,
});

export const projects: Project[] = [
  {
    slug: "the-masjid",
    name: "The Masjid",
    tagline:
      "An Islamic prayer companion built on RAG over 36,313+ hadiths.",
    status: "live",
    featured: true,
    order: 1,
    description:
      "A spiritually grounded mobile application for prayer times, qibla direction, and AI-assisted hadith research grounded in authentic sources.",
    challenge:
      "[PLACEHOLDER: 2–3 paragraphs on the gap, audience, and why this product exists.]",
    approach:
      "[PLACEHOLDER: RAG architecture, vectorization, location/offline decisions, and key technical choices.]",
    outcome:
      "[PLACEHOLDER: what shipped, distribution status, and honest next steps.]",
    architectureCaption:
      "RAG retrieval over a structured hadith corpus, location-aware prayer logic, and mobile-first delivery.",
    industry: "religious",
    platform: ["ios", "android", "web"],
    timeline: "[PLACEHOLDER: timeline]",
    heroImage: {
      ...ph(1920, 1080, "The+Masjid"),
      alt: "The Masjid app interface preview",
      caption: "[PLACEHOLDER: hero caption]",
    },
    galleryImages: [
      {
        ...ph(1200, 800, "Screen+1"),
        alt: "[PLACEHOLDER: screen 1 description]",
        caption: "[PLACEHOLDER]",
      },
      {
        ...ph(1200, 800, "Screen+2"),
        alt: "[PLACEHOLDER: screen 2 description]",
        caption: "[PLACEHOLDER]",
      },
    ],
    techStack: [
      {
        category: "Mobile",
        technologies: ["React Native", "Expo"],
        tooltip: "Cross-platform delivery with native UX patterns.",
      },
      {
        category: "AI/ML",
        technologies: ["Anthropic API", "RAG"],
        tooltip: "Retrieval-augmented answers over a curated corpus.",
      },
      {
        category: "Database",
        technologies: ["Pinecone", "Supabase"],
        tooltip: "Vectors for semantic search; Postgres for app data.",
      },
      {
        category: "Infrastructure",
        technologies: ["Vercel", "Edge functions"],
        tooltip: "Edge-ready APIs where latency matters.",
      },
    ],
    metrics: [
      {
        label: "Hadiths indexed",
        value: "36,313+",
        highlight: true,
      },
      {
        label: "Languages supported",
        value: "[PLACEHOLDER]",
        highlight: false,
      },
      {
        label: "Active users",
        value: "[PLACEHOLDER]",
        highlight: false,
      },
    ],
    links: {
      liveUrl: "[PLACEHOLDER: app or web URL]",
      appStoreUrl: "[PLACEHOLDER: App Store]",
      playStoreUrl: "[PLACEHOLDER: Play Store]",
    },
    theme: {
      primary: "#10B981",
      accent: "#F59E0B",
      surface: "#0A1F1C",
      motion: "breathing",
    },
    filters: ["all", "ai", "mobile"],
    metaTitle: "The Masjid",
    metaDescription:
      "Islamic prayer companion with AI-assisted hadith research over 36,313+ hadiths.",
  },
  {
    slug: "t-trac",
    name: "T-Trac",
    tagline:
      "HRT medication tracking built for transgender men, with privacy designed in from day one.",
    status: "beta",
    featured: true,
    order: 2,
    description:
      "A clinical, trustworthy mobile experience for injection logging, journaling, and care coordination — with health data treated as sacred.",
    challenge:
      "[PLACEHOLDER: frame health privacy as the lead — user need, regulatory context, and product intent.]",
    approach:
      "[PLACEHOLDER: React Native/Expo, Supabase, vector memory where applicable, and compliance posture.]",
    outcome:
      "[PLACEHOLDER: beta status, tester count only if real, roadmap.]",
    architectureCaption:
      "Mobile client on Expo, Supabase for auth/data, and careful separation of PHI from analytics surfaces.",
    industry: "healthcare",
    platform: ["ios", "android"],
    timeline: "[PLACEHOLDER: timeline]",
    heroImage: {
      ...ph(1920, 1080, "T-Trac"),
      alt: "T-Trac app shell preview (no real user data)",
      caption: "UI shell only — no real user data in marketing screenshots.",
    },
    galleryImages: [
      {
        ...ph(1200, 800, "T-Trac+1"),
        alt: "Placeholder dashboard shell",
        caption: "[PLACEHOLDER]",
      },
      {
        ...ph(1200, 800, "T-Trac+2"),
        alt: "Placeholder history shell",
        caption: "[PLACEHOLDER]",
      },
    ],
    techStack: [
      {
        category: "Mobile",
        technologies: ["React Native", "Expo"],
        tooltip: "Ship fast on iOS and Android with shared codebase.",
      },
      {
        category: "Backend",
        technologies: ["Supabase"],
        tooltip: "Postgres, auth, and row-level security patterns.",
      },
      {
        category: "AI/ML",
        technologies: ["Anthropic API", "Pinecone"],
        tooltip: "Optional retrieval for coaching surfaces — scoped and audited.",
      },
      {
        category: "Authentication",
        technologies: ["Auth0"],
        tooltip: "Enterprise-grade identity where required.",
      },
      {
        category: "Compliance",
        technologies: ["HIPAA-conscious design"],
        tooltip: "Data minimization, access controls, and audit-friendly flows.",
      },
    ],
    metrics: [
      {
        label: "Beta phase",
        value: "Phase 4",
        highlight: true,
      },
      {
        label: "Beta testers",
        value: "[PLACEHOLDER: only if verified]",
        highlight: false,
      },
    ],
    links: {
      liveUrl: "[PLACEHOLDER: Expo / TestFlight / waitlist URL]",
    },
    theme: {
      primary: "#0EA5E9",
      accent: "#00F0FF",
      surface: "#0A1929",
      motion: "precise",
    },
    filters: ["all", "ai", "mobile", "healthcare"],
    metaTitle: "T-Trac",
    metaDescription:
      "HRT tracking for transgender men — privacy-first, clinical UX, HIPAA-conscious engineering.",
  },
  {
    slug: "vizionfit-pro",
    name: "VizionFit Pro",
    tagline:
      "An AI fitness platform combining expert training methodologies with personalization.",
    status: "in-development",
    featured: true,
    order: 3,
    description:
      "Mobile-first coaching that respects biomechanics, progressive overload, and individual readiness signals.",
    challenge:
      "[PLACEHOLDER: who it's for and the coaching gap you're solving.]",
    approach:
      "[PLACEHOLDER: AI personalization, content pipeline, and mobile architecture.]",
    outcome:
      "[PLACEHOLDER: current status — waitlist, beta, or internal dogfood.]",
    architectureCaption:
      "Mobile client, Supabase backend, and model-driven programming with human-in-the-loop review.",
    industry: "fitness",
    platform: ["ios", "android"],
    timeline: "[PLACEHOLDER: timeline]",
    heroImage: {
      ...ph(1920, 1080, "VizionFit"),
      alt: "VizionFit Pro product preview",
      caption: "[PLACEHOLDER]",
    },
    galleryImages: [
      {
        ...ph(1200, 800, "VF+1"),
        alt: "[PLACEHOLDER]",
        caption: "[PLACEHOLDER]",
      },
    ],
    techStack: [
      {
        category: "Mobile",
        technologies: ["React Native"],
        tooltip: "Training flows optimized for thumb reach and gym context.",
      },
      {
        category: "Backend",
        technologies: ["Supabase"],
        tooltip: "User profiles, programming history, and session data.",
      },
      {
        category: "AI/ML",
        technologies: ["Anthropic API"],
        tooltip: "Personalized explanations and program adjustments.",
      },
    ],
    metrics: [
      {
        label: "Status",
        value: "In development",
        highlight: true,
      },
    ],
    links: {
      liveUrl: "[PLACEHOLDER: waitlist or marketing page]",
    },
    theme: {
      primary: "#EF4444",
      accent: "#FFB800",
      surface: "#1A0808",
      motion: "kinetic",
    },
    filters: ["all", "ai", "mobile"],
    metaTitle: "VizionFit Pro",
    metaDescription:
      "AI-native fitness coaching — expert methodologies, mobile-first execution.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);
}

export function getAllProjectsSorted(): Project[] {
  return [...projects].sort((a, b) => a.order - b.order);
}

export function getNextProjectSlug(current: ProjectSlug): ProjectSlug {
  const sorted = getAllProjectsSorted();
  const idx = sorted.findIndex((p) => p.slug === current);
  if (idx === -1) return sorted[0]!.slug;
  return sorted[(idx + 1) % sorted.length]!.slug;
}
