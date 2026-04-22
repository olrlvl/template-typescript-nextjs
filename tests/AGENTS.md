<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-04-22 | Updated: 2026-04-22 -->

# tests

## Purpose

Vitest 유닛 테스트 루트. jsdom 환경에서 `@testing-library/react` 와 `@testing-library/jest-dom` 매처를 사용한다.
`src/` 디렉토리를 **그대로 미러링**하는 구조를 유지한다 (`src/lib/utils.ts` → `tests/lib/utils.test.ts`).

## Key Files

| File | Description |
|------|-------------|
| `setup.ts` | `@testing-library/jest-dom/vitest` matchers 등록, `afterEach(cleanup)` 으로 RTL 정리 |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `lib/` | `src/lib/` 미러. 현재 `utils.test.ts`, `api/schema.test.ts` 보유 (see `lib/AGENTS.md`) |

## For AI Agents

### Working In This Directory

- **테스트 파일 경로는 `src/` 를 그대로 미러**. 예: `src/lib/foo/bar.ts` → `tests/lib/foo/bar.test.ts`.
- `vitest.config.ts` 의 `include` 는 `tests/**/*.test.{ts,tsx}` 이므로 이 경로 밖에 파일을 두면 실행되지 않는다.
- **테스트 네이밍 규칙 (프로젝트 필수)**:
  - `describe(...)` 는 영문 클래스 스타일: `TestCnUtility`, `TestParseResponse`.
  - `it(...)` 은 `test_<조건>_할_때_<결과>_된다` 한글 패턴. 영문 기술용어(`401`, `soft_delete`, `JWT`, `ZodError` 등)는 그대로 유지.
- `@/` alias 는 `vitest.config.ts` 에서 `src/` 로 매핑되어 있다.
- 컴포넌트 테스트가 필요하면 `@testing-library/react` + `jsdom` 환경을 사용. `afterEach(cleanup)` 은 `setup.ts` 에서 자동 호출.
- 네트워크/DB/시스템 시간 같은 사이드이펙트는 모킹. fetch 는 msw 도입 전까지 `vi.mock` 또는 `vi.stubGlobal` 로 대체.

### Testing Requirements

- 실행: `pnpm test` (1회) / `pnpm test:watch` (watch).
- lefthook pre-push 훅이 `pnpm test` 를 실행하므로 로컬 푸시 전에 반드시 통과해야 한다.

### Common Patterns

```ts
import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("TestCnUtility", () => {
  it("test_여러_클래스명을_전달_할_때_공백으로_join_된다", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });
});
```

## Dependencies

### Internal

- `src/` 전체 — `@/*` alias 로 참조

### External

- `vitest@4`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, `@vitejs/plugin-react`

<!-- MANUAL: -->
