<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-04-22 | Updated: 2026-04-22 -->

# config

## Purpose

애플리케이션 상수 및 사이트 메타. 런타임 환경변수(`@/lib/env`)를 읽어 로케일별 호스트/URL 맵을 노출한다.
SEO 빌더, sitemap, robots, OG 이미지 등이 모두 여기서 읽는다.

## Key Files

| File | Description |
|------|-------------|
| `site.ts` | `siteConfig` 객체 (name, description[ko/en], hosts, urls) 와 `getSiteUrl(locale)` 헬퍼 |

## For AI Agents

### Working In This Directory

- **로케일별 필드는 반드시 `Record<Locale, T>` 타입**. 새 로케일을 추가하면 모든 맵이 컴파일 에러로 바로 드러난다.
- 환경변수 접근은 반드시 `@/lib/env` 의 `env` 객체를 통해야 한다. `process.env` 직접 접근 금지.
- 사이트 설명 같은 **사용자 대면 문자열을 여기에 넣지 말 것** — `locale/*.json` 에 둔다. `site.ts` 의 `description` 은 메타데이터/OG 이미지 폴백용이라 예외적.
- 새 상수는 타입을 명시하고 `as const` 또는 제네릭 `Record` 로 추론 안정성 확보.

### Testing Requirements

- 별도 단위 테스트 없음. 환경변수 검증은 `@/lib/env` 에서 수행.
- 값이 올바르게 주입되는지 확인하려면 `pnpm build` 또는 `pnpm dev` 를 실제 구동.

### Common Patterns

- `siteConfig.urls[locale]` 패턴으로 로케일별 절대 URL 생성.
- `getSiteUrl(locale)` 은 `siteConfig.urls[locale]` 의 얇은 래퍼.

## Dependencies

### Internal

- `@/lib/env` — `NEXT_PUBLIC_SITE_HOST_KO`, `NEXT_PUBLIC_SITE_HOST_EN`
- `@/lib/i18n/config` — `Locale` 타입

### External

- 없음 (타입 레벨만).

<!-- MANUAL: -->
