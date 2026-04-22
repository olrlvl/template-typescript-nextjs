// ============================================================================
// JSON:API 1.1 타입
// ============================================================================

export interface JsonApiResource<
  TAttrs,
  TRel = Record<string, unknown>,
> {
  type: string;
  id: string;
  attributes: TAttrs;
  relationships?: TRel;
  links?: { self?: string; [k: string]: string | undefined };
}

export interface JsonApiDocument<
  TData,
  TIncluded = JsonApiResource<Record<string, unknown>>,
> {
  jsonapi?: { version: string };
  data: TData;
  included?: TIncluded[];
  meta?: Record<string, unknown>;
  links?: Record<string, string | null | undefined>;
}

export interface JsonApiError {
  status?: string;
  code?: string;
  title?: string;
  detail?: string;
  source?: { pointer?: string; parameter?: string };
  meta?: Record<string, unknown>;
}

// ============================================================================
// 페이지네이션 파생 (envelope.ts 가 채움)
// ============================================================================

export interface Pagination {
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  pageCount: number;
  hasPrev: boolean;
  hasNext: boolean;
}

export interface UnwrappedDocument<
  TData,
  TIncluded = JsonApiResource<Record<string, unknown>>,
> {
  data: TData;
  included?: TIncluded[];
  meta?: Record<string, unknown>;
  links?: Record<string, string | null | undefined>;
  pagination?: Pagination;
}

// ============================================================================
// 에러 클래스
// ============================================================================

export interface ApiErrorInit {
  status: number;
  message: string;
  code?: string;
  source?: JsonApiError["source"];
  errors?: JsonApiError[];
  details?: unknown;
}

export type ApiError = Pick<ApiErrorInit, "status" | "message" | "code" | "details">;

export class ApiRequestError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly source?: JsonApiError["source"];
  readonly errors: JsonApiError[];
  readonly details?: unknown;

  constructor(init: ApiErrorInit) {
    super(init.message);
    this.name = "ApiRequestError";
    this.status = init.status;
    this.code = init.code;
    this.source = init.source;
    this.errors = init.errors ?? [];
    this.details = init.details;
  }
}

export interface FieldError {
  pointer?: string;
  parameter?: string;
  detail: string;
  code?: string;
}

export class ApiValidationError extends ApiRequestError {
  readonly fieldErrors: FieldError[];

  constructor(init: ApiErrorInit & { fieldErrors: FieldError[] }) {
    super(init);
    this.name = "ApiValidationError";
    this.fieldErrors = init.fieldErrors;
  }
}
