import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";
import { servicesData } from "@/lib/services-data";
import { industriesData } from "@/lib/industries-data";
import { getArticleSlugs } from "@/lib/sanity/fetch";
import { isSanityConfigured } from "@/lib/sanity/is-configured";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = Object.keys(servicesData).map(
    (slug) => ({
      url: `${baseUrl}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })
  );

  const industryPages: MetadataRoute.Sitemap = Object.keys(industriesData).map(
    (slug) => ({
      url: `${baseUrl}/industries/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  let sanityArticles: MetadataRoute.Sitemap = [];
  if (isSanityConfigured()) {
    try {
      const slugs = await getArticleSlugs();
      sanityArticles = slugs.map((slug) => ({
        url: `${baseUrl}/insights/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.75,
      }));
    } catch {
      sanityArticles = [];
    }
  }

  return [
    ...staticPages,
    ...servicePages,
    ...industryPages,
    ...sanityArticles,
  ];
}
