export type Lookup =
  | "exact"
  | "icontains"
  | "istartswith"
  | "gt"
  | "gte"
  | "lt"
  | "lte";

export type FilterValue = string | number | boolean | Date;

export type FilterInput =
  | Record<string, Partial<Record<Lookup, FilterValue>>>
  | ({ search?: string } & Record<string, Partial<Record<Lookup, FilterValue>>>);

export type IncludeInput = readonly string[];
export type SortInput = readonly string[];
export type PageInput = { number?: number; size?: number };

export interface JsonApiQueryInput {
  include?: IncludeInput;
  filter?: FilterInput;
  sort?: SortInput;
  page?: PageInput;
}

function serializeValue(value: FilterValue): string {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "boolean") return value ? "true" : "false";
  return String(value);
}

export function buildJsonApiQuery(input: JsonApiQueryInput): string {
  const params = new URLSearchParams();

  if (input.include && input.include.length > 0) {
    params.append("include", input.include.join(","));
  }

  if (input.filter) {
    for (const [field, spec] of Object.entries(input.filter)) {
      if (field === "search" && typeof spec === "string") {
        params.append("filter[search]", spec);
        continue;
      }
      if (!spec || typeof spec !== "object") continue;
      for (const [lookup, value] of Object.entries(spec)) {
        if (value === undefined || value === null) continue;
        params.append(
          `filter[${field}__${lookup}]`,
          serializeValue(value as FilterValue),
        );
      }
    }
  }

  if (input.sort && input.sort.length > 0) {
    params.append("sort", input.sort.join(","));
  }

  if (input.page) {
    if (input.page.number !== undefined) {
      params.append("page[number]", String(input.page.number));
    }
    if (input.page.size !== undefined) {
      params.append("page[size]", String(input.page.size));
    }
  }

  return params.toString();
}
