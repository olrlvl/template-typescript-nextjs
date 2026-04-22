<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-04-22 | Updated: 2026-04-22 -->

# lib (tests)

## Purpose

`src/lib/` 에 대응하는 테스트 집합. 프레임워크 비-의존 도메인 로직을 단위 검증한다.

## Key Files

| File | Description |
|------|-------------|
| `utils.test.ts` | `TestCnUtility` — `cn()` (clsx + tailwind-merge) 의 join / 충돌 해소 / falsy 무시 동작 검증 |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `api/` | `src/lib/api/` 미러. 스키마 파서 테스트 (see `api/AGENTS.md`) |

## For AI Agents

### Working In This Directory

- `src/lib/` 의 새 모듈을 추가하면 **대응 테스트 파일도 같은 경로**(`tests/lib/<mirror>.test.ts`) 로 만든다.
- 환경변수/네트워크 의존 로직(예: `env.ts`, `api/client.ts`)은 직접 테스트하기보다 의존성을 주입받는 형태로 리팩터링하거나 `vi.mock` 으로 격리.
- `i18n/` 관련 테스트는 아직 없지만 추가 시 이 폴더의 미러 경로(`tests/lib/i18n/`) 에 둔다.

### Testing Requirements

- `pnpm test` 로 검증.
- 테스트 네이밍은 상위 `tests/AGENTS.md` 의 규칙을 따른다.

## Dependencies

### Internal

- `@/lib/*` — 검증 대상

### External

- `vitest`

<!-- MANUAL: -->
