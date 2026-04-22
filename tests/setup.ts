import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

process.env.NEXT_PUBLIC_SITE_HOST_KO ??= "http://localhost:3000";
process.env.NEXT_PUBLIC_SITE_HOST_EN ??= "http://localhost:3000";
process.env.NEXT_PUBLIC_API_BASE_URL ??= "http://localhost:4000";

afterEach(() => {
  cleanup();
});
