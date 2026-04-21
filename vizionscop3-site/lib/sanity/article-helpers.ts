import { urlFor } from "./client";
import type { SanityArticle } from "./types";

export const DEFAULT_ARTICLE_IMAGE =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80";

export function articleHeroUrl(article: {
  heroImage?: SanityArticle["heroImage"] | null;
}): string {
  if (!article.heroImage?.asset) return DEFAULT_ARTICLE_IMAGE;
  try {
    return urlFor(article.heroImage).width(800).height(450).url();
  } catch {
    return DEFAULT_ARTICLE_IMAGE;
  }
}
