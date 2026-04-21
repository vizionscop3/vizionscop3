import { urlFor } from "./client";
import type { SanityProject } from "./types";

export const DEFAULT_PROJECT_IMAGE =
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80";

export function projectHeroUrl(project: SanityProject): string {
  if (!project.heroImage?.asset) return DEFAULT_PROJECT_IMAGE;
  try {
    return urlFor(project.heroImage).width(1200).height(675).url();
  } catch {
    return DEFAULT_PROJECT_IMAGE;
  }
}
