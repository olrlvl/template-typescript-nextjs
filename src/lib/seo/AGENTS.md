<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-04-22 | Updated: 2026-04-22 -->

# seo

## Purpose

SEO 메타 빌더. Next.js `Metadata` 객체와 JSON-LD 스니펫을 로케일별로 일관되게 생성한다.
App Router 의 `generateMetadata`, `layout.tsx`, OG/robots/sitemap 이 이 유틸을 소비한다.

## Key Files

| File | Description |
|------|-------------|
| `metadata.ts` | `buildMetadata({ locale, title?, description?, path })` — 제목 패턴 `${title} \| ${siteName}`, `metadataBase`, `alternates.languages` (hreflang), OpenGraph, Twitter 카드를 생성 |
| `json-ld.ts` | `websiteJsonLd(locale)` 과 `organizationJsonLd(locale)` — schema.org WebSite/Organization JSON-LD |

## For AI Agents

### Working In This Directory

- 페이지별 메타데이터는 `buildMetadata(...)` 의 반환값을 그대로 `export const metadata` 또는 `generateMetadata` 에서 반환한다.
- `description` 을 생략하면 `siteConfig.description[locale]` 이 기본값으로 쓰인다.
- `path` 는 항상 절대 경로(`/`, `/posts/hello`) 로 넘긴다. 쿼리스트링은 canonical/alternates 에 포함시키지 않는다.
- 새 JSON-LD 타입 추가 시 같은 파일에 빌더 함수로 노출하고, `layout.tsx` 의 `<script type="application/ld+json">` 주입 패턴을 재사용한다.
- `alternates.languages` 는 반드시 전체 로케일을 포함해야 Google 이 hreflang 을 올바르게 인식한다.

### Testing Requirements

- 현재 단위 테스트 없음. 스냅샷 테스트가 필요해지면 `tests/lib/seo/` 에 추가.
- 결과물은 빌드 후 `.next/server/app/<route>.html` 또는 live dev 서버 HTML 을 확인.

### Common Patterns

```ts
export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  return buildMetadata({ locale, title: "About", path: "/about" });
}
```

## Dependencies

### Internal

- `@/config/site` — `siteConfig` (name, description, urls)
- `@/lib/i18n/config` — `locales`, `Locale`

### External

- `next` — `Metadata` 타입

<!-- MANUAL: -->
