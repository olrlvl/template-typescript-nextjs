<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-04-22 | Updated: 2026-04-22 -->

# locale

## Purpose

i18n 메시지 리소스. next-intl 이 로케일별로 `<lang>.json` 을 동적 import 해 `getMessages()` / `useTranslations()` 로 노출.
사용자 대면 문자열은 **반드시 여기에** 두고, 컴포넌트/페이지에 한국어·영어 문자열을 직접 쓰지 않는다.

## Key Files

| File | Description |
|------|-------------|
| `ko.json` | 한국어 메시지. namespace: `Common` (siteName, notFoundTitle/Description, errorTitle/Description, retry, home 등), `Home` (heading, description) |
| `en.json` | 영어 메시지. `ko.json` 과 동일한 키 집합 유지 |

## For AI Agents

### Working In This Directory

- **모든 로케일 파일의 키 집합을 동일하게** 유지한다. 누락 시 런타임 경고/폴백이 발생한다.
- namespace 규칙:
  - `Common` — 사이트 전체에서 재사용되는 짧은 문자열 (버튼 레이블, 에러 제목/설명, navigation).
  - `<PageName>` — 페이지 고유 문자열 (`Home`, `About`, ...). App Router 세그먼트 이름과 매칭.
- 새 페이지 추가 시 **반드시 두 파일 모두에 namespace 블록을 추가**한다. 한쪽만 수정해 PR 올리지 말 것.
- 키는 camelCase, namespace 는 PascalCase.
- HTML/MDX/마크다운을 메시지에 넣지 말 것. next-intl rich text/ICU 문법이 필요하면 별도 논의 후 도입.
- **줄임말 금지** 규칙은 키 네이밍에도 적용 (`desc` → `description`).

### Testing Requirements

- 별도 단위 테스트 없음. 키 누락은 `pnpm dev` 에서 콘솔 경고로 확인 가능.
- 신규 키는 `next-intl` 이 동적 import 하므로 빌드 후 재확인.

### Common Patterns

- 서버 컴포넌트: `const t = await getTranslations("Home"); t("heading")`
- 클라이언트 컴포넌트: `const t = useTranslations("Common"); t("retry")`

## Dependencies

### Internal

- `src/lib/i18n/request.ts` — 동적 import (`../../../locale/${locale}.json`)
- `src/lib/i18n/config.ts` — `locales` 배열이 파일 이름과 일치해야 함

### External

- `next-intl`

<!-- MANUAL: -->
