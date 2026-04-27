import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo/metadata";
import type { Locale } from "@/lib/i18n/config";
import {
  DashboardHero,
  DashboardProductCard,
  GuideCard,
  HighlightProductCard,
  MiniTableCard,
} from "../_components/public-shell";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations({ locale, namespace: "About" });

  return buildMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/about",
  });
}

export default async function AboutPage() {
  const t = await getTranslations("About");

  return (
    <div className="space-y-10">
      <DashboardHero description={t("description")} eyebrow={t("eyebrow")} title={t("heading")} />

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-normal text-[#151238]">{t("dashboard.productsTitle")}</h2>
          <span className="hidden text-sm font-medium text-slate-400 sm:inline">{t("dashboard.viewAll")}</span>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <DashboardProductCard
            body={t("cards.routing.body")}
            detail={t("cards.routing.detail")}
            eyebrow={t("cards.routing.eyebrow")}
            title={t("cards.routing.title")}
            variant="lavender"
          />
          <DashboardProductCard
            body={t("cards.stack.body")}
            detail={t("cards.stack.detail")}
            eyebrow={t("cards.stack.eyebrow")}
            title={t("cards.stack.title")}
            variant="navy"
          />
          <DashboardProductCard
            body={t("cards.workflow.body")}
            detail={t("cards.workflow.detail")}
            eyebrow={t("cards.workflow.eyebrow")}
            title={t("cards.workflow.title")}
            variant="pink"
          />
          <HighlightProductCard body={t("panel.body")} label={t("panel.eyebrow")} title={t("panel.title")} />
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.8fr)]">
        <MiniTableCard
          actionLabel={t("dashboard.viewAll")}
          rows={[
            {
              label: t("steps.create.title"),
              value: t("tables.flow.rows.create.value"),
              tone: "blue",
            },
            {
              label: t("steps.messages.title"),
              value: t("tables.flow.rows.messages.value"),
              tone: "pink",
            },
            {
              label: t("steps.sitemap.title"),
              value: t("tables.flow.rows.sitemap.value"),
              tone: "green",
            },
          ]}
          title={t("tables.flow.title")}
        />
        <MiniTableCard
          actionLabel={t("dashboard.viewAll")}
          rows={[
            {
              label: t("tables.publicRoute.rows.path.label"),
              value: t("tables.publicRoute.rows.path.value"),
              tone: "blue",
            },
            {
              label: t("tables.publicRoute.rows.locale.label"),
              value: t("tables.publicRoute.rows.locale.value"),
              tone: "pink",
            },
            {
              label: t("tables.publicRoute.rows.metadata.label"),
              value: t("tables.publicRoute.rows.metadata.value"),
              tone: "green",
            },
          ]}
          title={t("tables.publicRoute.title")}
        />
      </section>

      <section className="space-y-5">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-indigo-500">{t("nextStepEyebrow")}</p>
          <h2 className="text-2xl font-semibold tracking-normal text-[#151238]">{t("nextStepTitle")}</h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          <GuideCard body={t("steps.create.body")} title={t("steps.create.title")} />
          <GuideCard body={t("steps.messages.body")} title={t("steps.messages.title")} />
          <GuideCard body={t("steps.sitemap.body")} title={t("steps.sitemap.title")} />
        </div>
      </section>
    </div>
  );
}
