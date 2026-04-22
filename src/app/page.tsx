import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("Home");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-4xl font-bold">{t("heading")}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">{t("description")}</p>
    </main>
  );
}
