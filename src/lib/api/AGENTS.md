<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-04-22 | Updated: 2026-04-22 -->

# api

## Purpose

HTTP API 클라이언트 스텁. 백엔드 템플릿(`template-typescript-nestjs`)과의 연동은 **별도 세션**에서 본격화할 예정이며,
현재는 `ofetch` 인스턴스, zod 파서, 에러 타입만 제공한다.

## Key Files

| File | Description |
|------|-------------|
| `client.ts` | `apiClient` — `ofetch.create({ baseURL: env.NEXT_PUBLIC_API_BASE_URL })`. 응답 에러를 `ApiRequestError` 로 변환. 상단 주석에 TODO 로 JSON:API / 인증 / OpenAPI 타입 자동생성 등 열린 항목 명시 |
| `schema.ts` | `parseResponse<T>(schema, data)` — zod 스키마로 응답 검증. 실패 시 ZodError throw |
| `types.ts` | `ApiError` 인터페이스와 `ApiRequestError` 클래스 (`status`, `code?`, `details?` 포함) |

## For AI Agents

### Working In This Directory

- 새 엔드포인트 함수는 `client.ts` 의 `apiClient` 를 재사용한다. ofetch 인스턴스를 새로 만들지 말 것.
- 응답은 반드시 `parseResponse(schema, data)` 를 거쳐 타입 안전성 확보.
- 에러는 `ApiRequestError` 로 정규화. 새로운 에러 유형이 필요하면 `ApiError` 를 확장한 클래스를 `types.ts` 에 추가.
- **클라이언트 컴포넌트에서 `apiClient` 를 직접 호출하지 말 것**. 서버 컴포넌트/route handler 에서만 사용하고, 클라이언트가 필요한 경우 서버 액션을 경유한다.
- `client.ts` 상단 TODO 주석의 항목(JSON:API 1.1, 인증, Problem Details, OpenAPI 타입 생성)은 현재 의도적으로 열려 있다. 지금 세션에서 결정하지 말고 명시적 요청이 있을 때만 손댈 것.

### Testing Requirements

- `tests/lib/api/` 미러 경로에 둔다 (예: `tests/lib/api/schema.test.ts` 이미 존재).
- 네트워크 호출은 모킹/스텁. 실제 API 호출을 테스트에 넣지 말 것.

### Common Patterns

```ts
import { apiClient } from "@/lib/api/client";
import { parseResponse } from "@/lib/api/schema";

const raw = await apiClient("/v1/public/posts");
return parseResponse(PostListSchema, raw);
```

## Dependencies

### Internal

- `@/lib/env` — `NEXT_PUBLIC_API_BASE_URL`

### External

- `ofetch` — HTTP 클라이언트
- `zod` — 응답 스키마 검증

<!-- MANUAL: -->
