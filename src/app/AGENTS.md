<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-04-22 | Updated: 2026-04-22 -->

# app

## Purpose

Next.js 16 App Router 엔트리. 루트 `layout.tsx` 가 next-intl 프로바이더와 로컬 Pretendard 폰트 변수를 주입하고,
각 파일은 RSC 기본으로 동작한다. Pages Router 는 사용하지 않는다.

## Key Files

| File | Description |
|------|-------------|
| `layout.tsx` | 루트 레이아웃. Pretendard(로컬) 폰트 변수, `NextIntlClientProvider`, Website JSON-LD 주입. `generateMetadata`로 `buildMetadata` 호출 |
| `page.tsx` | 루트 페이지 (`/`). `getTranslations("Home")` 사용하는 RSC |
| `loading.tsx` | 라우트 세그먼트 로딩 UI. 스피너만 (텍스트 금지 규칙) |
| `error.tsx` | 라우트 세그먼트 에러 바운더리. `'use client'`, `reset()` 버튼 제공 |
| `not-found.tsx` | 404 페이지. `getTranslations("Common")` 사용 |
| `opengraph-image.tsx` | 동적 OG 이미지 생성 (`next/og`, edge runtime, 1200×630) |
| `robots.ts` | `MetadataRoute.Robots`. 로케일별 baseUrl + sitemap URL |
| `sitemap.ts` | `MetadataRoute.Sitemap`. `paths` 배열을 순회하며 hreflang alternates 포함 |

## For AI Agents

### Working In This Directory

- **RSC 우선**. 클라이언트 상태가 필요한 파일만 `'use client'` 최상단 선언 (`error.tsx` 참고).
- 새 라우트 추가: `app/<path>/page.tsx` 생성 → `locale/{ko,en}.json`에 키 추가 → 필요 시 `export const metadata` 또는 `generateMetadata`.
- **로케일 세그먼트(`/ko`, `/en`) 추가 금지**. 도메인 기반 라우팅이므로 URL에 로케일이 나타나선 안 된다.
- 서버 컴포넌트에서 로케일 접근: `const locale = (await getLocale()) as Locale` 패턴 (`@/lib/i18n/config` 의 `Locale` 타입).
- `sitemap.ts`의 `paths` 배열에 공개 라우트를 추가한다. 각 경로는 `priority` 와 `alternates.languages` 를 자동 생성.
- 로딩 UI는 **스피너 또는 스켈레톤만**. "불러오는 중" 같은 텍스트 금지.

### Testing Requirements

- 페이지 단위 통합 테스트 위치는 `tests/app/` (현재 없음). 필요 시 Testing Library + jsdom 조합.
- 빌드 체크: `pnpm build` 로 RSC 컴파일 오류 확인.

### Common Patterns

- 메타데이터 생성: `buildMetadata({ locale, title?, description?, path? })` (`@/lib/seo/metadata`).
- JSON-LD: `websiteJsonLd(locale)` / `organizationJsonLd(locale)` (`@/lib/seo/json-ld`).
- 로케일별 URL: `siteConfig.urls[locale]` (`@/config/site`).

## Dependencies

### Internal

- `@/lib/seo/metadata`, `@/lib/seo/json-ld` — SEO 빌더
- `@/lib/i18n/config` — `Locale` 타입, `locales`
- `@/config/site` — `siteConfig` (name, urls, description)
- `@/styles/globals.css` — `layout.tsx` 에서 import

### External

- `next` — `MetadataRoute`, `ImageResponse`, `Link`
- `next/font/local` — Pretendard
- `next-intl/server` — `getLocale`, `getTranslations`, `getMessages`
- `next-intl` — `NextIntlClientProvider`, `useTranslations`

<!-- MANUAL: -->
