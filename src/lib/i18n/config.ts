import { env } from "@/lib/env";

export const locales = ["ko", "en"] as const;
export type Locale = (typeof locales)[number];
export type I18nMode = "single" | "domain";

export const i18nMode: I18nMode = env.NEXT_PUBLIC_I18N_MODE;
export const defaultLocale: Locale = env.NEXT_PUBLIC_DEFAULT_LOCALE;

function normalizeHost(value: string): string {
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return new URL(value).host;
  }

  return value.replace(/\/$/, "");
}

function buildOrigin(host: string): string {
  if (host.startsWith("http://") || host.startsWith("https://")) {
    const url = new URL(host);
    return url.origin;
  }

  const hostname = host.split(":")[0] ?? host;
  if (hostname === "localhost" || hostname.endsWith(".localhost") || hostname === "127.0.0.1") {
    return `http://${host}`;
  }

  return `https://${host}`;
}

function requireLocaleHost(locale: Locale, value: string | undefined): string {
  if (value) return normalizeHost(value);

  throw new Error(`NEXT_PUBLIC_SITE_HOST_${locale.toUpperCase()} 환경변수가 필요합니다.`);
}

export const siteHost = normalizeHost(env.NEXT_PUBLIC_SITE_HOST);

export const localeDomains: Record<Locale, string> = {
  ko: i18nMode === "domain" ? requireLocaleHost("ko", env.NEXT_PUBLIC_SITE_HOST_KO) : siteHost,
  en: i18nMode === "domain" ? requireLocaleHost("en", env.NEXT_PUBLIC_SITE_HOST_EN) : siteHost,
};

export const activeLocales: readonly Locale[] = i18nMode === "single" ? [defaultLocale] : locales;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function isActiveLocale(value: string | undefined): value is Locale {
  if (!value) return false;

  return activeLocales.includes(value as Locale);
}

export function getLocaleHost(locale: Locale): string {
  if (i18nMode === "domain") return localeDomains[locale];

  return siteHost;
}

export function getLocaleUrl(locale: Locale): string {
  return buildOrigin(getLocaleHost(locale));
}
