import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("Common");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="text-xl">{t("notFoundTitle")}</p>
      <p className="text-gray-600 dark:text-gray-400">{t("notFoundDescription")}</p>
      <Link href="/" className="underline">
        {t("home")}
      </Link>
    </main>
  );
}
