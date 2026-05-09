import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/constants";

export const runtime = "edge";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background: "#0a0a0f",
          color: "#fafafa",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: "-2px",
          }}
        >
          {siteConfig.name.replace(" LLC", "")}
          <span style={{ color: "#00f0ff" }}>3</span>
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 28,
            color: "#9ca3af",
            maxWidth: 900,
            lineHeight: 1.35,
          }}
        >
          {siteConfig.description}
        </div>
      </div>
    ),
    size,
  );
}
