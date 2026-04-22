<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-04-22 | Updated: 2026-04-22 -->

# fonts

## Purpose

웹폰트 에셋 보관소. 현재는 한국어 UI 용 Pretendard Variable 하나만 두고,
영문 Geist 는 `next/font/google` 로 런타임 호스팅되므로 여기에 두지 않는다.

## Key Files

| File | Description |
|------|-------------|
| `PretendardVariable.woff2` | Pretendard 가변 폰트 (weight 45 ~ 920). 한국어 본문/UI 기본 폰트. README 절차에 따라 별도 다운로드 필요 |
| `.gitkeep` | 디렉토리 유지용 placeholder |

## For AI Agents

### Working In This Directory

- `PretendardVariable.woff2` 는 **레포지토리에 커밋되지 않을 수 있다** (용량이 크고, README 에 수동 다운로드 절차 기재). 파일이 없으면 `pnpm dev` 가 실패하므로 README §시작하기 1번 명령을 수행해 받아 둔다.
- 폰트 교체/추가 시 `src/app/layout.tsx` 의 `localFont({ src: ... })` 경로를 동기화한다.
- 라이선스 준수: Pretendard 는 SIL OFL 1.1. 재배포 시 원본 라이선스 포함 의무.
- 불필요한 weight/style 의 woff2 는 추가하지 말 것. Variable 하나로 충분하다.

### Testing Requirements

- 없음. `pnpm dev` / `pnpm build` 시 `localFont` 가 파일을 못 찾으면 빌드 실패로 즉시 드러난다.

## Dependencies

### Internal

- `src/app/layout.tsx` — `import localFont from "next/font/local"` 로 이 파일을 참조

### External

- Pretendard 업스트림: `github.com/orioncactus/pretendard`

<!-- MANUAL: -->
