import type {
  JsonApiDocument,
  JsonApiResource,
  Pagination,
  UnwrappedDocument,
} from "./types";

function derivePagination(
  meta: Record<string, unknown> | undefined,
  links: Record<string, string | null | undefined> | undefined,
): Pagination | undefined {
  if (!meta) return undefined;
  const totalCount = meta["total-count"];
  const pageNumber = meta["page-number"];
  const pageSize = meta["page-size"];
  const pageCount = meta["page-count"];

  if (
    typeof totalCount !== "number" ||
    typeof pageNumber !== "number" ||
    typeof pageSize !== "number" ||
    typeof pageCount !== "number"
  ) {
    return undefined;
  }

  return {
    totalCount,
    pageNumber,
    pageSize,
    pageCount,
    hasPrev: typeof links?.prev === "string",
    hasNext: typeof links?.next === "string",
  };
}

export function unwrapJsonApi<
  TData,
  TIncluded = JsonApiResource<Record<string, unknown>>,
>(
  doc: JsonApiDocument<TData, TIncluded>,
): UnwrappedDocument<TData, TIncluded> {
  const pagination = derivePagination(doc.meta, doc.links);
  const unwrapped: UnwrappedDocument<TData, TIncluded> = {
    data: doc.data,
    included: doc.included,
    meta: doc.meta,
    links: doc.links,
  };
  if (pagination) unwrapped.pagination = pagination;
  return unwrapped;
}
