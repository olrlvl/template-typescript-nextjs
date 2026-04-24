import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

process.env.NEXT_PUBLIC_I18N_MODE ??= "single";
process.env.NEXT_PUBLIC_SITE_HOST ??= "localhost:3000";
process.env.NEXT_PUBLIC_SITE_HOST_KO ??= "ko.localhost:3000";
process.env.NEXT_PUBLIC_SITE_HOST_EN ??= "en.localhost:3000";
process.env.NEXT_PUBLIC_DEFAULT_LOCALE ??= "ko";
process.env.API_BASE_URL ??= "http://localhost:54000/api/v1";

afterEach(() => {
  cleanup();
});
