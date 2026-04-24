import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { activeLocales, type Locale } from "@/lib/i18n/config";

interface BuildMetadataParams {
  locale: Locale;
  title?: string;
  description?: string;
  path?: string;
}

export function buildMetadata({ locale, title, description, path = "/" }: BuildMetadataParams): Metadata {
  const siteName = siteConfig.name;
  const defaultDescription = siteConfig.description[locale];
  const resolvedTitle = title ? `${title} | ${siteName}` : siteName;
  const resolvedDescription = description ?? defaultDescription;
  const currentUrl = `${siteConfig.urls[locale]}${path}`;

  const languages: Record<string, string> = {};
  for (const l of activeLocales) {
    languages[l] = `${siteConfig.urls[l]}${path}`;
  }

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    metadataBase: new URL(siteConfig.urls[locale]),
    alternates: {
      canonical: currentUrl,
      languages,
    },
    openGraph: {
      type: "website",
      url: currentUrl,
      siteName,
      title: resolvedTitle,
      description: resolvedDescription,
      locale: locale === "ko" ? "ko_KR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
    },
  };
}
