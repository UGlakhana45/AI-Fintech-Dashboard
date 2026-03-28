"use client";

import { PremiumGate } from "@/features/paywall/components/PremiumGate";
import { Zap } from "lucide-react";

export function CatalystIntelligenceView() {
  return (
    <div className="space-y-5">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="h-px w-6 bg-amber-400/80" aria-hidden />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
            Features · Catalyst
          </span>
        </div>
        <div className="flex items-start gap-2">
          <Zap className="mt-0.5 size-5 shrink-0 text-amber-400" />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Catalyst <span className="text-amber-400">Intelligence</span>
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Macro events, earnings catalysts, and regime signals.
            </p>
          </div>
        </div>
      </div>

      <PremiumGate
        requiredTier="essential"
        title="Catalyst Intelligence is Essential+"
        description="Get access to macro event impact scoring, earnings catalysts, trigger alerts, and regime detection. Upgrade to unlock the full intelligence feed."
        ctaLabel="Upgrade to Essential"
      >
        <div className="space-y-4 p-5">
          <p className="text-sm text-zinc-400">
            Premium feed: FOMC impact scores, earnings drift, liquidity
            regimes, and smart alerts — unlocked on Essential.
          </p>
          <div className="h-32 rounded-xl border border-dashed border-zinc-700 bg-black/30" />
        </div>
      </PremiumGate>
    </div>
  );
}
