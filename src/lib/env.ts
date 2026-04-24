import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    API_BASE_URL: z.string().url(),
    SENTRY_DSN: z.string().url().optional(),
    SENTRY_AUTH_TOKEN: z.string().optional(),
    SENTRY_ORG: z.string().optional(),
    SENTRY_PROJECT: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_I18N_MODE: z.enum(["single", "domain"]).default("single"),
    NEXT_PUBLIC_SITE_HOST: z.string().min(1),
    NEXT_PUBLIC_SITE_HOST_KO: z.string().min(1).optional(),
    NEXT_PUBLIC_SITE_HOST_EN: z.string().min(1).optional(),
    NEXT_PUBLIC_DEFAULT_LOCALE: z.enum(["ko", "en"]).default("ko"),
    NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    API_BASE_URL: process.env.API_BASE_URL,
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    NEXT_PUBLIC_I18N_MODE: process.env.NEXT_PUBLIC_I18N_MODE,
    NEXT_PUBLIC_SITE_HOST: process.env.NEXT_PUBLIC_SITE_HOST,
    NEXT_PUBLIC_SITE_HOST_KO: process.env.NEXT_PUBLIC_SITE_HOST_KO,
    NEXT_PUBLIC_SITE_HOST_EN: process.env.NEXT_PUBLIC_SITE_HOST_EN,
    NEXT_PUBLIC_DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
