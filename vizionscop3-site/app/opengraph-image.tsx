import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

/** Node runtime: load logo from `public/` for a reliable OG preview (logo, not inline page images). */
export const runtime = "nodejs";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoPath = join(
    process.cwd(),
    "public/assets/brand/vizionscop3-logo.png",
  );
  const logoBuffer = await readFile(logoPath);
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0f",
        }}
      >
        <img
          src={logoSrc}
          alt=""
          style={{
            maxWidth: "560px",
            maxHeight: "320px",
            width: "auto",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>
    ),
    size,
  );
}
