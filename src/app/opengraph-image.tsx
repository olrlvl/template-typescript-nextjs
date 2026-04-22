import { ImageResponse } from "next/og";
import { getLocale } from "next-intl/server";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/lib/i18n/config";

export const runtime = "edge";
export const alt = "template-typescript-nextjs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const locale = (await getLocale()) as Locale;
  const description = siteConfig.description[locale];

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "white",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700 }}>{siteConfig.name}</div>
        <div style={{ fontSize: 32, marginTop: 24, color: "#cbd5e1" }}>{description}</div>
      </div>
    ),
    size,
  );
}
