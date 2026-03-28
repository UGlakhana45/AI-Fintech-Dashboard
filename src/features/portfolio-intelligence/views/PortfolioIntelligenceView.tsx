"use client";

import { createHoldingColumns } from "@/features/portfolio-intelligence/lib/holding-columns";
import type { PortfolioHolding } from "@/features/portfolio-intelligence/schemas/holding.schema";
import { getMockPortfolioHoldings } from "@/lib/portfolio-holdings.mock";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowLeft, Filter, Search, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export function PortfolioIntelligenceView() {
  const [q, setQ] = useState("");
  const payload = useMemo(() => getMockPortfolioHoldings(), []);
  const columns = useMemo(() => createHoldingColumns(), []);

  const filtered: PortfolioHolding[] = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return payload.holdings;
    return payload.holdings.filter(
      (h) =>
        h.symbol.toLowerCase().includes(s) ||
        h.entity.toLowerCase().includes(s),
    );
  }, [payload.holdings, q]);

  const table = useReactTable({
    data: filtered,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-5">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="h-px w-6 bg-amber-400/80" aria-hidden />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
            Alpha pulse
          </span>
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-start">
          <ShieldCheck className="mt-0.5 size-8 shrink-0 text-amber-400 md:size-10" />
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-bold tracking-tight text-white md:text-2xl">
              Portfolio <span className="text-amber-400">Intelligence</span>
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-zinc-500">
              Track institutional alpha signals and historical positioning —
              demo holdings below.
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
            placeholder="Search symbol…"
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

      <section>
        <div className="mb-2 flex items-center gap-2">
          <span className="h-3 w-1 rounded-full bg-amber-400" />
          <h2 className="text-sm font-bold text-white">Equities</h2>
          <span className="rounded-md bg-zinc-800 px-2 py-0.5 text-[10px] font-bold text-zinc-400">
            {filtered.length}
          </span>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-zinc-800/80 bg-[#0A0A0A]">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id} className="border-b border-zinc-800">
                  {hg.headers.map((h) => (
                    <th
                      key={h.id}
                      className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500"
                    >
                      {h.isPlaceholder
                        ? null
                        : flexRender(h.column.columnDef.header, h.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-zinc-800/70 last:border-0"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 align-middle">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
