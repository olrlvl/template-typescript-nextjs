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
