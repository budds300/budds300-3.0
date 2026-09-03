import { ImageResponse } from "next/og";
import { getGlobalSettings } from "@/lib/frontend-data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const settings = await getGlobalSettings();
  const title = settings?.headline || "Full-Stack / Software Engineer";
  const bio =
    settings?.bio || "Building fast, reliable web products.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0a",
          color: "#f5f5f5",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: "#39ff88",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Portfolio
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 960,
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: "#a1a1aa",
            maxWidth: 900,
          }}
        >
          {bio}
        </div>
      </div>
    ),
    { ...size },
  );
}
