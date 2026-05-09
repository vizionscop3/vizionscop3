import type { Metadata } from "next";

import { siteConfig } from "@/lib/constants";

export function buildMetadata({
  title,
  description,
  path = "",
  ogImage,
}: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: [{ url: ogImage ?? siteConfig.ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage ?? siteConfig.ogImage],
    },
    alternates: { canonical: url },
  };
}
