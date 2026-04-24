import { activeLocales, getLocaleHost, getLocaleUrl, locales, type Locale } from "@/lib/i18n/config";

export const siteConfig = {
  name: "template-typescript-nextjs",
  description: {
    ko: "Next.js 기반 퍼블릭 웹앱 스타터",
    en: "Public web app starter built on Next.js",
  },
  activeLocales,
  hosts: Object.fromEntries(locales.map((locale) => [locale, getLocaleHost(locale)])) as Record<Locale, string>,
  urls: Object.fromEntries(locales.map((locale) => [locale, getLocaleUrl(locale)])) as Record<Locale, string>,
};

export function getSiteUrl(locale: Locale): string {
  return siteConfig.urls[locale];
}
