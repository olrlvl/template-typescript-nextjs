import { defineRouting } from "next-intl/routing";
import { defaultLocale, i18nMode, localeDomains, locales } from "./config";

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale,
  localePrefix: "never",
  localeDetection: false,
  ...(i18nMode === "domain" && {
    domains: [
      {
        domain: localeDomains.ko,
        defaultLocale: "ko",
        locales: ["ko"],
      },
      {
        domain: localeDomains.en,
        defaultLocale: "en",
        locales: ["en"],
      },
    ],
  }),
});
