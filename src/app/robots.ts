import type { MetadataRoute } from "next";
import { getLocale } from "next-intl/server";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/lib/i18n/config";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const locale = (await getLocale()) as Locale;
  const baseUrl = siteConfig.urls[locale];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
