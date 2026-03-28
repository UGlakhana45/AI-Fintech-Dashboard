"use client";

import type { CioInsight } from "@/features/cio-insights/schemas/cio-insight.schema";
import { getMockCioInsights } from "@/lib/cio-insights.mock";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Filter,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export function CioInsightsPageClient() {
  const list = useMemo(() => getMockCioInsights().insights, []);
  const [q, setQ] = useState("");
  const [active, setActive] = useState<CioInsight | null>(null);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return list;
    return list.filter(
      (i) =>
        i.title.toLowerCase().includes(s) ||
        i.ticker.toLowerCase().includes(s),
    );
  }, [list, q]);

  return (
    <div className="space-y-5">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="h-px w-6 bg-amber-400/80" aria-hidden />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
            Research office
          </span>
        </div>
        <div className="flex items-start gap-2">
          <Sparkles className="mt-0.5 size-6 shrink-0 text-amber-400" />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              CIO <span className="text-amber-400">Insights</span>
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-zinc-500">
              Strategic research, market alerts, and investment briefings.
            </p>
            <Link
              href="/pulse"
              className="mt-3 inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-[#0A0A0A] px-3 py-2 text-xs font-semibold text-white transition hover:border-amber-400/40 hover:text-amber-400"
            >
              <ArrowLeft className="size-3.5" />
              Returns to hub
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search insights…"
            className="w-full rounded-xl border border-zinc-800 bg-[#0A0A0A] py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-zinc-600 focus:border-amber-400/40 focus:outline-none focus:ring-1 focus:ring-amber-400/30"
          />
        </div>
        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-xl border border-zinc-800 bg-[#0A0A0A] text-zinc-400 hover:border-zinc-600 hover:text-white"
          aria-label="Filter"
        >
          <Filter className="size-5" />
        </button>
      </div>

      <ul className="space-y-3">
        {filtered.map((insight) => (
          <li key={insight.id}>
            <button
              type="button"
              onClick={() => setActive(insight)}
              className="w-full rounded-2xl border border-zinc-800/80 bg-[#0A0A0A] p-4 text-left transition hover:border-amber-400/30"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-amber-400/35 bg-amber-400/10 text-amber-400">
                  !
                </div>
                <span className="text-xs text-zinc-500">{insight.dateLabel}</span>
              </div>
              <h2 className="mt-3 text-sm font-bold uppercase leading-snug text-white">
                {insight.title}
              </h2>
              <p className="mt-2 text-sm italic text-zinc-500">
                {insight.snippet}
              </p>
              <span className="mt-3 inline-flex rounded-full border border-zinc-800 bg-black/50 px-2.5 py-1 text-[11px] font-semibold text-amber-400">
                {insight.ticker}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {active ? (
          <motion.div
            key="sheet"
            className="fixed inset-0 z-[70] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="presentation"
            onClick={() => setActive(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="insight-title"
              className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-zinc-800 bg-[#0A0A0A] sm:rounded-3xl"
              initial={{ y: 40, opacity: 0.9 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-800 bg-[#0A0A0A]/95 px-4 py-3 backdrop-blur">
                <div className="flex items-center gap-2 text-amber-400">
                  <Sparkles className="size-5" />
                  <span className="text-sm font-bold">Insight details</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white"
                  aria-label="Close"
                >
                  <X className="size-5" />
                </button>
              </div>
              <div className="space-y-4 px-4 py-4">
                <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  <span className="inline-flex items-center gap-1 text-amber-500/90">
                    <Calendar className="size-3.5" />
                    March 18, 2026
                  </span>
                  <span className="text-zinc-700">|</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5" />
                    {active.readMinutes} min read
                  </span>
                </div>
                <h3
                  id="insight-title"
                  className="text-lg font-bold leading-snug text-white"
                >
                  {active.title}
                </h3>
                <span className="inline-flex rounded-full border border-zinc-800 bg-black/50 px-2.5 py-1 text-[11px] font-semibold text-amber-400">
                  {active.ticker}
                </span>
                <hr className="border-zinc-800" />
                <div className="space-y-4 text-sm leading-relaxed">
                  {active.body.map((block, i) =>
                    block.type === "h" ? (
                      <p
                        key={i}
                        className="font-semibold text-amber-400"
                      >
                        {block.text}
                      </p>
                    ) : (
                      <p key={i} className="text-zinc-300">
                        {block.text}
                      </p>
                    ),
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
