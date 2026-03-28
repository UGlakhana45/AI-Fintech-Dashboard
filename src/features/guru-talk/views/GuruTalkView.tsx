"use client";

import { BookOpen, Filter, Search } from "lucide-react";
import { useMemo, useState } from "react";

export function GuruTalkView() {
  const [q, setQ] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const hasQuery = useMemo(() => q.trim().length > 0, [q]);

  return (
    <div className="space-y-5">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="h-px w-6 bg-amber-400/80" aria-hidden />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
            Alpha insights
          </span>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <BookOpen className="mt-0.5 size-8 shrink-0 text-amber-400 sm:size-10" />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              Guru <span className="text-amber-400">Talk</span>
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-zinc-500">
              Tactical trade ideas and market calls from institutional desks. The
              live feed will appear here once the insight API is connected.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search…"
            className="w-full rounded-xl border border-zinc-800 bg-[#0A0A0A] py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-zinc-600 focus:border-amber-400/40 focus:outline-none focus:ring-1 focus:ring-amber-400/30"
          />
        </div>
        <button
          type="button"
          onClick={() => setFilterOpen((v) => !v)}
          className={`flex size-11 shrink-0 items-center justify-center rounded-xl border transition-colors ${
            filterOpen
              ? "border-amber-400/50 bg-amber-400/10 text-amber-400"
              : "border-zinc-800 bg-[#0A0A0A] text-zinc-400 hover:border-zinc-600 hover:text-white"
          }`}
          aria-pressed={filterOpen}
          aria-label="Filters"
        >
          <Filter className="size-5" />
        </button>
      </div>

      {filterOpen ? (
        <p className="text-xs text-zinc-500">
          Filters adjust the view locally; server-side filtering ships with the
          insight API.
        </p>
      ) : null}

      <div
        className={`flex min-h-[200px] items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-[#0A0A0A] px-4 py-12 text-center text-sm ${
          hasQuery ? "text-amber-200/80" : "text-zinc-500"
        }`}
      >
        {hasQuery
          ? `No insights found matching “${q.trim()}”.`
          : "No insights found matching your criteria."}
      </div>
    </div>
  );
}
