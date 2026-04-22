<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-04-22 | Updated: 2026-04-22 -->

# lib

## Purpose

프레임워크 비-의존 도메인 로직의 집합. i18n 라우팅, SEO 빌더, API 클라이언트, 환경변수 검증,
Tailwind 유틸이 여기에 모인다. App Router 컴포넌트와 config 계층이 이 모듈들을 소비한다.

## Key Files

| File | Description |
|------|-------------|
| `env.ts` | `@t3-oss/env-nextjs` + zod. 서버/클라이언트 env를 스키마로 검증. `process.env` 직접 접근을 대체한다. `SKIP_ENV_VALIDATION` 플래그 지원 |
| `utils.ts` | `cn(...inputs)` — `clsx` + `tailwind-merge` 조합. Tailwind utility 클래스 결합 표준 |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `api/` | ofetch + zod API 클라이언트 스텁 (see `api/AGENTS.md`) |
| `i18n/` | next-intl 라우팅/요청 설정 (see `i18n/AGENTS.md`) |
| `seo/` | metadata, JSON-LD 빌더 (see `seo/AGENTS.md`) |

## For AI Agents

### Working In This Directory

- **환경변수는 반드시 `env.ts` 에 등록**한다. 클라이언트에 노출할 값만 `NEXT_PUBLIC_` 접두사.
- 서버 전용 값(`SENTRY_AUTH_TOKEN`, `SENTRY_ORG` 등)은 `server:` 블록에 두고, 클라이언트 번들에 새지 않도록 한다.
- `runtimeEnv` 객체에 키를 추가하는 것을 잊지 말 것 — 누락 시 런타임에 `undefined` 가 된다.
- `utils.ts` 의 `cn` 은 **절대 래핑/대체하지 말 것**. 프로젝트 전반의 Tailwind 병합 표준.
- 신규 `lib/` 모듈은 단일 책임을 지키고, 컴포넌트/RSC 의존성을 피한다 (테스트 용이성 확보).

### Testing Requirements

- 각 모듈의 테스트는 `tests/lib/<mirror>.test.ts` 에 둔다.
- 테스트 네이밍: `it('test_<조건>_할_때_<결과>_된다', ...)`, `describe` 는 영문 클래스식 이름 (`TestCnUtility`, `TestParseResponse`).

### Common Patterns

- 순수 함수 위주. 부수효과는 `api/client.ts` 같은 명시적 위치에만.
- 타입은 같은 파일 상단에 선언하거나 `types.ts` 로 분리.

## Dependencies

### Internal

- `@/config/site` (역참조: `config/site.ts` 가 `@/lib/env`, `@/lib/i18n/config` 를 사용).

### External

- `@t3-oss/env-nextjs`, `zod`, `clsx`, `tailwind-merge`.

<!-- MANUAL: -->
