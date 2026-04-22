import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("TestCnUtility", () => {
  it("test_여러_클래스명을_전달_할_때_공백으로_join_된다", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("test_tailwind_충돌_클래스를_전달_할_때_나중_클래스가_우선_된다", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("test_falsy_값을_전달_할_때_무시_된다", () => {
    expect(cn("a", false && "b", null, undefined, "c")).toBe("a c");
  });
});
