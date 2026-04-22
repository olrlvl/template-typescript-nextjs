import { describe, it, expect } from "vitest";
import { unwrapJsonApi } from "@/lib/api/envelope";
import { fixtures } from "../../fixtures/json-api";
import type { JsonApiDocument } from "@/lib/api/types";

describe("TestUnwrapJsonApi", () => {
  it("test_nestjs_list_응답을_언래핑하면_pagination이_채워진다", () => {
    const doc = fixtures.nestjs.usersList as JsonApiDocument<unknown[]>;
    const un = unwrapJsonApi(doc);
    expect(un.pagination).toEqual({
      totalCount: 3,
      pageNumber: 1,
      pageSize: 2,
      pageCount: 2,
      hasPrev: false,
      hasNext: true,
    });
  });

  it("test_django_list_응답을_언래핑하면_pagination이_채워진다", () => {
    const doc = fixtures.django.usersList as JsonApiDocument<unknown[]>;
    const un = unwrapJsonApi(doc);
    expect(un.pagination).toEqual({
      totalCount: 1,
      pageNumber: 1,
      pageSize: 25,
      pageCount: 1,
      hasPrev: false,
      hasNext: false,
    });
  });

  it("test_detail_응답을_언래핑하면_pagination이_undefined이다", () => {
    const doc = fixtures.nestjs.usersDetail as JsonApiDocument<unknown>;
    const un = unwrapJsonApi(doc);
    expect(un.pagination).toBeUndefined();
    expect(un.data).toEqual(doc.data);
  });

  it("test_meta가_없으면_pagination이_undefined이다", () => {
    const doc: JsonApiDocument<unknown> = { data: { type: "x", id: "1", attributes: {} } };
    const un = unwrapJsonApi(doc);
    expect(un.pagination).toBeUndefined();
  });

  it("test_total_count가_문자열이면_pagination_생성을_포기한다", () => {
    const doc: JsonApiDocument<unknown[]> = {
      data: [],
      meta: {
        "total-count": "3" as unknown as number,
        "page-number": 1,
        "page-size": 2,
        "page-count": 2,
      },
    };
    const un = unwrapJsonApi(doc);
    expect(un.pagination).toBeUndefined();
  });

  it("test_links가_없으면_hasNext_hasPrev가_false이다", () => {
    const doc: JsonApiDocument<unknown[]> = {
      data: [],
      meta: { "total-count": 0, "page-number": 1, "page-size": 25, "page-count": 0 },
    };
    const un = unwrapJsonApi(doc);
    expect(un.pagination?.hasPrev).toBe(false);
    expect(un.pagination?.hasNext).toBe(false);
  });

  it("test_data_와_included_는_그대로_통과된다", () => {
    const doc = fixtures.nestjs.usersList as JsonApiDocument<unknown[]>;
    const un = unwrapJsonApi(doc);
    expect(un.data).toBe(doc.data);
    expect(un.included).toBe(doc.included);
  });
});
