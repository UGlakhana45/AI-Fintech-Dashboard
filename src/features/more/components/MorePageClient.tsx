"use client";

import { TierSelectChip } from "@/features/paywall/components/TierSelectChip";
import type { SubscriptionTier } from "@/stores/usePaywallStore";
import { usePaywallStore } from "@/stores/usePaywallStore";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const TIERS: SubscriptionTier[] = ["free", "essential", "pro"];

const LINKS: { href: string; label: string; disabled?: boolean }[] = [
  { href: "/guru-talk", label: "Guru Talk" },
  { href: "/streetscore", label: "STREETScore" },
  { href: "/portfolio-intelligence", label: "Portfolio Intelligence" },
  { href: "/cio-insights", label: "CIO Insights" },
  { href: "/learn", label: "Learn" },
  { href: "/profile", label: "Profile & settings" },
  { href: "/pricing", label: "Pricing" },
];

export function MorePageClient() {
  const tier = usePaywallStore((s) => s.subscriptionTier);
  const setTier = usePaywallStore((s) => s.setSubscriptionTier);

  return (
    <div className="space-y-6">
      <p className="text-sm text-zinc-500">
        Hub for secondary destinations and demo controls.
      </p>

      <section className="rounded-2xl border border-zinc-800/80 bg-[#0A0A0A] p-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
          Dev · Subscription tier
        </h2>
        <p className="mt-1 text-xs text-zinc-500">
          Toggle to verify PremiumGate across Catalyst and Whale.
        </p>
        <div
          className="mt-3 flex flex-wrap gap-2"
          role="group"
          aria-label="Subscription tier"
        >
          {TIERS.map((t) => (
            <TierSelectChip
              key={t}
              tier={t}
              selected={tier === t}
              onSelect={setTier}
            />
          ))}
        </div>
      </section>

      <ul className="divide-y divide-zinc-900 rounded-2xl border border-zinc-800/80 bg-[#0A0A0A]">
        {LINKS.map((item) =>
          item.disabled ? (
            <li
              key={item.label}
              className="flex items-center justify-between px-4 py-3 text-zinc-600"
            >
              {item.label}
            </li>
          ) : (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex items-center justify-between px-4 py-3 text-sm font-medium text-white outline-none transition-colors hover:bg-zinc-900/70 hover:text-amber-100/95 focus-visible:bg-zinc-900 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-400/35 active:bg-zinc-900"
              >
                {item.label}
                <ChevronRight className="size-4 shrink-0 text-zinc-600 transition-colors group-hover:text-amber-400/80" />
              </Link>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
