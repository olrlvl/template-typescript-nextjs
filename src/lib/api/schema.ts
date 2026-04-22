import type { ZodSchema } from "zod";

export function parseResponse<T>(schema: ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}
