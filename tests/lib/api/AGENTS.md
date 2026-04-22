<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-04-22 | Updated: 2026-04-22 -->

# api (tests)

## Purpose

`src/lib/api/` 미러. 스키마 파서·에러 타입 등 HTTP 클라이언트 주변 모듈의 단위 테스트.

## Key Files

| File | Description |
|------|-------------|
| `schema.test.ts` | `TestParseResponse` — `parseResponse(schema, data)` 의 정상 파싱 및 스키마 불일치 시 ZodError throw 검증 |

## For AI Agents

### Working In This Directory

- 현재 `client.ts` 에 대한 직접 테스트는 없다. `ofetch` 인스턴스의 에러 변환 로직(`onResponseError`)을 검증하려면 `fetch` 를 `vi.stubGlobal` 로 스텁하거나 `msw` 도입을 검토.
- `types.ts` 의 `ApiRequestError` 클래스 동작(필드 세팅, `instanceof Error`)을 추가로 다루고 싶다면 `types.test.ts` 로 분리.
- 실제 백엔드 엔드포인트 함수가 생기면 **각 함수별 happy / unhappy / 스키마 위반** 세 케이스를 기본으로 작성한다.

### Testing Requirements

- `pnpm test tests/lib/api` 로 이 폴더만 실행 가능.
- 테스트 네이밍: `test_<조건>_할_때_<결과>_된다`, describe 는 `TestParseResponse` 식.

## Dependencies

### Internal

- `@/lib/api/schema`, `@/lib/api/types`

### External

- `vitest`, `zod`

<!-- MANUAL: -->
