import { afterEach, describe, expect, it, vi } from "vitest";

async function importConfig() {
  vi.resetModules();
  return import("@/lib/i18n/config");
}

describe("TestI18nConfig", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("test_single_모드일_때_기본_호스트와_기본_로케일만_활성화_된다", async () => {
    vi.stubEnv("NEXT_PUBLIC_I18N_MODE", "single");
    vi.stubEnv("NEXT_PUBLIC_SITE_HOST", "localhost:3000");
    vi.stubEnv("NEXT_PUBLIC_DEFAULT_LOCALE", "ko");

    const config = await importConfig();

    expect(config.activeLocales).toEqual(["ko"]);
    expect(config.getLocaleHost("ko")).toBe("localhost:3000");
    expect(config.getLocaleHost("en")).toBe("localhost:3000");
    expect(config.getLocaleUrl("ko")).toBe("http://localhost:3000");
    expect(config.isActiveLocale("en")).toBe(false);
  });

  it("test_domain_모드일_때_로케일별_호스트와_전체_로케일이_활성화_된다", async () => {
    vi.stubEnv("NEXT_PUBLIC_I18N_MODE", "domain");
    vi.stubEnv("NEXT_PUBLIC_SITE_HOST", "example.com");
    vi.stubEnv("NEXT_PUBLIC_SITE_HOST_KO", "ko.example.com");
    vi.stubEnv("NEXT_PUBLIC_SITE_HOST_EN", "en.example.com");
    vi.stubEnv("NEXT_PUBLIC_DEFAULT_LOCALE", "ko");

    const config = await importConfig();

    expect(config.activeLocales).toEqual(["ko", "en"]);
    expect(config.getLocaleHost("ko")).toBe("ko.example.com");
    expect(config.getLocaleHost("en")).toBe("en.example.com");
    expect(config.getLocaleUrl("en")).toBe("https://en.example.com");
    expect(config.isActiveLocale("en")).toBe(true);
  });
});
