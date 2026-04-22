# Project Instructions

## Language
- 한국어로 응답하라.

## Package Manager
- 반드시 `pnpm`을 사용한다. `npm install` 대신 `pnpm add`, `npm run` 대신 `pnpm run`.

## Code Style

### 분기문 규칙 (필수)
- **`else` 금지.** `if (condition) return;` 형태의 early return을 사용하라.
- **`if ... return` 뒤의 `else` 사용 금지.**
- **인라인 삼항 연산자는 허용.** `x ? a : b`는 사용 가능.

### TypeScript 스타일
- ESLint flat config (`eslint-config-next`) 준수
- Prettier 없음 — 에디터 기본 포맷 + ESLint 자동 수정
- 한국어 사용자 대면 문자열 (에러/라벨)
- **줄임말 사용 금지**: `usr` → `user`, `Ctx` → `Context`

### React / Next.js
- App Router 기본. Pages Router 사용 금지.
- RSC 우선. 클라이언트 상태가 필요한 컴포넌트만 `'use client'` 지시어 포함.
- 데이터 페칭은 서버 컴포넌트의 `fetch` 또는 `src/lib/api/apiClient`. 클라이언트에서 직접 API 호출은 지양.
- 서버 컴포넌트에서는 `getTranslations`, 클라이언트 컴포넌트에서는 `useTranslations` 사용.

## Commit Message
- **커밋 전 `pnpm lint` 필수.**
- **Conventional Commits 형식 필수.** `<type>[(<scope>)]: <description>`
- 허용 타입: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `style`, `ci`, `perf`, `build`
- description은 소문자로 시작, 마침표 없음
- **AI 관련 태그 금지** (`Co-Authored-By: Claude` 등 금지)

## Loading State
- 로딩 상태에서 "불러오는 중...", "로딩 중..." 같은 **텍스트 금지**.
- 반드시 스피너(`Loader2` 등) 또는 스켈레톤 UI만 사용.

## Testing
- Vitest 사용. 실행: `pnpm test`.

### 테스트 메서드 네이밍 (필수)
- **패턴**: `it('test_<조건>_할_때_<결과>_된다', ...)`
- **영문 기술용어 그대로**: `401`, `soft_delete`, `JWT` 등
- **클래스(describe)명은 영문 유지**: `TestCnUtility`, `TestParseResponse`

## i18n
- URL에 `/ko`, `/en` 세그먼트 추가 금지. 로케일은 서브도메인으로만 판별.
- `locale/*.json`에 모든 사용자 대면 문자열을 둔다. 컴포넌트에 한국어/영어 문자열 직접 작성 금지.
- 로케일 간 이동은 `getAlternateUrl` 유틸을 사용해 크로스 도메인 `<a href>`로 생성.

## Environment Variables
- 모든 env는 `src/lib/env.ts`의 `createEnv`에 등록한다. `process.env.X` 직접 접근 금지.
- 클라이언트 노출이 필요한 값만 `NEXT_PUBLIC_` 접두사를 사용한다.

## AGENTS.md 확인 규칙
- 폴더 작업 전 해당 및 상위 폴더 `AGENTS.md` 확인 후 작업.
- 우선순위: 현재 폴더 > 상위 폴더 > 루트.
