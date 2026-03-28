"use client";

import type { SubscriptionTier } from "@/stores/usePaywallStore";
import {
  tierMeetsRequirement,
  usePaywallStore,
} from "@/stores/usePaywallStore";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

export interface PremiumGateProps {
  requiredTier: SubscriptionTier;
  title: string;
  description: string;
  ctaLabel: string;
  onCtaClick?: () => void;
  children: ReactNode;
}

export function PremiumGate({
  requiredTier,
  title,
  description,
  ctaLabel,
  onCtaClick,
  children,
}: PremiumGateProps) {
  const router = useRouter();
  const tier = usePaywallStore((s) => s.subscriptionTier);
  const unlocked = tierMeetsRequirement(tier, requiredTier);

  function handleCta() {
    if (onCtaClick) {
      onCtaClick();
      return;
    }
    router.push("/pricing");
  }

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#0A0A0A]">
      <div className="pointer-events-none select-none blur-sm opacity-40">
        {children}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/55 px-6 text-center backdrop-blur-md">
        <div className="mb-4 flex size-12 items-center justify-center rounded-xl border border-amber-400/60 bg-black/60">
          <Lock className="size-6 text-amber-400" strokeWidth={1.75} />
        </div>
        <h2 className="text-lg font-bold tracking-tight text-white">
          {title}
        </h2>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-400">
          {description}
        </p>
        <button
          type="button"
          onClick={handleCta}
          className="mt-6 w-full max-w-xs rounded-xl bg-amber-400 py-3 text-sm font-bold uppercase tracking-wide text-black shadow-lg shadow-amber-400/20 transition hover:bg-amber-300 hover:shadow-amber-400/30 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}
