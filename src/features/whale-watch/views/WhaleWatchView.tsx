"use client";

import { PremiumGate } from "@/features/paywall/components/PremiumGate";
import { Waves } from "lucide-react";

export function WhaleWatchView() {
  return (
    <div className="space-y-5">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="h-px w-6 bg-amber-400/80" aria-hidden />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
            Features · Whale Watch
          </span>
        </div>
        <div className="flex items-start gap-2">
          <Waves className="mt-0.5 size-5 shrink-0 text-amber-400" />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Whale <span className="text-amber-400">Watch</span>
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Live on-chain institutional flow for BTC and ETH.
            </p>
          </div>
        </div>
      </div>

      <PremiumGate
        requiredTier="essential"
        title="Essential Plan Required"
        description="Institutional-grade on-chain whale flow analysis is available on the Essential plan and above."
        ctaLabel="Upgrade to Essential"
      >
        <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#0A0A0A] p-5">
          <div className="mb-2 flex items-center gap-2 text-amber-400">
            <Waves className="size-4" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              Institutional Pulse — Live
            </span>
          </div>
          <p className="text-sm text-white">
            Live on-chain whale flow monitoring for{" "}
            <span className="text-amber-400">BTC</span> and{" "}
            <span className="text-amber-400">ETH</span>.
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            Tracks institutional transfers ≥ $250K USD. Inflows to exchanges
            may signal sell pressure; outflows suggest accumulation.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
            {["BTC NET FLOW", "ETH NET FLOW", "BTC BASELINE (7D)", "SIGNAL"].map(
              (label) => (
                <div key={label} className="rounded-lg border border-zinc-800/80 bg-black/40 py-3">
                  <div className="text-[9px] font-bold uppercase tracking-wide text-zinc-500">
                    {label}
                  </div>
                  <div className="mt-1 text-lg text-zinc-400">—</div>
                </div>
              ),
            )}
          </div>
          <Waves
            className="pointer-events-none absolute -right-4 -top-4 size-32 text-amber-400/10"
            aria-hidden
          />
        </div>
      </PremiumGate>

      <p className="flex items-center justify-center gap-2 text-center text-[10px] font-medium uppercase tracking-wider text-zinc-600">
        <span className="size-1.5 rounded-full bg-emerald-500" />
        Proprietary on-chain engine · goldh.ai
      </p>
    </div>
  );
}
