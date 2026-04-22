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
