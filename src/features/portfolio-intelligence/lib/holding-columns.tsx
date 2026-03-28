"use client";

import type { PortfolioHolding } from "@/features/portfolio-intelligence/schemas/holding.schema";
import type { ColumnDef } from "@tanstack/react-table";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function createHoldingColumns(): ColumnDef<PortfolioHolding>[] {
  return [
    {
      id: "symbolEntity",
      header: "Symbol & entity",
      cell: ({ row }) => (
        <div className="flex min-w-[12rem] flex-col gap-0.5">
          <span className="font-bold text-white">{row.original.symbol}</span>
          <span className="text-[11px] uppercase tracking-wide text-zinc-500">
            {row.original.entity}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "dateIn",
      header: "Date in",
      cell: ({ row }) => (
        <span className="tabular-nums text-zinc-400">{row.original.dateIn}</span>
      ),
    },
    {
      accessorKey: "valueUsd",
      header: "Value",
      cell: ({ row }) => (
        <span className="tabular-nums font-medium text-white">
          {usd.format(row.original.valueUsd)}
        </span>
      ),
    },
  ];
}
