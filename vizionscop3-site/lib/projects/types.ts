import type { ProjectSlug } from "@/lib/constants";

export type ProjectStatus = "live" | "beta" | "in-development";

export type ProjectPlatform = "web" | "ios" | "android" | "desktop";

export type ProjectIndustry =
  | "religious"
  | "healthcare"
  | "fitness"
  | "finance"
  | "education"
  | "enterprise"
  | "nonprofit"
  | "other";

export type TechCategory =
  | "Frontend"
  | "Backend"
  | "AI/ML"
  | "Database"
  | "Mobile"
  | "Infrastructure"
  | "Authentication"
  | "Compliance";

export interface ProjectTechStack {
  category: TechCategory;
  technologies: string[];
  tooltip?: string;
}

export interface ProjectTheme {
  primary: string;
  accent: string;
  surface: string;
  motion: "breathing" | "precise" | "kinetic" | "normal";
  audio?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  highlight: boolean;
}

export interface ProjectLinks {
  liveUrl?: string;
  githubUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  caseStudyUrl?: string;
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}

export interface Project {
  slug: ProjectSlug;
  name: string;
  tagline: string;
  status: ProjectStatus;
  featured: boolean;
  order: number;
  description: string;
  challenge: string;
  approach: string;
  outcome: string;
  architectureCaption: string;
  industry: ProjectIndustry;
  platform: ProjectPlatform[];
  timeline: string;
  heroImage: ProjectScreenshot;
  galleryImages: ProjectScreenshot[];
  logoIcon?: string;
  techStack: ProjectTechStack[];
  metrics: ProjectMetric[];
  links: ProjectLinks;
  theme: ProjectTheme;
  filters: ("all" | "ai" | "mobile" | "healthcare")[];
  metaTitle?: string;
  metaDescription?: string;
}
