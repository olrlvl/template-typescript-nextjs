// TODO: 백엔드 템플릿 지원 필요.
//   - JSON:API 1.1 스펙 수용 여부 및 경로(/api/v1/public/*) 합의
//   - 엔드포인트별 스키마·함수 (template-typescript-nestjs와 타입 공유 전략)
//   - 인증: 쿠키 vs Authorization Bearer, 세션 저장 위치
//   - 에러 포맷: 한국어 메시지, Problem Details 호환 여부
//   - 재시도/타임아웃/캐시 정책 (RSC fetch 옵션과 ofetch 조합)
//   - OpenAPI 스키마 → 타입 자동 생성 파이프라인
// 이번 세션에서는 빈 껍데기만 제공하고, 별도 세션에서 위 항목을 본격 작업한다.

import { ofetch } from "ofetch";
import { env } from "@/lib/env";
import { ApiRequestError } from "./types";

export const apiClient = ofetch.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  retry: 0,
  onResponseError({ response }) {
    throw new ApiRequestError({
      status: response.status,
      message: response.statusText || "API request failed",
      details: response._data,
    });
  },
});
