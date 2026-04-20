import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VizionScop3 - AI-Native Technology Solutions",
    short_name: "VizionScop3",
    description:
      "Full-spectrum technology solutions for nonprofits to enterprises. Web development, mobile apps, custom software, database engineering, AI infrastructure, and consulting.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0F",
    theme_color: "#00F0FF",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
