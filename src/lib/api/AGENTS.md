<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-04-22 | Updated: 2026-04-22 -->

# api

## Purpose

HTTP API 클라이언트. 백엔드 템플릿(`template-typescript-nestjs`, `template-python-django`) 의 JSON:API 1.1 규약에 맞춰 쿼리 조립·envelope 언래핑·에러 분류를 제공한다. 응답 모양(S-1)은 두 백엔드가 정규화한 공통 규약이다.

## Key Files

| File | Description |
|------|-------------|
| `client.ts` | `apiClient` — `ofetch.create({ baseURL: env.NEXT_PUBLIC_API_BASE_URL })`. `onResponseError` 에서 `toApiError(response)` 를 throw. `toApiError` 도 export 되어 단위 테스트 가능 |
| `types.ts` | JSON:API 타입(`JsonApiResource`, `JsonApiDocument`, `JsonApiError`, `Pagination`, `UnwrappedDocument`) + 에러 클래스(`ApiRequestError`, `ApiValidationError`, `FieldError`) + `ApiError` 호환 alias |
| `schema.ts` | `parseResponse<T>(schema, data)` — zod 파서 래핑. 실패 시 `ZodError` 그대로 throw |
| `query.ts` | `buildJsonApiQuery(input)` — include / filter / sort / page 입력을 JSON:API 쿼리 문자열로 직렬화(순수 함수) |
| `envelope.ts` | `unwrapJsonApi(doc)` — JSON:API 응답 → `{ data, included, meta, links, pagination }`. pagination 은 `meta["total-count"]` 등이 모두 `number` 일 때만 파생 |
| `request.ts` | `jsonApiRequest(input)` — 쿼리 조립 + `apiClient` 호출 + `unwrapJsonApi` + 선택적 zod 파싱을 한 번에 |

## For AI Agents

### Working In This Directory

- 새 엔드포인트 함수는 `jsonApiRequest` 를 기본으로 사용한다. 파일 업로드·스트리밍 등 예외 케이스만 `apiClient` 저수준 직접 호출 허용.
- `buildJsonApiQuery` / `unwrapJsonApi` 는 순수 유틸이다. 내부에서 네트워크·zod 파서를 호출하지 않는다(경계 침범 금지).
- `ZodError` 는 감싸지 않고 그대로 throw 한다(서버/클라이언트 계약 어긋남 신호).
- 에러 catch 분기는 `ApiValidationError` → `ApiRequestError` 순(상속 관계).
- **클라이언트 컴포넌트에서 `apiClient` / `jsonApiRequest` 직접 호출 금지**. 서버 컴포넌트, route handler, server action 에서만 사용.
- 새로운 에러 유형이 필요하면 `ApiError` 호환 필드를 유지한 채 `ApiRequestError` 하위 클래스로 추가.
- `client.ts` 상단 TODO 는 현재 2개(인증·OpenAPI 타입 자동 생성) 가 의도적으로 열려 있다. 명시적 요청이 있을 때만 손댈 것.

### Testing Requirements

- `tests/lib/api/` 미러 경로에 둔다 (`query.test.ts`, `envelope.test.ts`, `errors.test.ts`, `schema.test.ts`).
- 네트워크 호출은 모킹/스텁. 실제 API 호출을 테스트에 넣지 말 것.
- JSON:API 응답 샘플은 `tests/fixtures/json-api/` 에 두고 `index.ts` 배럴로만 import.
- 테스트 메서드명은 CLAUDE.md 규약(`test_<조건>_할_때_<결과>_된다`) 준수.

### Common Patterns

**리스트 호출**

```ts
import { jsonApiRequest } from "@/lib/api/request";
import { z } from "zod";

const UserListSchema = z.array(z.object({
  type: z.literal("users"),
  id: z.string(),
  attributes: z.object({
    username: z.string(),
    email: z.string(),
    created_at: z.string(),
  }),
}));

const { data, pagination } = await jsonApiRequest({
  path: "/v1/public/users",
  query: {
    include: ["files"],
    filter: {
      username: { icontains: "john" },
      created_at: { gte: "2026-01-01" },
    },
    sort: ["-created_at", "username"],
    page: { number: 2, size: 25 },
  },
  schema: UserListSchema,
});
```

**디테일 호출**

```ts
const { data } = await jsonApiRequest({
  path: `/v1/public/users/${userId}`,
  schema: UserResourceSchema,
});
```

**POST**

```ts
const { data } = await jsonApiRequest({
  path: "/v1/public/posts",
  method: "POST",
  body: { data: { type: "posts", attributes: { title: "..." } } },
  schema: PostResourceSchema,
});
```

**에러 catch**

```ts
try {
  await jsonApiRequest({ path: "/v1/public/users", schema: UserListSchema });
} catch (err) {
  if (err instanceof ApiValidationError) {
    err.fieldErrors.forEach(fe => { /* 인라인 메시지 */ });
  } else if (err instanceof ApiRequestError) {
    if (err.code === "TokenExpired") { /* 후속 세션: 리프레시 */ }
    else { /* 토스트: err.message */ }
  }
}
```

## Dependencies

### Internal

- `@/lib/env` — `NEXT_PUBLIC_API_BASE_URL`

### External

- `ofetch` — HTTP 클라이언트
- `zod` — 응답 스키마 검증

<!-- MANUAL: -->
