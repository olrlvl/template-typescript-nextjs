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

export interface JsonApiBodyInput<
  TAttrs = Record<string, unknown>,
  TRelationships = Record<string, unknown>,
> {
  type: string;
  id?: string;
  attributes?: TAttrs;
  relationships?: TRelationships;
  meta?: Record<string, unknown>;
}

export function buildJsonApiBody<
  TAttrs = Record<string, unknown>,
  TRelationships = Record<string, unknown>,
>(
  input: JsonApiBodyInput<TAttrs, TRelationships>,
) {
  return {
    data: {
      type: input.type,
      ...(input.id !== undefined ? { id: input.id } : {}),
      ...(input.attributes !== undefined
        ? { attributes: input.attributes }
        : {}),
      ...(input.relationships !== undefined
        ? { relationships: input.relationships }
        : {}),
    },
    ...(input.meta !== undefined ? { meta: input.meta } : {}),
  };
}

type JsonApiMutationMethod = "POST" | "PUT" | "PATCH";

export interface JsonApiMutationInput<
  TData,
  TAttrs = Record<string, unknown>,
  TIncluded = JsonApiResource<Record<string, unknown>>,
  TRelationships = Record<string, unknown>,
> extends Omit<JsonApiRequestInput<TData, TIncluded>, "method" | "body">,
    JsonApiBodyInput<TAttrs, TRelationships> {
  method?: JsonApiMutationMethod;
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

export async function jsonApiMutation<
  TData,
  TAttrs = Record<string, unknown>,
  TIncluded = JsonApiResource<Record<string, unknown>>,
  TRelationships = Record<string, unknown>,
>(
  input: JsonApiMutationInput<TData, TAttrs, TIncluded, TRelationships>,
): Promise<UnwrappedDocument<TData, TIncluded>> {
  const {
    method = "POST",
    type,
    id,
    attributes,
    relationships,
    meta,
    ...requestInput
  } = input;

  return jsonApiRequest({
    ...requestInput,
    method,
    body: buildJsonApiBody({
      type,
      id,
      attributes,
      relationships,
      meta,
    }),
  });
}
