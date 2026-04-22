<!-- Generated: 2026-04-22 | Updated: 2026-04-22 -->

# AGENTS.md

이 프로젝트는 `CLAUDE.md`의 모든 지침을 따른다. CLAUDE.md는 이 파일의 상위 집합이다.

## 핵심 요약

- 언어: 한국어
- 런타임: Node.js 22, pnpm, Next.js 16 (App Router), React 19
- 스타일: ESLint flat config (`eslint-config-next`), Prettier 없음, early return, 줄임말 금지
- 커밋: Conventional Commits (AI Co-Author 태그 금지)
- i18n: `next-intl` 도메인 기반 라우팅, ko/en 서브도메인. URL에 로케일 세그먼트 없음.
- 테스트: Vitest, `it('test_<조건>_할_때_<결과>_된다', ...)` 네이밍

디렉토리별 로컬 `AGENTS.md`가 있으면 **가장 가까운 파일이 우선**.

## 디렉토리 맵

| Directory | Purpose |
|-----------|---------|
| `src/app/` | App Router 라우트. RSC 기본, `'use client'` 는 파일 최상단 명시 |
| `src/components/` | 공용 UI/레이아웃 컴포넌트 (현재 비어 있음) |
| `src/config/` | 사이트 설정 (`site.ts` — 도메인 맵, 메타) |
| `src/lib/` | 도메인 로직 — `api/`, `i18n/`, `seo/`, `env.ts`, `utils.ts` |
| `src/styles/` | 전역 CSS (Tailwind v4) |
| `src/middleware.ts` | next-intl 도메인 라우팅 |
| `locale/` | i18n 리소스 (`ko.json`, `en.json`) |
| `public/` | 정적 자산 (폰트, favicon, OG) |
| `tests/` | Vitest 유닛 테스트 |
| `.github/workflows/` | CI |
| `.claude/` | Claude Code 설정 (`settings.local.json`은 gitignore) |

## 주요 명령

| Command | Purpose |
|---------|---------|
| `pnpm dev` | 개발 서버 (http://ko.localhost:3000, http://en.localhost:3000) |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm start` | 빌드 결과 실행 |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm test` | Vitest 1회 실행 |

## 새 라우트 추가

1. `src/app/<path>/page.tsx` 생성, 기본은 RSC
2. `locale/{ko,en}.json`에 필요 키 추가
3. SEO가 필요하면 `export const metadata` 또는 `generateMetadata` 제공
4. 클라이언트 상태가 필요하면 `components/`에 client component 분리 후 삽입

## i18n 규칙

- URL에 `/ko`, `/en` 세그먼트를 추가하지 말 것. 로케일은 **도메인**으로만 판별.
- 로케일 전환 UI는 `src/lib/i18n/routing.ts`의 `getAlternateUrl(...)` 유틸을 사용해 크로스도메인 링크 생성.
- `locale/*.json` 키는 namespace(예: `Common`, `Home`)로 묶는다.

<!-- MANUAL: -->
