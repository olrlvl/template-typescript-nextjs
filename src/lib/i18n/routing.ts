import { defineRouting } from "next-intl/routing";
import { defaultLocale, localeDomains, locales } from "./config";

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale,
  localeDetection: false,
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
});
