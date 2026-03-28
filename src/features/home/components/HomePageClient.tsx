"use client";

import { PremiumGate } from "@/features/paywall/components/PremiumGate";
import { useMarketData } from "@/features/pulse/hooks/useMarketData";
import { assetDetailHref } from "@/lib/coingecko-resolve";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useMemo } from "react";

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function HomePageClient() {
  const { data, isPending } = useMarketData();
  const brief = data?.weeklyBrief;
  const cryptoSnapshot = useMemo(() => {
    const crypto = (data?.assets ?? []).filter((a) => a.class === "crypto");
    return crypto.slice(0, 6);
  }, [data?.assets]);

  return (
    <div className="space-y-5 pb-2">
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-3 py-2.5 text-[11px] text-amber-100/90">
        <span aria-hidden>⚠️ </span>
        You are viewing delayed data.{" "}
        <Link
          href="/pricing"
          className="font-semibold text-amber-400 underline underline-offset-2"
        >
          Upgrade to Essentials
        </Link>{" "}
        for live refresh.
      </div>

      <div>
        <p className="text-2xl font-bold tracking-tight text-white">
          {greeting()}, <span className="text-amber-400">Uday</span>
        </p>
        <p className="mt-1 text-sm text-zinc-500">
          Your GOLDH intelligence center.
        </p>
      </div>

      {brief && (
        <article className="rounded-2xl border border-zinc-800/80 bg-[#0A0A0A] p-4">
          <div className="mb-2 flex items-center gap-2 text-amber-400">
            <Sparkles className="size-4" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              Morning Pulse
            </span>
          </div>
          <p className="text-sm font-semibold leading-snug text-white">
            {brief.headline}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {brief.badges.map((b) => (
              <span
                key={b.symbol}
                className="rounded-md border border-zinc-800 bg-black/50 px-2 py-1 text-[11px] font-semibold text-white"
              >
                {b.symbol}{" "}
                <span
                  className={b.changePct < 0 ? "text-red-500" : "text-emerald-500"}
                >
                  {b.changePct > 0 ? "+" : ""}
                  {b.changePct.toFixed(2)}%
                </span>
              </span>
            ))}
          </div>
          <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-zinc-500">
            {brief.body}
          </p>
          <div className="relative mt-3 overflow-hidden rounded-xl border border-zinc-800/60">
            <div className="pointer-events-none blur-sm">
              <p className="p-3 text-[11px] text-zinc-600">
                Full desk stats: breadth, factor tilt, and flow imbalance —
                Essential.
              </p>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
              <span className="text-[10px] font-semibold text-zinc-400">
                Full stats available on Essential
              </span>
              <Link
                href="/pricing"
                className="mt-2 inline-block text-[10px] font-bold uppercase tracking-wider text-amber-400"
              >
                Upgrade to Essential
              </Link>
            </div>
          </div>
        </article>
      )}

      <section>
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          Market snapshot
        </h2>
        <p className="text-xs text-zinc-600">
          Top crypto ({cryptoSnapshot.length}). Tap for deep research & charts.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-3">
          {isPending &&
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-xl bg-zinc-900/80"
              />
            ))}
          {!isPending &&
            cryptoSnapshot.map((a) => (
              <Link
                key={a.id}
                href={assetDetailHref(a.id)}
                className="rounded-xl border border-zinc-800/80 bg-[#0A0A0A] p-3 transition hover:border-amber-400/35 hover:bg-zinc-900/40"
              >
                <p className="text-sm font-bold text-amber-400">{a.symbol}</p>
                <p className="truncate text-[10px] uppercase text-zinc-500">
                  {a.name}
                </p>
                <p className="mt-1 text-sm text-white">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: a.priceUsd < 10 ? 4 : 0,
                  }).format(a.priceUsd)}
                </p>
                {(a.change24hPct ?? null) !== null ? (
                  <p
                    className={`mt-1 text-[11px] font-semibold ${
                      (a.change24hPct ?? 0) < 0
                        ? "text-red-500"
                        : "text-emerald-500"
                    }`}
                  >
                    24h {(a.change24hPct ?? 0) > 0 ? "+" : ""}
                    {(a.change24hPct ?? 0).toFixed(2)}%
                  </p>
                ) : null}
              </Link>
            ))}
        </div>
      </section>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-2">
        <Link
          href="/guru-talk"
          className="rounded-xl border border-zinc-800/80 bg-[#0A0A0A] p-3 transition hover:border-amber-400/35"
        >
          <p className="text-[10px] font-bold uppercase text-amber-400/90">
            Guru Talk
          </p>
          <p className="mt-2 text-xs text-zinc-500">
            Open alpha insights →
          </p>
        </Link>
        <Link
          href="/catalyst"
          className="rounded-xl border border-zinc-800/80 bg-[#0A0A0A] p-3 transition hover:border-amber-400/35"
        >
          <p className="text-[10px] font-bold uppercase text-amber-400/90">
            Catalyst Events
          </p>
          <p className="mt-2 text-xs text-zinc-500">
            View catalyst intelligence →
          </p>
        </Link>
      </div>

      <PremiumGate
        requiredTier="essential"
        title="Essential Plan Required"
        description="Institutional-grade on-chain whale flow analysis is available on the Essential plan and above."
        ctaLabel="Upgrade to Essential"
      >
        <div className="rounded-2xl border border-zinc-800 bg-[#0A0A0A] p-4 text-sm text-zinc-500">
          Unlocked whale flow dashboard.
        </div>
      </PremiumGate>

      <Link
        href="/demo/portfolio"
        className="block text-center text-xs text-zinc-600 underline-offset-2 hover:text-amber-400"
      >
        Legacy portfolio demo
      </Link>
    </div>
  );
}
