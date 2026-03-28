"use client";

import type { SubscriptionTier } from "@/stores/usePaywallStore";
import { cn } from "@/lib/utils";

export interface TierSelectChipProps {
  tier: SubscriptionTier;
  selected: boolean;
  onSelect: (tier: SubscriptionTier) => void;
  className?: string;
}

const LABELS: Record<SubscriptionTier, string> = {
  free: "Free",
  essential: "Essential",
  pro: "Pro",
};

export function TierSelectChip({
  tier,
  selected,
  onSelect,
  className,
}: TierSelectChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(tier)}
      className={cn(
        "rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all duration-200",
        "active:scale-[0.97]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]",
        selected
          ? "border-amber-400/70 bg-amber-400/15 text-amber-400 shadow-[inset_0_0_0_1px_rgba(251,191,36,0.15)]"
          : "border-zinc-800 bg-black/30 text-zinc-400 hover:border-amber-400/45 hover:bg-zinc-900/85 hover:text-zinc-100",
        className,
      )}
    >
      {LABELS[tier]}
    </button>
  );
}
