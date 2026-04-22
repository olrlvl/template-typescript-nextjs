import { describe, it, expect } from "vitest";
import { toApiError } from "@/lib/api/errors";
import {
  ApiRequestError,
  ApiValidationError,
} from "@/lib/api/types";
import { fixtures } from "../../fixtures/json-api";

type FakeResponse = { status: number; statusText?: string; _data?: unknown };

describe("TestToApiError", () => {
  it("test_json_api_400_validation_응답이면_ApiValidationError가_된다", () => {
    const resp: FakeResponse = {
      status: 400,
      statusText: "Bad Request",
      _data: fixtures.nestjs.errorValidation,
    };
    const err = toApiError(resp);
    expect(err).toBeInstanceOf(ApiValidationError);
    expect((err as ApiValidationError).fieldErrors).toHaveLength(2);
  });

  it("test_pointer만_있는_에러도_field_error로_매핑된다", () => {
    const resp: FakeResponse = {
      status: 400,
      _data: fixtures.django.errorValidation,
    };
    const err = toApiError(resp) as ApiValidationError;
    expect(err).toBeInstanceOf(ApiValidationError);
    expect(err.fieldErrors[0].pointer).toBe("/data/attributes/username");
  });

  it("test_parameter만_있는_에러도_field_error로_매핑된다", () => {
    const resp: FakeResponse = {
      status: 400,
      _data: fixtures.nestjs.errorValidation,
    };
    const err = toApiError(resp) as ApiValidationError;
    const paramErr = err.fieldErrors.find(f => f.parameter);
    expect(paramErr?.parameter).toBe("filter[createdAt]");
  });

  it("test_json_api_401_token_expired가_ApiRequestError가_되고_code가_보존된다", () => {
    const resp: FakeResponse = {
      status: 401,
      statusText: "Unauthorized",
      _data: {
        jsonapi: { version: "1.1" },
        errors: [
          { status: "401", code: "TokenExpired", title: "Token Expired", detail: "토큰이 만료되었습니다." },
        ],
      },
    };
    const err = toApiError(resp);
    expect(err).toBeInstanceOf(ApiRequestError);
    expect(err).not.toBeInstanceOf(ApiValidationError);
    expect(err.code).toBe("TokenExpired");
    expect(err.message).toBe("토큰이 만료되었습니다.");
  });

  it("test_json_api_배열이_비어있으면_ApiRequestError가_되고_details에_원본이_들어간다", () => {
    const body = { jsonapi: { version: "1.1" }, errors: [] };
    const resp: FakeResponse = { status: 500, statusText: "Server Error", _data: body };
    const err = toApiError(resp);
    expect(err).toBeInstanceOf(ApiRequestError);
    expect(err).not.toBeInstanceOf(ApiValidationError);
    expect(err.details).toBe(body);
    expect(err.message).toBe("Server Error");
  });

  it("test_html_500_응답은_ApiRequestError가_되고_message가_statusText이다", () => {
    const resp: FakeResponse = {
      status: 500,
      statusText: "Internal Server Error",
      _data: "<html><body>oops</body></html>",
    };
    const err = toApiError(resp);
    expect(err).toBeInstanceOf(ApiRequestError);
    expect(err.message).toBe("Internal Server Error");
    expect(err.details).toContain("oops");
  });

  it("test_errors가_다중이면_첫_번째가_summary로_사용되고_errors에_전체가_담긴다", () => {
    const resp: FakeResponse = {
      status: 400,
      _data: fixtures.nestjs.errorValidation,
    };
    const err = toApiError(resp);
    expect(err.errors).toHaveLength(2);
    expect(err.code).toBe("InvalidFilter");
    expect(err.message).toBe("허용되지 않은 필터 필드입니다.");
  });
});
