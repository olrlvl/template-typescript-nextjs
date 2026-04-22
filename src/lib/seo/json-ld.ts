import { siteConfig } from "@/config/site";
import type { Locale } from "@/lib/i18n/config";

export function websiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.urls[locale],
    inLanguage: locale === "ko" ? "ko-KR" : "en-US",
  };
}

export function organizationJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.urls[locale],
  };
}
