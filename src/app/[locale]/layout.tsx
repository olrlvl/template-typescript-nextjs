import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { PublicShell } from "./_components/public-shell";

export default async function PublicLayout({ children }: { children: ReactNode }) {
  const t = await getTranslations("Common");

  return (
    <PublicShell
      aboutLabel={t("navigation.about")}
      brandLabel={t("siteName")}
      callToActionLabel={t("navigation.callToAction")}
      homeLabel={t("navigation.home")}
    >
      {children}
    </PublicShell>
  );
}
