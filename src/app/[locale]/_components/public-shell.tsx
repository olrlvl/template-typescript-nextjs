import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PublicShellProps = {
  aboutLabel: string;
  brandLabel: string;
  callToActionLabel: string;
  children: ReactNode;
  homeLabel: string;
};

type DashboardHeroProps = {
  actionHref?: string;
  actionLabel?: string;
  description: string;
  eyebrow: string;
  title: string;
};

type DashboardProductCardProps = {
  body: string;
  detail: string;
  eyebrow: string;
  title: string;
  variant?: "blue" | "lavender" | "navy" | "pink";
};

type MiniTableCardProps = {
  actionLabel: string;
  className?: string;
  rows: {
    label: string;
    tone?: "blue" | "green" | "pink";
    value: string;
  }[];
  title: string;
};

type GuideCardProps = {
  body: string;
  title: string;
};

const productCardStyles = {
  blue: "from-[#6d63ff] to-[#3528d8] text-white",
  lavender: "from-[#dedbff] to-[#aaa1ff] text-slate-950",
  navy: "from-[#383784] to-[#08072e] text-white",
  pink: "from-[#fa79a8] to-[#ef4f86] text-white",
};

const rowToneStyles = {
  blue: "bg-blue-50 text-blue-700",
  green: "bg-emerald-50 text-emerald-700",
  pink: "bg-pink-50 text-pink-700",
};

export function PublicShell({
  aboutLabel,
  brandLabel,
  callToActionLabel,
  children,
  homeLabel,
}: PublicShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#dde1ff] px-4 py-4 text-slate-950 sm:px-6 sm:py-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_58%,rgba(255,255,255,0.72),transparent_18%),radial-gradient(circle_at_88%_34%,rgba(238,91,226,0.3),transparent_20%),linear-gradient(135deg,#eef0ff_0%,#d7dcff_48%,#f3e8ff_100%)]" />
      <DecorativeImages />
      <ShowcaseFrame
        aboutLabel={aboutLabel}
        brandLabel={brandLabel}
        callToActionLabel={callToActionLabel}
        homeLabel={homeLabel}
      >
        {children}
      </ShowcaseFrame>
    </div>
  );
}

export function DashboardHero({ actionHref = "/about", actionLabel, description, eyebrow, title }: DashboardHeroProps) {
  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
      <div className="space-y-3">
        <p className="text-sm font-semibold text-indigo-500">{eyebrow}</p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-normal text-[#151238] sm:text-5xl">
          {title}
        </h1>
        <p className="max-w-2xl text-base leading-7 text-slate-500">{description}</p>
      </div>
      {actionLabel ? (
        <Link
          href={actionHref}
          className="inline-flex w-fit rounded-lg bg-[#4437f5] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_35px_rgba(68,55,245,0.28)] transition-transform hover:-translate-y-0.5"
        >
          {actionLabel}
        </Link>
      ) : null}
    </section>
  );
}

export function DashboardProductCard({
  body,
  detail,
  eyebrow,
  title,
  variant = "lavender",
}: DashboardProductCardProps) {
  return (
    <article className="overflow-hidden rounded-lg bg-white shadow-[0_20px_45px_rgba(67,56,202,0.08)]">
      <div className={cn("h-40 bg-gradient-to-br p-5", productCardStyles[variant])}>
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-white/60" />
          <span className="size-3 rounded-full bg-white/45" />
          <span className="size-3 rounded-full bg-white/30" />
        </div>
        <div className="mt-8 space-y-3">
          <p className="w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">{eyebrow}</p>
          <h2 className="max-w-48 text-2xl font-semibold leading-tight tracking-normal">{title}</h2>
        </div>
      </div>
      <div className="space-y-3 px-5 py-4">
        <p className="text-sm leading-6 text-slate-500">{body}</p>
        <p className="text-sm font-semibold text-[#151238]">{detail}</p>
      </div>
    </article>
  );
}

