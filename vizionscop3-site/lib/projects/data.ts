import type { ProjectSlug } from "@/lib/constants";
import { siteConfig } from "@/lib/constants";
import type { Project } from "@/lib/projects/types";

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
      "Muslims worldwide rely on accurate prayer times, reliable qibla direction, and trustworthy religious reference material. Generic assistants can summarize inaccurately or omit citations, which is unacceptable for sacred text.\n\nThe Masjid exists for people who want daily prayer support and serious hadith exploration in one calm, respectful experience — built with sourcing discipline, not generic chat behavior.",
    approach:
      "The product pairs a large, structured hadith corpus (36,313+ records) with retrieval-augmented generation so answers stay anchored to real passages rather than model improvisation. Vectors (Pinecone) power semantic discovery; Supabase holds application data with conventional access patterns.\n\nPrayer logic respects location and calculation preferences. The mobile shell is React Native and Expo so the same codebase ships to iOS and Android with native-feeling navigation and offline-friendly surfaces where it matters.",
    outcome:
      "The corpus is indexed and the core mobile experience is in active development toward a demo-ready milestone for stakeholder review (including Pursuit AI Native Program presentation goals). Distribution through app stores will follow final QA, accessibility passes, and scholar-aligned review of retrieval behavior.\n\nNext steps are hardened RAG evaluation, expanded UX polish, and production release planning.",
    architectureCaption:
      "RAG retrieval over a structured hadith corpus, location-aware prayer logic, and mobile-first delivery.",
    industry: "religious",
    platform: ["ios", "android", "web"],
    timeline: "2024–present — active engineering toward public release",
    heroImage: {
      src: "/assets/marketing/featured-the-masjid.svg",
      width: 213,
      height: 150,
      alt: "The Masjid logo and tagline — marketing graphic",
      caption:
        "Brand-forward preview of The Masjid — contemplative palette and product positioning.",
    },
    galleryImages: [
      {
        src: "/assets/marketing/featured-the-masjid.svg",
        width: 213,
        height: 150,
        alt: "The Masjid marketing lockup on deep emerald background",
        caption:
          "Representative marketing visual — in-app screens reflect prayer, qibla, and hadith flows.",
      },
      {
        src: "/assets/marketing/featured-the-masjid.png",
        width: 1200,
        height: 675,
        alt: "The Masjid wordmark and prayer-companion positioning",
        caption:
          "Product thesis: accuracy, citation-minded AI, and mobile-first ritual support.",
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
        technologies: ["Vercel", "Serverless APIs"],
        tooltip: "Hosted APIs and previews aligned with the rest of the VizionScop3 stack.",
      },
    ],
    metrics: [
      {
        label: "Hadiths indexed",
        value: "36,313+",
        highlight: true,
      },
      {
        label: "Authenticity taxonomy",
        value: "Sahih · Hasan · Da'if",
        highlight: false,
      },
      {
        label: "Delivery",
        value: "iOS · Android · Web",
        highlight: false,
      },
    ],
    links: {
      liveUrl: `${siteConfig.url}/contact`,
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
      "HRT medication tracking built for transgender men, with HIPAA-conscious safeguards and privacy as the default.",
    status: "beta",
    featured: true,
    order: 2,
    description:
      "A clinical, trustworthy mobile experience for injection logging, journaling, and care coordination — with health data treated as sacred.",
    challenge:
      "Trans masculine people managing HRT need a private, structured place to log injections, capture how they feel over time, and share context with care teams when they choose to — without surveillance-style analytics or vague privacy policies.\n\nHealth-adjacent products fail when security is bolted on late: T-Trac is framed so data minimization, access control, and audit-friendly patterns are part of the product story from the first screen, not an appendix.",
    approach:
      "T-Trac ships on React Native and Expo for a single codebase across iOS and Android. Supabase provides Postgres, authentication, and row-level security so users only ever touch their own rows.\n\nOptional AI-assisted coaching surfaces use Anthropic and Pinecone with narrow scopes and review-friendly logging — never as a substitute for clinical advice. Where organizations require it, Auth0 integrates for enterprise-grade identity; flows are designed so sensitive fields stay out of marketing and error telemetry.",
    outcome:
      "The product is in Phase 4 invite-only beta: core injection and journaling loops are implemented, privacy boundaries are explicit in the architecture, and feedback is shaping reporting and reminder behavior.\n\nPublic launch timing follows security review, store compliance, and continued validation with trusted testers — not arbitrary deadlines.",
    architectureCaption:
      "Mobile client on Expo, Supabase for auth/data, and careful separation of PHI from analytics surfaces.",
    industry: "healthcare",
    platform: ["ios", "android"],
    timeline: "2024–present — Phase 4 invite-only beta",
    heroImage: {
      src: "/assets/marketing/featured-t-trac.svg",
      width: 213,
      height: 150,
      alt: "T-Trac logo and tagline — marketing graphic (no real user data)",
      caption:
        "Marketing-only graphic — case study visuals are shells; no real PHI or user metrics are shown.",
    },
    galleryImages: [
      {
        src: "/assets/marketing/featured-t-trac.svg",
        width: 213,
        height: 150,
        alt: "T-Trac clinical-blue branding and product positioning",
        caption:
          "Design direction: precise typography and calm surfaces suited to health journaling.",
      },
      {
        src: "/assets/marketing/featured-t-trac.svg",
        width: 213,
        height: 150,
        alt: "T-Trac product mark — injection tracking and wellness focus",
        caption:
          "Feature focus: structured injection history, mood and notes, and privacy-first defaults.",
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
        label: "Access model",
        value: "Invite-only",
        highlight: false,
      },
      {
        label: "Data posture",
        value: "RLS · min. telemetry",
        highlight: false,
      },
    ],
    links: {
      liveUrl: `${siteConfig.url}/contact`,
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
      "An AI fitness platform combining Charles Glass and Jeff Cavaliere methodologies with adaptive coaching.",
    status: "in-development",
    featured: true,
    order: 3,
    description:
      "Mobile-first coaching that respects biomechanics, progressive overload, and individual readiness signals — with expert programming vocabulary translated into daily sessions you can actually run in the gym.",
    challenge:
      "Most fitness apps are generic rep counters or static PDF programs. Serious trainees want coaching language rooted in established strength principles, but still need guidance that adapts when sleep, stress, or schedule changes.\n\nVizionFit Pro targets lifters who outgrow cookie-cutter templates yet still want structure, accountability, and explanations they can trust.",
    approach:
      "The stack centers on React Native for a gym-ready UI (thumb reach, glanceable sets, fast logging) and Supabase for profiles, training history, and progression data.\n\nAnthropic-powered assists generate session copy, adjustments, and teaching moments within guardrails defined by VizionScop3 — expert methodologies inform the system prompts and review checklist, not anonymous internet advice.",
    outcome:
      "VizionFit Pro remains in active product development: programming models, coaching tone, and analytics hooks are being validated internally before a broader beta.\n\nPartnerships, waitlist timing, and store submission will be announced once the training loop meets our bar for safety copy and performance. Interested athletes and gyms can reach out via the contact page for early access conversations.",
    architectureCaption:
      "Mobile client, Supabase backend, and model-driven programming with human-in-the-loop review.",
    industry: "fitness",
    platform: ["ios", "android"],
    timeline: "2025–present — engineering and internal validation",
    heroImage: {
      src: "/assets/work/vizionfit-pro-hero.svg",
      width: 213,
      height: 150,
      alt: "VizionFit Pro product preview",
      caption:
        "HUD-inspired hero — kinetic red and gold system tied to VizionFit Pro's training identity.",
    },
    galleryImages: [
      {
        src: "/assets/work/vizionfit-pro-hero.svg",
        width: 213,
        height: 150,
        alt: "VizionFit Pro HUD-style product mark",
        caption:
          "Visual language emphasizes power, clarity, and motion — matching in-app coaching energy.",
      },
      {
        src: "/assets/work/vizionfit-pro-hero.png",
        width: 1200,
        height: 675,
        alt: "VizionFit Pro alternate hero treatment",
        caption:
          "Alternate raster treatment for marketing — full UI previews ship with the beta program.",
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
      {
        label: "Client",
        value: "React Native",
        highlight: false,
      },
      {
        label: "Coaching model",
        value: "Expert + AI assist",
        highlight: false,
      },
    ],
    links: {
      liveUrl: `${siteConfig.url}/contact`,
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
      "AI fitness coaching grounded in Charles Glass and Jeff Cavaliere methodologies — mobile-first, in active development at VizionScop3.",
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
