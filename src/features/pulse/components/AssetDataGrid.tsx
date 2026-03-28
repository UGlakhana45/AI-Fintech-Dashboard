"use client";

import type { AssetClass } from "@/features/pulse/schemas/market-data.schema";
import { createAssetColumns } from "@/features/pulse/lib/asset-columns";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

import type { MarketAssetRow } from "@/features/pulse/schemas/market-data.schema";

const TABS: { id: AssetClass; label: string }[] = [
  { id: "crypto", label: "Crypto" },
  { id: "equities", label: "Equities" },
  { id: "indices", label: "Indices" },
];

export interface AssetDataGridProps {
  assets: MarketAssetRow[];
  isLoading?: boolean;
  linkCryptoRows?: boolean;
}

export function AssetDataGrid({
  assets,
  isLoading,
  linkCryptoRows = true,
}: AssetDataGridProps) {
  const [tab, setTab] = useState<AssetClass>("crypto");
  const columns = useMemo(
    () => createAssetColumns({ linkCrypto: linkCryptoRows }),
    [linkCryptoRows],
  );

  const filtered = useMemo(
    () => assets.filter((a) => a.class === tab),
    [assets, tab],
  );

  const table = useReactTable({
    data: filtered,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const counts = useMemo(() => {
    return TABS.reduce(
      (acc, t) => {
        acc[t.id] = assets.filter((a) => a.class === t.id).length;
        return acc;
      },
      {} as Record<AssetClass, number>,
    );
  }, [assets]);

  return (
    <div className="space-y-3">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "shrink-0 rounded-xl border px-4 py-2 text-xs font-semibold transition-colors",
              tab === t.id
                ? "border-amber-400/50 bg-amber-400/10 text-amber-400"
                : "border-zinc-800 bg-[#0A0A0A] text-zinc-400 hover:border-zinc-700 hover:text-zinc-200",
            )}
          >
            {t.label}{" "}
            <span className="ml-1 tabular-nums text-[10px] text-zinc-500">
              {counts[t.id]}
            </span>
          </button>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#0A0A0A]">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
            <span className="text-xs font-medium text-zinc-400">
              Loading market data…
            </span>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead className="sticky top-0 z-[1] bg-[#0A0A0A]">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id} className="border-b border-zinc-800">
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-10 text-center text-sm text-zinc-500"
                  >
                    No assets in this category.
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-zinc-800/80 last:border-0"
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
