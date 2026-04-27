import { getTranslations } from "next-intl/server";
import {
  DashboardHero,
  DashboardProductCard,
  GuideCard,
  HighlightProductCard,
  MiniTableCard,
} from "./_components/public-shell";

export default async function HomePage() {
  const t = await getTranslations("Home");

  return (
    <div className="space-y-10">
      <DashboardHero
        actionLabel={t("about.label")}
        description={t("description")}
        eyebrow={t("eyebrow")}
        title={t("heading")}
      />

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-normal text-[#151238]">{t("dashboard.productsTitle")}</h2>
          <span className="hidden text-sm font-medium text-slate-400 sm:inline">{t("dashboard.viewAll")}</span>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <DashboardProductCard
            body={t("cards.server.body")}
            detail={t("cards.server.detail")}
            eyebrow={t("cards.server.eyebrow")}
            title={t("cards.server.title")}
            variant="lavender"
          />
          <DashboardProductCard
            body={t("cards.routing.body")}
            detail={t("cards.routing.detail")}
            eyebrow={t("cards.routing.eyebrow")}
            title={t("cards.routing.title")}
            variant="navy"
          />
          <DashboardProductCard
            body={t("cards.font.body")}
            detail={t("cards.font.detail")}
            eyebrow={t("cards.font.eyebrow")}
            title={t("cards.font.title")}
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
              label: t("tables.foundation.rows.runtime.label"),
              value: t("tables.foundation.rows.runtime.value"),
              tone: "blue",
            },
            {
              label: t("tables.foundation.rows.routing.label"),
              value: t("tables.foundation.rows.routing.value"),
              tone: "pink",
            },
            {
              label: t("tables.foundation.rows.font.label"),
              value: t("tables.foundation.rows.font.value"),
              tone: "green",
            },
          ]}
          title={t("tables.foundation.title")}
        />
        <MiniTableCard
          actionLabel={t("dashboard.viewAll")}
          rows={[
            {
              label: t("tables.routes.rows.home.label"),
              value: t("tables.routes.rows.home.value"),
              tone: "blue",
            },
            {
              label: t("tables.routes.rows.about.label"),
              value: t("tables.routes.rows.about.value"),
              tone: "green",
            },
            {
              label: t("tables.routes.rows.locale.label"),
              value: t("tables.routes.rows.locale.value"),
              tone: "pink",
            },
          ]}
          title={t("tables.routes.title")}
        />
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-normal text-[#151238]">{t("guides.title")}</h2>
          <span className="hidden text-sm font-medium text-slate-400 sm:inline">{t("dashboard.viewAll")}</span>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          <GuideCard body={t("guides.server.body")} title={t("guides.server.title")} />
          <GuideCard body={t("guides.routing.body")} title={t("guides.routing.title")} />
          <GuideCard body={t("guides.about.body")} title={t("guides.about.title")} />
        </div>
      </section>
    </div>
  );
}
