<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-04-22 | Updated: 2026-04-22 -->

# i18n

## Purpose

next-intl 도메인 기반 라우팅 구성. `ko` / `en` 두 로케일을 각각 별도 서브도메인에 매핑한다.
URL 경로에는 로케일 세그먼트가 포함되지 않는다.

## Key Files

| File | Description |
|------|-------------|
| `config.ts` | `locales` (`["ko", "en"]`), `Locale` 타입, `defaultLocale` (env 기반), `localeDomains` 맵, `isLocale` 타입 가드 |
| `routing.ts` | `defineRouting({ locales, defaultLocale, localeDetection: false, domains: [...] })`. 도메인 → 로케일 매핑 |
| `request.ts` | `getRequestConfig` — 요청 로케일 확정 후 `locale/<locale>.json` 을 동적 import 해 messages 반환 |

## For AI Agents

### Working In This Directory

- **새 로케일 추가 플로우**:
  1. `config.ts` 의 `locales` 배열에 코드 추가
  2. `env.ts` 에 `NEXT_PUBLIC_SITE_HOST_<CODE>` 추가 + `localeDomains` 매핑
  3. `locale/<code>.json` 생성
  4. `siteConfig.description`, `buildMetadata`, `websiteJsonLd` 등 `Locale` 리터럴을 사용하는 위치가 TS 에러로 노출됨 → 각각 채워 준다
  5. `sitemap.ts` / `robots.ts` 는 자동으로 새 로케일을 포함한다
- **로케일 감지는 끔**(`localeDetection: false`). 도메인이 단일 진실 공급원이다.
- `routing.ts` 의 `domains` 배열은 `localeDomains` 와 동기화되어야 한다. 직접 하드코딩 금지.
- 로케일 간 링크는 `routing.ts` 에서 export 되는 헬퍼(필요 시 `getAlternateUrl` 같은 크로스 도메인 유틸을 여기에 추가)를 사용. `<Link>` 로 크로스 도메인 이동을 시도하지 말 것.

### Testing Requirements

- 현재 단위 테스트 없음. 새 유틸 추가 시 `tests/lib/i18n/` 에 미러.
- 실제 라우팅은 `pnpm dev` 로 `ko.localhost:3000` / `en.localhost:3000` 에서 검증.

### Common Patterns

- 서버에서 로케일 획득: `const locale = (await getLocale()) as Locale`
- 메시지 번들: `next-intl` 이 자동으로 컴포넌트 트리에 주입. 개별 페이지에서 `getMessages()` 호출 불필요.

## Dependencies

### Internal

- `@/lib/env` — 도메인 및 기본 로케일 값
- 루트 `locale/ko.json`, `locale/en.json` — `request.ts` 가 동적 import

### External

- `next-intl` — `defineRouting`, `getRequestConfig`, `hasLocale`, `createMiddleware`

<!-- MANUAL: -->
