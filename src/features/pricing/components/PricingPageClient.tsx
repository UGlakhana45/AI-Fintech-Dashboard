"use client";

import { TierSelectChip } from "@/features/paywall/components/TierSelectChip";
import type { SubscriptionTier } from "@/stores/usePaywallStore";
import { usePaywallStore } from "@/stores/usePaywallStore";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const TIERS: SubscriptionTier[] = ["free", "essential", "pro"];

const PLANS: {
  id: SubscriptionTier;
  name: string;
  tagline: string;
  price: string;
  period: string;
  features: string[];
  highlight?: boolean;
}[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Explore the platform and delayed snapshots.",
    price: "$0",
    period: "forever",
    features: [
      "Delayed market tape",
      "Weekly pulse summary",
      "Limited asset deep-dives",
    ],
  },
  {
    id: "essential",
    name: "Essential",
    tagline: "Live refresh and full desk-style context.",
    price: "$49",
    period: "/mo",
    features: [
      "Live crypto tape & faster refresh",
      "Catalyst & whale previews",
      "Email alerts (coming soon)",
    ],
    highlight: true,
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "STREETScore, full coverage, and priority data.",
    price: "$149",
    period: "/mo",
    features: [
      "Everything in Essential",
      "STREETScore & pro screeners",
      "380+ tickers & export hooks",
    ],
  },
];

export function PricingPageClient() {
  const tier = usePaywallStore((s) => s.subscriptionTier);
  const setTier = usePaywallStore((s) => s.setSubscriptionTier);

  return (
    <div className="space-y-8 text-center">
      <div className="flex items-center justify-center gap-3">
        <span className="h-px w-8 bg-amber-400/60" aria-hidden />
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400">
          Institutional grade
        </p>
        <span className="h-px w-8 bg-amber-400/60" aria-hidden />
      </div>
      <h1 className="text-2xl font-black uppercase leading-tight tracking-tight text-white">
        GOLDH{" "}
        <span className="text-amber-400">Investment Intelligence</span>{" "}
        Platform
      </h1>
      <p className="mx-auto max-w-lg text-sm text-zinc-500">
        Discover opportunities across global equities, crypto markets, macro
        trends, and smart money flows. Select a plan to drive demo paywall
        behavior across the app.
      </p>

      <div
        className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-2"
        role="group"
        aria-label="Quick tier switch"
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

      <div
        className="grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-3"
        role="radiogroup"
        aria-label="Choose subscription plan"
      >
        {PLANS.map((plan) => {
          const selected = tier === plan.id;
          return (
            <button
              key={plan.id}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`${plan.name}, ${plan.price} ${plan.period}`}
              onClick={() => setTier(plan.id)}
              className={cn(
                "group relative flex flex-col rounded-2xl border p-5 text-left transition-all duration-200",
                "hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/55 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                "active:scale-[0.995]",
                selected
                  ? "border-amber-400/70 bg-gradient-to-b from-amber-400/[0.12] to-[#0A0A0A] shadow-[0_0_0_1px_rgba(251,191,36,0.22)]"
                  : "border-zinc-800/90 bg-[#0A0A0A] hover:border-amber-400/40 hover:bg-zinc-900/25",
                plan.highlight &&
                  !selected &&
                  "ring-1 ring-amber-400/15 hover:ring-amber-400/35",
              )}
            >
              {plan.highlight && (
                <span className="mb-3 inline-flex w-fit rounded-full border border-amber-400/35 bg-amber-400/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-400/95">
                  Most popular
                </span>
              )}
              {selected ? (
                <span className="absolute right-4 top-4 rounded-full border border-amber-400/55 bg-amber-400/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-400">
                  Current
                </span>
              ) : null}

              <h2 className="text-lg font-bold text-white">{plan.name}</h2>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                {plan.tagline}
              </p>
              <p className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-black tabular-nums text-white">
                  {plan.price}
                </span>
                <span className="text-sm font-medium text-zinc-500">
                  {plan.period}
                </span>
              </p>

              <ul className="mt-4 space-y-2 border-t border-zinc-800/80 pt-4">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-2 text-xs text-zinc-400 transition-colors group-hover:text-zinc-300"
                  >
                    <Check
                      className="size-4 shrink-0 text-amber-400/80"
                      aria-hidden
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <span
                className={cn(
                  "mt-5 inline-flex w-full items-center justify-center rounded-xl py-2.5 text-xs font-bold uppercase tracking-wider transition-colors duration-200",
                  selected
                    ? "border border-amber-400/50 bg-amber-400/15 text-amber-400"
                    : "border border-zinc-700 bg-zinc-900/50 text-zinc-300 group-hover:border-amber-400/45 group-hover:bg-amber-400/10 group-hover:text-amber-400",
                )}
              >
                {selected ? "Selected · renews in demo" : "Select plan"}
              </span>
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-zinc-800/80 bg-[#0A0A0A] p-6 text-left">
        <h2 className="text-center text-sm font-bold text-white">
          How <span className="text-amber-400">GOLDH</span> works
        </h2>
        <p className="mt-2 text-center text-xs text-zinc-500">
          The Golden Intelligence Loop: from raw market data to automated alpha.
        </p>
        <p className="mt-6 text-center text-xs text-zinc-600">
          Billing is simulated for this demo. Your choice syncs with Profile and
          unlocks premium routes when tier requirements are met.
        </p>
      </div>
    </div>
  );
}
