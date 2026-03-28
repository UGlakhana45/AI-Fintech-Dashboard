"use client";

import { Sparkles } from "lucide-react";
import type { WeeklyBrief } from "@/features/pulse/schemas/market-data.schema";

export interface WeeklyBriefCardProps {
  brief: WeeklyBrief;
}

export function WeeklyBriefCard({ brief }: WeeklyBriefCardProps) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#0A0A0A] p-5 shadow-lg shadow-black/40">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-amber-400">
          <Sparkles className="size-4 shrink-0" aria-hidden />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
            Weekly Brief
          </span>
        </div>
        <span className="rounded-md border border-zinc-700/80 bg-black/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
          Recap
        </span>
      </div>
      <h2 className="text-lg font-semibold leading-snug tracking-tight text-white">
        {brief.headline}
      </h2>
      <MoversRow badges={brief.badges} />
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">{brief.body}</p>
      <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-zinc-800/80 pt-4 text-[10px] uppercase tracking-wide text-zinc-500 sm:grid-cols-4">
        <div>
          <dt className="font-semibold text-zinc-600">Best of week</dt>
          <dd className="mt-1 text-zinc-400">—</dd>
        </div>
        <div>
          <dt className="font-semibold text-zinc-600">Worst of week</dt>
          <dd className="mt-1 text-zinc-400">—</dd>
        </div>
        <div>
          <dt className="font-semibold text-zinc-600">Week ending</dt>
          <dd className="mt-1 font-medium text-amber-400/90">{brief.weekLabel}</dd>
        </div>
        <div>
          <dt className="font-semibold text-zinc-600">Assets tracked</dt>
          <dd className="mt-1 text-zinc-300">{brief.assetsTrackedLabel}</dd>
        </div>
      </dl>
    </article>
  );
}

function MoversRow({
  badges,
}: {
  badges: WeeklyBrief["badges"];
}) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {badges.map((b) => (
        <span
          key={b.symbol}
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-black/50 px-2.5 py-1 text-xs font-semibold text-white"
        >
          {b.symbol}
          <span
            className={
              b.changePct < 0 ? "text-red-500" : "text-emerald-500"
            }
          >
            {b.changePct > 0 ? "+" : ""}
            {b.changePct.toFixed(2)}%
          </span>
        </span>
      ))}
    </div>
  );
}
