"use client";

import type { MarketAssetRow } from "@/features/pulse/schemas/market-data.schema";
import { assetDetailHref } from "@/lib/coingecko-resolve";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

function formatPct(n: number | null): string {
  if (n === null) return "—";
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toFixed(2)}%`;
}

function pctClass(n: number | null): string {
  if (n === null) return "text-zinc-500";
  if (n > 0) return "text-emerald-500";
  if (n < 0) return "text-red-500";
  return "text-zinc-400";
}

function TrustBadge({ trust }: { trust: MarketAssetRow["trust"] }) {
  const label =
    trust === "high"
      ? "High Confidence"
      : trust === "medium"
        ? "Medium"
        : "Low";
  const cls =
    trust === "high"
      ? "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30"
      : trust === "medium"
        ? "bg-amber-500/15 text-amber-300 ring-amber-500/35"
        : "bg-zinc-800 text-zinc-400 ring-zinc-700";
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ${cls}`}
    >
      {label}
    </span>
  );
}

export interface AssetColumnOptions {
  linkCrypto?: boolean;
}

export function createAssetColumns(
  options: AssetColumnOptions = {},
): ColumnDef<MarketAssetRow>[] {
  const { linkCrypto = false } = options;

  return [
    {
      id: "asset",
      header: "Asset",
      accessorFn: (row) => `${row.symbol} ${row.name}`,
      cell: ({ row }) => {
        const r = row.original;
        const inner = (
          <div className="flex min-w-[140px] flex-col gap-0.5">
            <span className="font-semibold tracking-tight text-white group-hover:text-amber-300">
              {r.symbol}
            </span>
            <span className="max-w-[10rem] truncate text-[11px] uppercase tracking-wide text-zinc-500">
              {r.name}
            </span>
          </div>
        );
        if (linkCrypto && r.class === "crypto") {
          return (
            <Link
              href={assetDetailHref(r.id)}
              className="group block rounded-lg outline-none ring-amber-400/0 focus-visible:ring-2"
            >
              {inner}
            </Link>
          );
        }
        return inner;
      },
    },
    {
      accessorKey: "priceUsd",
      header: "Price",
      cell: ({ row }) => (
        <span className="tabular-nums text-zinc-200">
          {usd.format(row.original.priceUsd)}
        </span>
      ),
    },
    {
      accessorKey: "change24hPct",
      header: "24H",
      cell: ({ row }) => (
        <span className={`tabular-nums text-sm font-medium ${pctClass(row.original.change24hPct)}`}>
          {formatPct(row.original.change24hPct)}
        </span>
      ),
    },
    {
      accessorKey: "change7dPct",
      header: "7D",
      cell: ({ row }) => (
        <span className={`tabular-nums text-sm font-medium ${pctClass(row.original.change7dPct)}`}>
          {formatPct(row.original.change7dPct)}
        </span>
      ),
    },
    {
      accessorKey: "trust",
      header: "Trust",
      cell: ({ row }) => <TrustBadge trust={row.original.trust} />,
    },
  ];
}
