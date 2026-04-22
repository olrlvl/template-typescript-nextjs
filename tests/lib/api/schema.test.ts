import { describe, it, expect } from "vitest";
import { z } from "zod";
import { parseResponse } from "@/lib/api/schema";

describe("TestParseResponse", () => {
  it("test_유효한_응답을_전달_할_때_파싱된_값이_반환_된다", () => {
    const schema = z.object({ id: z.number(), name: z.string() });
    const result = parseResponse(schema, { id: 1, name: "alice" });
    expect(result).toEqual({ id: 1, name: "alice" });
  });

  it("test_스키마_불일치_응답을_전달_할_때_ZodError가_throw_된다", () => {
    const schema = z.object({ id: z.number() });
    expect(() => parseResponse(schema, { id: "not-a-number" })).toThrow();
  });
});
