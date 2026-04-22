"use server";

import { redirect } from "next/navigation";
import { postJsonApiAndExtractRefreshCookie } from "@/lib/api/client";
import { setSession, signoutSession } from "@/lib/auth/session";
import { ApiRequestError } from "@/lib/api/types";

export type AuthActionState = { error?: string };

export async function signinAction(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  try {
    const { accessToken, refreshToken } = await postJsonApiAndExtractRefreshCookie(
      "/public/auth/signin",
      {
        type: "auth-signin",
        attributes: { email, password },
      },
    );
    await setSession(accessToken, refreshToken);
  } catch (e: unknown) {
    const msg =
      e instanceof ApiRequestError ? e.message : "로그인에 실패했습니다.";
    return { error: msg };
  }
  redirect("/");
}

export async function signupAction(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "");
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  try {
    const { accessToken, refreshToken } = await postJsonApiAndExtractRefreshCookie(
      "/public/auth/signup",
      {
        type: "auth-signup",
        attributes: { email, username, password },
      },
    );
    await setSession(accessToken, refreshToken);
  } catch (e: unknown) {
    const msg =
      e instanceof ApiRequestError ? e.message : "회원가입에 실패했습니다.";
    return { error: msg };
  }
  redirect("/");
}

export async function signoutAction(): Promise<void> {
  await signoutSession();
  redirect("/");
}
