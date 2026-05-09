import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "VizionScop3",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0f",
    theme_color: "#00f0ff",
    icons: [{ src: "/favicon.ico", type: "image/x-icon", sizes: "48x48" }],
  };
}
