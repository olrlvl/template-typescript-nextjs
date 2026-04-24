import { getRequestConfig } from "next-intl/server";
import { isActiveLocale } from "./config";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = isActiveLocale(requested) ? requested : routing.defaultLocale;

  const messages = (await import(`../../../locale/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
