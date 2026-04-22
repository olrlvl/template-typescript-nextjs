import { describe, it, expect } from "vitest";
import { buildJsonApiQuery } from "@/lib/api/query";

describe("TestBuildJsonApiQuery", () => {
  it("test_빈_입력일_때_빈_문자열이_반환된다", () => {
    expect(buildJsonApiQuery({})).toBe("");
  });

  it("test_include가_여러_개면_콤마로_연결된다", () => {
    const qs = buildJsonApiQuery({ include: ["files", "category.owner"] });
    expect(qs).toBe("include=files%2Ccategory.owner");
  });

  it("test_filter의_lookup이_여러_개면_각각_쿼리로_방출된다", () => {
    const qs = buildJsonApiQuery({
      filter: {
        created_at: { gte: "2026-01-01", lte: "2026-12-31" },
      },
    });
    expect(qs).toBe(
      "filter%5Bcreated_at__gte%5D=2026-01-01&filter%5Bcreated_at__lte%5D=2026-12-31",
    );
  });

  it("test_filter의_search_특수키는_lookup_없이_그대로_전송된다", () => {
    const qs = buildJsonApiQuery({ filter: { search: "term" } });
    expect(qs).toBe("filter%5Bsearch%5D=term");
  });

  it("test_filter의_관계_경로는_점_표기로_유지된다", () => {
    const qs = buildJsonApiQuery({
      filter: { "files.filename": { exact: "r.pdf" } },
    });
    expect(qs).toBe("filter%5Bfiles.filename__exact%5D=r.pdf");
  });

  it("test_sort는_마이너스_접두사로_내림차순을_표현한다", () => {
    const qs = buildJsonApiQuery({ sort: ["-created_at", "username"] });
    expect(qs).toBe("sort=-created_at%2Cusername");
  });

  it("test_page_number와_size가_둘_다_있으면_둘_다_방출된다", () => {
    const qs = buildJsonApiQuery({ page: { number: 2, size: 25 } });
    expect(qs).toBe("page%5Bnumber%5D=2&page%5Bsize%5D=25");
  });

  it("test_date_값은_iso_문자열로_직렬화된다", () => {
    const date = new Date("2026-04-22T00:00:00.000Z");
    const qs = buildJsonApiQuery({
      filter: { created_at: { gte: date } },
    });
    expect(qs).toBe(
      "filter%5Bcreated_at__gte%5D=2026-04-22T00%3A00%3A00.000Z",
    );
  });

  it("test_방출_순서는_include_filter_sort_page_로_고정된다", () => {
    const qs = buildJsonApiQuery({
      page: { number: 1 },
      sort: ["name"],
      filter: { name: { exact: "a" } },
      include: ["files"],
    });
    expect(qs).toBe(
      "include=files&filter%5Bname__exact%5D=a&sort=name&page%5Bnumber%5D=1",
    );
  });

  it("test_undefined_필터_값은_방출되지_않는다", () => {
    const qs = buildJsonApiQuery({
      filter: {
        name: { icontains: undefined, exact: "a" },
      },
    });
    expect(qs).toBe("filter%5Bname__exact%5D=a");
  });

  it("test_boolean_값은_소문자_문자열로_방출된다", () => {
    const qs = buildJsonApiQuery({
      filter: { is_active: { exact: true } },
    });
    expect(qs).toBe("filter%5Bis_active__exact%5D=true");
  });

  it("test_빈_배열_include는_방출되지_않는다", () => {
    const qs = buildJsonApiQuery({ include: [] });
    expect(qs).toBe("");
  });
});
