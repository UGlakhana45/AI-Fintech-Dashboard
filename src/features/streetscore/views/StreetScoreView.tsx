"use client";

import { PremiumGate } from "@/features/paywall/components/PremiumGate";
import { BarChart3 } from "lucide-react";

export function StreetScoreView() {
  return (
    <div className="space-y-5">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="h-px w-6 bg-amber-400/80" aria-hidden />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
            Analyst consensus engine
          </span>
        </div>
        <div className="flex items-start gap-2">
          <BarChart3 className="mt-0.5 size-6 shrink-0 text-amber-400" />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              STREET<span className="text-amber-400">Score</span>
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-zinc-500">
              Analyst consensus score (0–100), A–F grade, and signal chips across
              the full ticker universe.
            </p>
          </div>
        </div>
      </div>

      <PremiumGate
        requiredTier="pro"
        title="STREETScore is PRO+"
        description="Upgrade to PRO to access analyst consensus scores, grade rankings, and signal chips across all 380 tickers."
        ctaLabel="Upgrade to PRO"
      >
        <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
          {["AAPL", "MSFT", "NVDA", "META", "AMZN", "GOOGL"].map((s) => (
            <div
              key={s}
              className="rounded-xl border border-zinc-800 bg-black/40 p-4"
            >
              <p className="text-lg font-bold text-white">{s}</p>
              <p className="text-xs text-zinc-500">Score · Grade · Signal</p>
            </div>
          ))}
        </div>
      </PremiumGate>
    </div>
  );
}
