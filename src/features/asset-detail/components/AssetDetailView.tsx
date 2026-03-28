"use client";

import { AssetPriceChart } from "@/features/asset-detail/components/AssetPriceChart";
import { useAssetDetail } from "@/features/asset-detail/hooks/useAssetDetail";
import { toCoinGeckoCoinId } from "@/lib/coingecko-resolve";
import { cn } from "@/lib/utils";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

const DAY_OPTIONS = [7, 30, 90] as const;

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const usdCompact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

function pctFmt(n: number | null): string {
  if (n === null) return "—";
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toFixed(2)}%`;
}

export function AssetDetailView() {
  const params = useParams();
  const raw =
    typeof params.coinId === "string"
      ? params.coinId
      : Array.isArray(params.coinId)
        ? params.coinId[0]
        : "";
  const coinId = useMemo(() => decodeURIComponent(raw ?? ""), [raw]);
  const resolved = toCoinGeckoCoinId(coinId);

  const [days, setDays] = useState<(typeof DAY_OPTIONS)[number]>(30);
  const { data, isPending, isError, error } = useAssetDetail(resolved, days);

  return (
    <div className="space-y-6 pb-6">
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-[#0A0A0A] px-3 py-2 text-xs font-semibold text-zinc-300 transition hover:border-amber-400/40 hover:text-amber-400"
        >
          <ArrowLeft className="size-3.5" />
          Back
        </Link>
        <a
          href={`https://www.coingecko.com/en/coins/${resolved}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-amber-400/90 hover:text-amber-300"
        >
          CoinGecko
          <ExternalLink className="size-3" />
        </a>
      </div>

      {isError && (
        <div
          className="rounded-xl border border-red-500/40 bg-red-950/30 px-4 py-3 text-sm text-red-200"
          role="alert"
        >
          {error?.message ?? "Could not load asset."}
        </div>
      )}

      {isPending && (
        <div className="space-y-4">
          <div className="h-10 w-48 animate-pulse rounded-lg bg-zinc-900" />
          <div className="h-[340px] animate-pulse rounded-2xl bg-zinc-900" />
        </div>
      )}

      {data && !isPending ? (
        <>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              {data.imageUrl ? (
                <Image
                  src={data.imageUrl}
                  alt=""
                  width={40}
                  height={40}
                  className="size-10 rounded-xl border border-zinc-800 bg-black object-contain"
                />
              ) : (
                <div className="flex size-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-sm font-bold text-amber-400">
                  {data.symbol.slice(0, 2)}
                </div>
              )}
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  {data.dataSource === "live" ? "Live · CoinGecko" : "Demo data"}
                </p>
                <h1 className="text-2xl font-bold text-white sm:text-3xl">
                  {data.name}{" "}
                  <span className="text-amber-400">{data.symbol}</span>
                </h1>
              </div>
            </div>
            <div className="flex gap-2">
              {DAY_OPTIONS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDays(d)}
                  className={cn(
                    "rounded-xl border px-3 py-2 text-xs font-semibold transition-colors",
                    days === d
                      ? "border-amber-400/50 bg-amber-400/10 text-amber-400"
                      : "border-zinc-800 bg-[#0A0A0A] text-zinc-500 hover:border-zinc-600 hover:text-zinc-200",
                  )}
                >
                  {d}D
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Price" value={data.priceUsd != null ? usd.format(data.priceUsd) : "—"} />
            <Stat
              label="24h change"
              value={pctFmt(data.change24hPct)}
              valueClass={
                (data.change24hPct ?? 0) < 0
                  ? "text-red-500"
                  : (data.change24hPct ?? 0) > 0
                    ? "text-emerald-500"
                    : undefined
              }
            />
            <Stat
              label="7d change"
              value={pctFmt(data.change7dPct)}
              valueClass={
                (data.change7dPct ?? 0) < 0
                  ? "text-red-500"
                  : (data.change7dPct ?? 0) > 0
                    ? "text-emerald-500"
                    : undefined
              }
            />
            <Stat
              label="Market cap"
              value={
                data.marketCapUsd != null
                  ? usdCompact.format(data.marketCapUsd)
                  : "—"
              }
            />
            <Stat
              label="Volume (24h)"
              value={
                data.volumeUsd != null ? usdCompact.format(data.volumeUsd) : "—"
              }
            />
            <Stat
              label="24h high"
              value={data.high24hUsd != null ? usd.format(data.high24hUsd) : "—"}
            />
            <Stat
              label="24h low"
              value={data.low24hUsd != null ? usd.format(data.low24hUsd) : "—"}
            />
            <Stat
              label="Circ. supply"
              value={
                data.circulatingSupply != null
                  ? `${new Intl.NumberFormat("en-US", {
                      maximumFractionDigits: 0,
                    }).format(data.circulatingSupply)} ${data.symbol}`
                  : "—"
              }
            />
          </div>

          <section className="rounded-2xl border border-zinc-800/80 bg-[#0A0A0A] p-4 sm:p-6">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-zinc-500">
              Price · USD ({data.chartDays}D)
            </h2>
            <AssetPriceChart series={data.chart} />
          </section>

          {(data.athUsd != null || data.athChangePct != null) && (
            <section className="rounded-2xl border border-zinc-800/80 bg-[#0A0A0A] p-4">
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-zinc-500">
                All-time high
              </h2>
              <p className="text-lg font-semibold text-white">
                {data.athUsd != null ? usd.format(data.athUsd) : "—"}
                {data.athChangePct != null ? (
                  <span className="ml-2 text-sm text-zinc-500">
                    ({pctFmt(data.athChangePct)} vs ATH)
                  </span>
                ) : null}
              </p>
            </section>
          )}

          <p className="text-center text-[10px] text-zinc-600">
            Data: CoinGecko public API (server). Demo fallback if rate-limited or
            offline. Not investment advice.
          </p>
        </>
      ) : null}
    </div>
  );
}

function Stat({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800/80 bg-black/30 px-4 py-3">
      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 text-sm font-semibold tabular-nums text-white",
          valueClass,
        )}
      >
        {value}
      </p>
    </div>
  );
}
