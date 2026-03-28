"use client";

import { WeeklyBriefCard } from "@/features/pulse/components/WeeklyBriefCard";
import { AssetDataGrid } from "@/features/pulse/components/AssetDataGrid";
import { useMarketData } from "@/features/pulse/hooks/useMarketData";
import { Activity, Search } from "lucide-react";
import { useMemo, useState } from "react";

export function PulsePageClient() {
  const { data, isPending, isError, error, isFetching } = useMarketData();
  const [q, setQ] = useState("");

  const filteredAssets = useMemo(() => {
    const list = data?.assets ?? [];
    const s = q.trim().toLowerCase();
    if (!s) return list;
    return list.filter(
      (a) =>
        a.symbol.toLowerCase().includes(s) ||
        a.name.toLowerCase().includes(s),
    );
  }, [data?.assets, q]);

  return (
    <div className="space-y-5">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="h-px w-6 bg-amber-400/80" aria-hidden />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
            Features · Pulse
          </span>
        </div>
        <div className="flex items-start gap-2">
          <Activity className="mt-0.5 size-5 shrink-0 text-amber-400" />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              GoldH <span className="text-amber-400">Pulse</span>
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Live multi-asset tape with weekly institutional context.
            </p>
          </div>
        </div>
      </div>

      {isError && (
        <div
          className="rounded-xl border border-red-500/40 bg-red-950/30 px-4 py-3 text-sm text-red-200"
          role="alert"
        >
          {error?.message ?? "Failed to load market data."}
        </div>
      )}

      {data?.weeklyBrief && (
        <WeeklyBriefCard brief={data.weeklyBrief} />
      )}

      <div
        className="rounded-xl border border-amber-500/25 bg-amber-500/5 px-3 py-2.5 text-xs text-amber-200/90"
        role="status"
      >
        {data?.dataSource === "live" ? (
          <>
            <span className="font-semibold">Live crypto</span> via CoinGecko
            (server). Equities/indices are illustrative. React Query cache ≈30s.{" "}
            {isFetching && !isPending ? "Refreshing…" : null}
          </>
        ) : (
          <>
            <span className="font-semibold">Offline sample data.</span> CoinGecko
            unavailable or validation failed — showing the mock payload.{" "}
            {isFetching && !isPending ? "Retrying…" : null}
          </>
        )}
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, ID, keyword"
            className="w-full rounded-xl border border-zinc-800 bg-[#0A0A0A] py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-zinc-600 focus:border-amber-400/40 focus:outline-none focus:ring-1 focus:ring-amber-400/30"
          />
        </div>
        <div className="flex shrink-0 items-center rounded-xl border border-zinc-800 bg-[#0A0A0A] px-3 text-[10px] font-medium uppercase tracking-wide text-zinc-500">
          Cached ≤30s
        </div>
      </div>

      <AssetDataGrid assets={filteredAssets} isLoading={isPending} />
    </div>
  );
}
