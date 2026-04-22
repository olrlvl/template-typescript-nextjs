import { ofetch } from "ofetch";
import { cookies } from "next/headers";
import { env } from "@/lib/env";
import { ApiRequestError, type JsonApiError } from "./types";
import { toApiError, type MinimalErrorResponse } from "./errors";

export { toApiError, type MinimalErrorResponse };

const ACCESS_COOKIE = "boardAccess";

async function getAccessToken(): Promise<string | null> {
  try {
    const store = await cookies();
    return store.get(ACCESS_COOKIE)?.value ?? null;
  } catch {
    return null;
  }
}

export const apiClient = ofetch.create({
  baseURL: env.API_BASE_URL,
  retry: 0,
  async onRequest({ options }) {
    const token = await getAccessToken();
    const headers = new Headers(options.headers);
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/vnd.api+json");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    options.headers = headers;
  },
  onResponseError({ response }) {
    throw toApiError(response as MinimalErrorResponse);
  },
});

export async function postAndExtractRefreshCookie(
  path: string,
  body: unknown,
): Promise<{ data: unknown; accessToken: string; refreshToken: string }> {
  const res = await fetch(`${env.API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/vnd.api+json",
    },
    body: JSON.stringify(body),
  });
  const json = (await res.json()) as {
    data?: unknown;
    meta?: { "access-token"?: string };
    errors?: JsonApiError[];
  };
  if (!res.ok || !json.meta?.["access-token"]) {
    throw toApiError({
      status: res.status,
      statusText: res.statusText,
      _data: json,
    });
  }
  const setCookie = res.headers.get("set-cookie") ?? "";
  const match = setCookie.match(/refreshToken=([^;]+)/);
  if (!match) {
    throw new ApiRequestError({
      status: 500,
      message: "백엔드 응답에 refreshToken 쿠키가 없습니다.",
    });
  }
  return {
    data: json.data,
    accessToken: json.meta["access-token"],
    refreshToken: match[1],
  };
}
