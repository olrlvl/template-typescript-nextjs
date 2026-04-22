// TODO: 아래 항목은 후속 세션에서 작업:
//   - 인증: 쿠키 vs Authorization Bearer, 세션 저장 위치, 리프레시 플로우
//   - OpenAPI 스키마 → 타입 자동 생성 파이프라인

import { ofetch } from "ofetch";
import { env } from "@/lib/env";
import {
  ApiRequestError,
  ApiValidationError,
  type ApiErrorInit,
  type FieldError,
  type JsonApiError,
} from "./types";

function extractErrors(body: unknown): JsonApiError[] {
  if (
    body &&
    typeof body === "object" &&
    "errors" in body &&
    Array.isArray((body as { errors: unknown }).errors)
  ) {
    return (body as { errors: JsonApiError[] }).errors;
  }
  return [];
}

function isValidationShape(status: number, errors: JsonApiError[]): boolean {
  if (status !== 400 && status !== 422) return false;
  return errors.some(
    (e) => e.source?.pointer !== undefined || e.source?.parameter !== undefined,
  );
}

function toFieldError(e: JsonApiError): FieldError {
  return {
    pointer: e.source?.pointer,
    parameter: e.source?.parameter,
    detail: e.detail ?? e.title ?? e.code ?? "Invalid value",
    code: e.code,
  };
}

export interface MinimalErrorResponse {
  status: number;
  statusText?: string;
  _data?: unknown;
}

export function toApiError(response: MinimalErrorResponse): ApiRequestError {
  const status = response.status;
  const body = response._data;
  const errors = extractErrors(body);

  if (errors.length === 0) {
    return new ApiRequestError({
      status,
      message: response.statusText || "API request failed",
      details: body,
    });
  }

  const first = errors[0];
  const base: ApiErrorInit = {
    status,
    message:
      first.detail ?? first.title ?? response.statusText ?? "API request failed",
    code: first.code,
    source: first.source,
    errors,
    details: body,
  };

  if (isValidationShape(status, errors)) {
    return new ApiValidationError({
      ...base,
      fieldErrors: errors.map(toFieldError),
    });
  }
  return new ApiRequestError(base);
}

export const apiClient = ofetch.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  retry: 0,
  onResponseError({ response }) {
    throw toApiError(response as MinimalErrorResponse);
  },
});
