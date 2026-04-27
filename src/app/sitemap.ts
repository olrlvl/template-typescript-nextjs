import type { MetadataRoute } from "next";
import { getLocale } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { activeLocales, type Locale } from "@/lib/i18n/config";

const paths = ["/", "/about"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locale = (await getLocale()) as Locale;
  const baseUrl = siteConfig.urls[locale];

  return paths.map((path) => {
    const languages: Record<string, string> = {};
    for (const l of activeLocales) {
      languages[l] = `${siteConfig.urls[l]}${path}`;
    }

    return {
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1.0 : 0.8,
      alternates: { languages },
    };
  });
}
