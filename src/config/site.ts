import { env } from "@/lib/env";
import type { Locale } from "@/lib/i18n/config";

export const siteConfig = {
  name: "template-typescript-nextjs",
  description: {
    ko: "Next.js 기반 퍼블릭 웹앱 스타터",
    en: "Public web app starter built on Next.js",
  },
  hosts: {
    ko: env.NEXT_PUBLIC_SITE_HOST_KO,
    en: env.NEXT_PUBLIC_SITE_HOST_EN,
  } as Record<Locale, string>,
  urls: {
    ko: `https://${env.NEXT_PUBLIC_SITE_HOST_KO}`,
    en: `https://${env.NEXT_PUBLIC_SITE_HOST_EN}`,
  } as Record<Locale, string>,
};

export function getSiteUrl(locale: Locale): string {
  return siteConfig.urls[locale];
}