export function HighlightProductCard({ body, label, title }: { body: string; label: string; title: string }) {
  return (
    <article className="relative min-h-64 overflow-hidden rounded-lg bg-[#4538f2] p-6 text-white shadow-[0_24px_60px_rgba(68,55,245,0.28)]">
      <div className="absolute -bottom-10 -left-7 h-36 w-32 rounded-[40%] bg-pink-300/80 blur-sm" />
      <div className="absolute -right-10 bottom-8 h-32 w-32 rotate-12 rounded-lg bg-white/20" />
      <div className="relative flex h-full flex-col justify-between gap-10">
        <span className="w-fit rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#4437f5]">{label}</span>
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold leading-tight tracking-normal">{title}</h2>
          <p className="text-sm leading-6 text-white/78">{body}</p>
        </div>
      </div>
    </article>
  );
}

export function MiniTableCard({ actionLabel, className, rows, title }: MiniTableCardProps) {
  return (
    <section className={cn("rounded-lg bg-white p-5 shadow-[0_20px_45px_rgba(67,56,202,0.08)]", className)}>
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-normal text-[#151238]">{title}</h2>
        <span className="text-sm font-medium text-slate-400">{actionLabel}</span>
      </div>
      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 text-sm">
            <p className="truncate font-medium text-slate-600">{row.label}</p>
            <p className={cn("rounded-full px-3 py-1 font-semibold", rowToneStyles[row.tone ?? "blue"])}>
              {row.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function GuideCard({ body, title }: GuideCardProps) {
  return (
    <article className="flex items-center gap-4 rounded-lg bg-white px-5 py-4 shadow-[0_18px_36px_rgba(67,56,202,0.08)]">
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#ef5b93] text-sm font-semibold text-white">
        <span className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-white" />
      </span>
      <div className="min-w-0">
        <h3 className="truncate text-sm font-semibold text-[#151238]">{title}</h3>
        <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-500">{body}</p>
      </div>
    </article>
  );
}

function ShowcaseFrame({
  aboutLabel,
  brandLabel,
  callToActionLabel,
  children,
  homeLabel,
}: PublicShellProps) {
  return (
    <div className="relative mx-auto my-4 w-full max-w-7xl overflow-hidden rounded-[28px] bg-white/80 shadow-[0_30px_90px_rgba(67,56,202,0.2)] ring-1 ring-white/70 backdrop-blur sm:my-10">
      <DashboardNav
        aboutLabel={aboutLabel}
        brandLabel={brandLabel}
        callToActionLabel={callToActionLabel}
        homeLabel={homeLabel}
      />
      <main className="bg-[#f5f3ff] px-5 py-8 sm:px-8 lg:px-28 lg:py-12">{children}</main>
    </div>
  );
}

function DashboardNav({ aboutLabel, brandLabel, callToActionLabel, homeLabel }: Omit<PublicShellProps, "children">) {
  return (
    <header className="flex h-20 items-center justify-between gap-4 bg-white px-5 sm:px-8 lg:px-20">
      <Link href="/" className="min-w-0 text-xl font-semibold text-[#4e46f5]">
        <span className="block truncate">{brandLabel}</span>
      </Link>
      <nav className="hidden items-center gap-3 text-sm font-semibold text-slate-400 sm:flex">
        <Link href="/" className="rounded-lg bg-[#f3f1ff] px-5 py-3 text-[#151238]">
          {homeLabel}
        </Link>
        <Link href="/about" className="rounded-lg px-5 py-3 transition-colors hover:bg-[#f3f1ff] hover:text-[#151238]">
          {aboutLabel}
        </Link>
      </nav>
      <Link
        href="/about"
        className="shrink-0 rounded-lg bg-[#4437f5] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(68,55,245,0.24)]"
      >
        {callToActionLabel}
      </Link>
    </header>
  );
}

function DecorativeImages() {
  return (
    <>
      <Image
        src="/images/public-showcase/lavender-magenta-ring.png"
        alt=""
        width={320}
        height={320}
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 bottom-20 hidden rotate-12 opacity-90 blur-[0.2px] lg:block"
      />
      <Image
        src="/images/public-showcase/soft-translucent-cube.png"
        alt=""
        width={220}
        height={220}
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 bottom-36 hidden rotate-12 opacity-80 blur-[0.2px] lg:block"
      />
      <Image
        src="/images/public-showcase/magenta-prism.png"
        alt=""
        width={180}
        height={180}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 right-24 hidden opacity-90 blur-[0.2px] lg:block"
      />
    </>
  );
}
