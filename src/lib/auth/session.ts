import { cookies } from "next/headers";
import { apiClient } from "@/lib/api/client";

const ACCESS = "boardAccess";
const REFRESH = "boardRefresh";

export async function getAccessToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(ACCESS)?.value ?? null;
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

export interface CurrentUser {
  id: string;
  email: string;
  username: string;
  isStaff: boolean;
}

export async function getMe(): Promise<CurrentUser | null> {
  const token = await getAccessToken();
  if (!token) return null;
  try {
    const res = (await apiClient("/public/auth/me")) as {
      data: { id: string; attributes: Record<string, unknown> };
    };
    const d = res.data;
    return {
      id: d.id,
      email: d.attributes.email as string,
      username: d.attributes.username as string,
      isStaff: Boolean(d.attributes.isStaff),
    };
  } catch {
    return null;
  }
}
