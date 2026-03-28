"use client";

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
        <div className="mt-3 flex flex-wrap gap-2">
          {TIERS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTier(t)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold capitalize ${
                tier === t
                  ? "border-amber-400/60 bg-amber-400/10 text-amber-400"
                  : "border-zinc-800 text-zinc-400 hover:border-zinc-600"
              }`}
            >
              {t}
            </button>
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
                className="flex items-center justify-between px-4 py-3 text-sm font-medium text-white hover:bg-zinc-900/50"
              >
                {item.label}
                <ChevronRight className="size-4 text-zinc-600" />
              </Link>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
