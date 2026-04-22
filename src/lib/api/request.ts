import type { FetchOptions } from "ofetch";
import type { ZodSchema } from "zod";

import { apiClient } from "./client";
import { buildJsonApiQuery, type JsonApiQueryInput } from "./query";
import { unwrapJsonApi } from "./envelope";
import { parseResponse } from "./schema";
import type {
  JsonApiDocument,
  JsonApiResource,
  UnwrappedDocument,
} from "./types";

export interface JsonApiRequestInput<
  TData,
  TIncluded = JsonApiResource<Record<string, unknown>>,
> {
  path: string;
  query?: JsonApiQueryInput;
  schema?: ZodSchema<TData>;
  includedSchema?: ZodSchema<TIncluded[]>;
  method?: FetchOptions["method"];
  body?: unknown;
  fetchOptions?: Omit<
    FetchOptions,
    "method" | "body" | "baseURL" | "query"
  >;
}

export async function jsonApiRequest<
  TData,
  TIncluded = JsonApiResource<Record<string, unknown>>,
>(
  input: JsonApiRequestInput<TData, TIncluded>,
): Promise<UnwrappedDocument<TData, TIncluded>> {
  const qs = buildJsonApiQuery(input.query ?? {});
  const url = qs ? `${input.path}?${qs}` : input.path;

  const raw = await apiClient<JsonApiDocument<unknown, TIncluded>>(url, {
    ...input.fetchOptions,
    method: input.method,
    body: input.body as FetchOptions["body"],
  } as FetchOptions<"json">);

  const unwrapped = unwrapJsonApi(raw) as UnwrappedDocument<TData, TIncluded>;

  if (input.schema) {
    unwrapped.data = parseResponse(input.schema, unwrapped.data);
  }
  if (input.includedSchema) {
    unwrapped.included = parseResponse(
      input.includedSchema,
      unwrapped.included ?? [],
    );
  }

  return unwrapped;
}
