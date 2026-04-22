<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-04-22 | Updated: 2026-04-22 -->

# src

## Purpose

애플리케이션 소스 루트. Next.js 16 App Router, RSC 우선, next-intl 도메인 라우팅 전제.
`@/*` alias는 이 디렉토리를 가리킨다 (`tsconfig.json`, `vitest.config.ts`).

## Key Files

| File | Description |
|------|-------------|
| `middleware.ts` | next-intl `createMiddleware` 래핑. `api`/`_next`/`_vercel`/정적파일 제외 경로에 로케일 라우팅 적용 |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `app/` | App Router 엔트리 — layout, page, robots, sitemap, OG 이미지 (see `app/AGENTS.md`) |
| `config/` | 사이트 상수 — 도메인 맵, 메타 (see `config/AGENTS.md`) |
| `lib/` | 도메인 로직 — api 클라이언트, i18n, SEO, env 검증 (see `lib/AGENTS.md`) |
| `styles/` | 전역 CSS (Tailwind v4) (see `styles/AGENTS.md`) |

## For AI Agents

### Working In This Directory

- 기본은 **RSC**. 클라이언트 상태/이벤트 핸들러가 필요할 때만 파일 최상단에 `'use client'` 지시어를 넣는다.
- 데이터 페칭은 서버 컴포넌트의 `fetch` 또는 `@/lib/api/apiClient`. 클라이언트에서 직접 fetch 금지.
- **`else` 금지**. `if (condition) return;` 형태의 early return을 쓴다. 삼항 연산자는 허용.
- **줄임말 금지** — `usr` → `user`, `Ctx` → `Context`.
- 사용자 대면 문자열은 절대 하드코딩하지 않는다. `locale/{ko,en}.json`에 키를 추가하고 `getTranslations`(서버) 또는 `useTranslations`(클라이언트)로 참조.
- 환경변수는 `@/lib/env`의 `env`로만 접근. `process.env.X` 직접 사용 금지.

### Testing Requirements

- 유닛 테스트는 `tests/` 하위 미러 경로에 둔다 (`src/lib/utils.ts` → `tests/lib/utils.test.ts`).
- `pnpm test` 로 Vitest 실행.
- `pnpm lint && pnpm typecheck` 로 정적 검증.

### Common Patterns

- `@/lib/...` import alias.
- Tailwind utility class는 `cn(...)` (`@/lib/utils`) 로 결합.
- `Metadata` 는 `@/lib/seo/metadata`의 `buildMetadata` 를 통해 생성.

## Dependencies

### Internal

- 루트 `locale/` — `src/lib/i18n/request.ts` 가 동적 import.
- 루트 `public/fonts/PretendardVariable.woff2` — `src/app/layout.tsx` 에서 `localFont`로 로드.

### External

- `next@16`, `react@19`, `next-intl@4`, `@t3-oss/env-nextjs`, `zod`, `ofetch`, `@sentry/nextjs`, `tailwindcss@4`, `clsx`, `tailwind-merge`.

<!-- MANUAL: -->
