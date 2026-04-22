<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-04-22 | Updated: 2026-04-22 -->

# public

## Purpose

Next.js 정적 자산 루트. 여기 있는 파일은 `/` 기준 절대 경로로 서빙된다 (`public/favicon.ico` → `/favicon.ico`).
빌드 시 그대로 복사되며, 변환·번들링이 적용되지 않는다.

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `fonts/` | Pretendard Variable 웹폰트 (see `fonts/AGENTS.md`) |

## For AI Agents

### Working In This Directory

- **민감 정보/비공개 파일 금지**. `public/` 은 전 세계에 서빙된다.
- 이미지/아이콘은 가급적 `src/app/` 안에 `icon.png`, `apple-icon.png`, `opengraph-image.tsx` 같은 **App Router 특수 파일**로 배치해 SEO 메타를 자동 생성한다. `public/` 은 폰트·sw·정책 파일 등 라우팅과 무관한 정적 자산 위주.
- 파일 경로는 소문자-kebab-case 권장.
- 이미지 최적화는 `next/image` 사용 시 자동 적용. 다만 `public/` 경로를 직접 `<img src>` 로 쓰면 최적화되지 않는다.

### Testing Requirements

- 없음. 파일 존재 여부와 헤더는 `pnpm build && pnpm start` 후 HTTP 로 확인.

## Dependencies

### Internal

- `src/app/layout.tsx` — `public/fonts/PretendardVariable.woff2` 를 `localFont` 로 로드

### External

- 없음

<!-- MANUAL: -->
