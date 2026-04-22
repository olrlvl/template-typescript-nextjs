# template-typescript-nextjs

정석적인 Next.js 16 퍼블릭 웹앱 스타터. 랜딩/마케팅/블로그/사용자 대면 서비스를 대상으로 한다.

## 특징

- **App Router + RSC 중심** — Server Actions, Streaming 기본 활용 전제
- **ko/en 서브도메인 i18n** — `next-intl`의 도메인 기반 라우팅. URL에 로케일 세그먼트 없음.
- **풀 SEO 팩** — `metadata`, `robots.ts`, `sitemap.ts`, 동적 OG 이미지, JSON-LD, hreflang
- **런타임 env 검증** — `@t3-oss/env-nextjs` + `zod`. 필수 키 누락 시 즉시 실패
- **폰트** — 한국어 Pretendard(로컬) + 영문 Geist(Google). 로케일에 따라 자동 스왑
- **에러 추적** — `@sentry/nextjs` 스캐폴드. DSN 없으면 no-op
- **보안 헤더** — `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`
- **테스트** — Vitest 4 + Testing Library + jsdom
- **훅** — lefthook으로 commit 시 `eslint --fix`, push 시 `typecheck` + `test`
- **컨테이너** — Dockerfile multi-stage + standalone
- **CI** — GitHub Actions로 lint + typecheck + test + build

## 요구사항

- Node.js 22 LTS (`.nvmrc` 고정)
- pnpm ≥ 9 (Corepack 사용)

```bash
corepack enable
node -v   # v22.x
pnpm -v   # 9.x 이상
```

## 시작하기

### 1. Pretendard 폰트 다운로드

```bash
curl -L -o public/fonts/PretendardVariable.woff2 \
  https://github.com/orioncactus/pretendard/raw/main/packages/pretendard/dist/web/variable/woff2/PretendardVariable.woff2
```

### 2. 환경변수 설정

```bash
cp .env.example .env.local
```

`.env.local`을 편집해 호스트와 API base URL을 채운다.

### 3. 로컬 hosts 설정 (서브도메인 i18n)

#### macOS / Linux

`*.localhost`는 기본 루프백이라 대부분 자동 동작한다. 동작하지 않으면:

```bash
sudo sh -c 'echo "127.0.0.1 ko.localhost en.localhost" >> /etc/hosts'
```

#### Windows

관리자 권한으로 `C:\Windows\System32\drivers\etc\hosts`에 추가:

```
127.0.0.1  ko.localhost
127.0.0.1  en.localhost
```

### 4. 의존성 설치 & dev 서버

```bash
pnpm install
pnpm dev
```

- 한국어: http://ko.localhost:3000
- 영어: http://en.localhost:3000

## 주요 명령

| Command | Purpose |
|---------|---------|
| `pnpm dev` | 개발 서버 (Turbopack) |
| `pnpm build` | 프로덕션 빌드 (`.next/standalone/`) |
| `pnpm start` | 빌드된 서버 실행 |
| `pnpm lint` | ESLint 실행 |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm test` | Vitest 1회 실행 |
| `pnpm test:watch` | Vitest watch 모드 |

## 디렉토리 구조

```
src/
├── app/            # App Router 엔트리 (layout, page, robots, sitemap, OG)
├── components/     # (비어 있음) UI 컴포넌트
├── config/         # site.ts — 도메인 맵, 사이트 메타
├── lib/
│   ├── api/        # ofetch + zod 스텁 (TODO: 백엔드 연동)
│   ├── i18n/       # next-intl 라우팅 / 요청 설정
│   ├── seo/        # metadata, JSON-LD 유틸
│   ├── env.ts      # @t3-oss/env-nextjs 검증
│   └── utils.ts    # cn()
├── styles/         # globals.css (Tailwind v4)
└── middleware.ts
locale/             # ko.json, en.json
tests/              # Vitest (유닛)
public/fonts/       # Pretendard woff2 (수동 배치)
```

## Docker

```bash
docker compose up --build
```

- 기본 포트: 3000
- `.env` 파일 자동 로드

## Sentry 활성화

`.env.local`에 DSN을 채우면 자동 활성화:

```
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
SENTRY_DSN=https://...@sentry.io/...
SENTRY_AUTH_TOKEN=sntrys_...   # source map 업로드 (CI에서만)
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project
```

DSN이 비어 있으면 Sentry는 no-op 상태로 유지된다.

## 배포

1. DNS A/AAAA 레코드: `ko.your-domain.com`, `en.your-domain.com` 모두 서버로
2. `NEXT_PUBLIC_SITE_HOST_KO`, `NEXT_PUBLIC_SITE_HOST_EN` 환경변수를 실제 호스트로 설정
3. `pnpm build` 후 `.next/standalone/server.js` 실행 또는 `Dockerfile` 빌드
4. 리버스 프록시(예: Nginx, Caddy)에서 양쪽 서브도메인을 동일 오리진으로 라우팅

## 열린 항목 (TODO)

- `src/lib/api/client.ts` 상단 주석 참조. 백엔드 템플릿(`template-typescript-nestjs`)과의 JSON:API 연동, 인증, 타입 자동 생성 파이프라인은 **별도 세션**에서 본격 작업한다.

## 라이선스

Private (사내 템플릿).
