import { beforeEach, describe, expect, it, vi } from "vitest";

const { apiClientMock } = vi.hoisted(() => ({
  apiClientMock: vi.fn(),
}));

vi.mock("@/lib/api/client", () => ({
  apiClient: apiClientMock,
}));

import { buildJsonApiBody, jsonApiMutation } from "@/lib/api/request";

describe("TestJsonApiRequestHelpers", () => {
  beforeEach(() => {
    apiClientMock.mockReset();
  });

  it("test_build_json_api_body는_attributes만_있을_때_최소_문서를_만든다", () => {
    expect(
      buildJsonApiBody({
        type: "posts",
        attributes: { title: "hello" },
      }),
    ).toEqual({
      data: {
        type: "posts",
        attributes: { title: "hello" },
      },
    });
  });

  it("test_build_json_api_body는_id_relationships_meta를_함께_포함한다", () => {
    expect(
      buildJsonApiBody({
        type: "comments",
        id: "comment-1",
        attributes: { content: "reply" },
        relationships: {
          author: { data: { type: "users", id: "user-1" } },
        },
        meta: { traceId: "trace-1" },
      }),
    ).toEqual({
      data: {
        type: "comments",
        id: "comment-1",
        attributes: { content: "reply" },
        relationships: {
          author: { data: { type: "users", id: "user-1" } },
        },
      },
      meta: { traceId: "trace-1" },
    });
  });

  it("test_json_api_mutation은_POST를_기본값으로_사용하고_unwrap된_data를_반환한다", async () => {
    apiClientMock.mockResolvedValue({
      data: {
        type: "posts",
        id: "post-1",
        attributes: { title: "hello" },
      },
      meta: { "total-count": 1 },
    });

    const result = await jsonApiMutation<{
      type: string;
      id: string;
      attributes: { title: string };
    }>({
      path: "/public/posts",
      type: "posts",
      attributes: { title: "hello" },
    });

    expect(apiClientMock).toHaveBeenCalledWith("/public/posts", {
      method: "POST",
      body: {
        data: {
          type: "posts",
          attributes: { title: "hello" },
        },
      },
    });
    expect(result.data).toEqual({
      type: "posts",
      id: "post-1",
      attributes: { title: "hello" },
    });
    expect(result.meta).toEqual({ "total-count": 1 });
  });

  it("test_json_api_mutation은_명시된_method_query_fetch_options를_그대로_전달한다", async () => {
    apiClientMock.mockResolvedValue({
      data: {
        type: "posts",
        id: "post-1",
        attributes: { title: "updated" },
      },
    });

    await jsonApiMutation({
      path: "/public/posts/post-1",
      method: "PUT",
      type: "posts",
      id: "post-1",
      attributes: { title: "updated" },
      query: { include: ["files"] },
      fetchOptions: { cache: "no-store" },
    });

    expect(apiClientMock).toHaveBeenCalledWith(
      "/public/posts/post-1?include=files",
      {
        cache: "no-store",
        method: "PUT",
        body: {
          data: {
            type: "posts",
            id: "post-1",
            attributes: { title: "updated" },
          },
        },
      },
    );
  });
});
