import { env } from "@/lib/env";

export const locales = ["ko", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = env.NEXT_PUBLIC_DEFAULT_LOCALE;

export const localeDomains: Record<Locale, string> = {
  ko: env.NEXT_PUBLIC_SITE_HOST_KO,
  en: env.NEXT_PUBLIC_SITE_HOST_EN,
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
