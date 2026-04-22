import { cookies } from "next/headers";
import { z } from "zod";
import { env } from "@/lib/env";
import { jsonApiRequest } from "@/lib/api/request";
import { toApiError } from "@/lib/api/errors";
import type { JsonApiError } from "@/lib/api/types";

const ACCESS = "boardAccess";
const REFRESH = "boardRefresh";

export async function getAccessToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(ACCESS)?.value ?? null;
}

export async function getRefreshToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(REFRESH)?.value ?? null;
}

export async function setSession(access: string, refresh: string): Promise<void> {
  const store = await cookies();
  const secure = process.env.NODE_ENV === "production";
  store.set(ACCESS, access, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15,
  });
  store.set(REFRESH, refresh, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.delete(ACCESS);
  store.delete(REFRESH);
}

function extractRefreshTokenFromSetCookie(header: string | null): string | null {
  if (!header) return null;
  const match = header.match(/refreshToken=([^;]+)/);
  return match?.[1] ?? null;
}

async function parseJsonResponse(
  res: Response,
): Promise<{ data?: unknown; meta?: Record<string, unknown>; errors?: JsonApiError[] }> {
  const text = await res.text();
  if (!text) return {};
  return JSON.parse(text) as {
    data?: unknown;
    meta?: Record<string, unknown>;
    errors?: JsonApiError[];
  };
}

export async function refreshSession(): Promise<string | null> {
  const refresh = await getRefreshToken();
  if (!refresh) return null;

  const res = await fetch(`${env.API_BASE_URL}/public/auth/refresh`, {
    method: "POST",
    headers: {
      Accept: "application/vnd.api+json",
      Cookie: `refreshToken=${refresh}`,
    },
  });
  const json = await parseJsonResponse(res);
  if (!res.ok || typeof json.meta?.["access-token"] !== "string") {
    await clearSession();
    throw toApiError({
      status: res.status,
      statusText: res.statusText,
      _data: json,
    });
  }

  const nextRefresh = extractRefreshTokenFromSetCookie(res.headers.get("set-cookie")) ?? refresh;
  await setSession(json.meta["access-token"], nextRefresh);
  return json.meta["access-token"];
}

export async function signoutSession(): Promise<void> {
  const access = await getAccessToken();
  const refresh = await getRefreshToken();

  try {
    if (access || refresh) {
      const headers = new Headers({
        Accept: "application/vnd.api+json",
      });
      if (access) headers.set("Authorization", `Bearer ${access}`);
      if (refresh) headers.set("Cookie", `refreshToken=${refresh}`);

      await fetch(`${env.API_BASE_URL}/public/auth/signout`, {
        method: "POST",
        headers,
      });
    }
  } finally {
    await clearSession();
  }
}

export interface CurrentUser {
  id: string;
  email: string;
  username: string;
  isStaff: boolean;
}

const CurrentUserResourceSchema = z.object({
  type: z.literal("users"),
  id: z.string(),
  attributes: z.object({
    email: z.string().email(),
    username: z.string(),
    isStaff: z.boolean().default(false),
  }),
});

export async function getMe(): Promise<CurrentUser | null> {
  const token = await getAccessToken();
  if (!token) return null;
  try {
    const { data: d } = await jsonApiRequest({
      path: "/public/auth/me",
      schema: CurrentUserResourceSchema,
      fetchOptions: { cache: "no-store" },
    });
    return {
      id: d.id,
      email: d.attributes.email,
      username: d.attributes.username,
      isStaff: d.attributes.isStaff ?? false,
    };
  } catch {
    return null;
  }
}
