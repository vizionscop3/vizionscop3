import type { MetadataRoute } from "next";

import { PROJECT_SLUGS, siteConfig } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const staticRoutes = [
    "",
    "/work",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];
  const projectRoutes = PROJECT_SLUGS.map((slug) => `/work/${slug}`);
  const paths = [...staticRoutes, ...projectRoutes];
  const now = new Date();
  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
