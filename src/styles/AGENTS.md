<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-04-22 | Updated: 2026-04-22 -->

# styles

## Purpose

전역 CSS. Tailwind v4 의 `@import "tailwindcss"` + `@theme` 블록 기반 구성이며,
HTML `lang` 속성에 따라 `--font-sans` 를 Pretendard(ko) ↔ Geist(en) 로 자동 스왑한다.

## Key Files

| File | Description |
|------|-------------|
| `globals.css` | Tailwind v4 진입점. `@theme` 으로 폰트 변수 선언, `:root` 배경/전경 CSS 변수, 다크모드 `prefers-color-scheme`, `html[lang="ko"]` / `html[lang="en"]` 에 따른 `--font-sans` 분기, 리셋 규칙 |

## For AI Agents

### Working In This Directory

- **Tailwind v4** 를 쓰므로 `tailwind.config.js` 파일이 없다. 설정은 `@theme` / `@layer` CSS 블록으로 기술.
- 새 컬러/폰트 토큰은 `@theme { }` 안에 `--<prefix>-<name>: ...` 로 추가한다. Tailwind 유틸이 자동 생성됨.
- 한국어/영어 폰트 분기는 `html[lang="..."]` 셀렉터로만 제어. 컴포넌트 레벨에서 폰트 오버라이드 금지.
- **전역 CSS 추가는 신중하게**. 대부분의 스타일은 Tailwind utility + `cn()` 으로 충분하다.
- 다크모드는 `prefers-color-scheme` 기반. `class="dark"` 토글 전략은 아직 도입되지 않았으므로 임의로 변경 금지.

### Testing Requirements

- 시각 회귀 테스트 없음. 변경 후 `pnpm dev` 로 `ko.localhost:3000` / `en.localhost:3000` 모두 확인.
- 라이트/다크 모두 OS 설정 변경으로 검증.

### Common Patterns

- `rgb(var(--background))` 처럼 CSS 변수를 `rgb()` 로 래핑해 opacity 수정자와 호환.
- 폰트 변수(`--font-pretendard`, `--font-geist-sans`, `--font-geist-mono`)는 `src/app/layout.tsx` 에서 `next/font` 가 `<html>` class 로 주입.

## Dependencies

### Internal

- `src/app/layout.tsx` — `"@/styles/globals.css"` import 지점

### External

- `tailwindcss@4`, `@tailwindcss/postcss`

<!-- MANUAL: -->
