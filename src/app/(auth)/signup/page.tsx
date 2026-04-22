import { SignupForm } from "./SignupForm";

export default function SignupPage() {
  return (
    <main className="mx-auto max-w-md p-8">
      <h1 className="mb-6 text-2xl font-semibold">회원가입</h1>
      <SignupForm />
    </main>
  );
}
