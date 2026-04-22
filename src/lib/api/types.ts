export interface ApiError {
  status: number;
  message: string;
  code?: string;
  details?: unknown;
}

export class ApiRequestError extends Error implements ApiError {
  readonly status: number;
  readonly code?: string;
  readonly details?: unknown;

  constructor(params: ApiError) {
    super(params.message);
    this.name = "ApiRequestError";
    this.status = params.status;
    this.code = params.code;
    this.details = params.details;
  }
}
