"use client";

import { useActionState } from "react";
import { signupAction, type AuthActionState } from "../actions";

const initialState: AuthActionState = {};

export function SignupForm() {
  const [state, action] = useActionState(signupAction, initialState);
  return (
    <form action={action} className="flex flex-col gap-3">
      <input
        name="email"
        type="email"
        required
        placeholder="이메일"
        className="border px-3 py-2"
      />
      <input
        name="username"
        type="text"
        required
        placeholder="닉네임"
        className="border px-3 py-2"
      />
      <input
        name="password"
        type="password"
        required
        placeholder="비밀번호"
        className="border px-3 py-2"
      />
      <button type="submit" className="bg-black py-2 text-white">
        가입하기
      </button>
      {state?.error ? (
        <p className="text-sm text-red-600">{state.error}</p>
      ) : null}
    </form>
  );
}
