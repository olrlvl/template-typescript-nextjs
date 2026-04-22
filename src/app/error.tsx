"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations("Common");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-2xl font-bold">{t("errorTitle")}</h1>
      <p className="text-gray-600 dark:text-gray-400">{t("errorDescription")}</p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900"
      >
        {t("retry")}
      </button>
    </main>
  );
}
