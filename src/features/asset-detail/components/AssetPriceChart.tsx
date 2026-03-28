"use client";

import type { AssetDetailPayload } from "@/features/asset-detail/schemas/asset-detail.schema";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface AssetPriceChartProps {
  series: AssetDetailPayload["chart"];
}

const AREA = "#fbbf24";

export function AssetPriceChart({ series }: AssetPriceChartProps) {
  const data = series.map((p) => ({
    t: p.t,
    price: p.price,
  }));

  return (
    <div
      className="h-[340px] w-full min-h-[340px] min-w-0 shrink-0"
      style={{ minHeight: 340 }}
    >
      <ResponsiveContainer width="100%" height={340}>
        <AreaChart
          data={data}
          margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="assetAreaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={AREA} stopOpacity={0.35} />
              <stop offset="100%" stopColor={AREA} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="rgb(39 39 42 / 0.6)"
            vertical={false}
          />
          <XAxis
            dataKey="t"
            tickFormatter={(t: number) =>
              new Date(t).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            }
            tick={{ fill: "rgb(161 161 170)", fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            minTickGap={28}
          />
          <YAxis
            tickFormatter={(v: number) =>
              v >= 1_000
                ? `$${(v / 1_000).toFixed(1)}k`
                : `$${v.toFixed(v < 1 ? 4 : 0)}`
            }
            tick={{ fill: "rgb(161 161 170)", fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            width={56}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0a0a0a",
              border: "1px solid rgb(39 39 42)",
              borderRadius: 12,
              color: "#fafafa",
            }}
            labelFormatter={(t) =>
              typeof t === "number"
                ? new Date(t).toLocaleString("en-US", {
                    dateStyle: "medium",
                  })
                : ""
            }
            formatter={(value) => {
              const n =
                typeof value === "number"
                  ? value
                  : typeof value === "string"
                    ? Number(value)
                    : Number(value ?? 0);
              const safe = Number.isFinite(n) ? n : 0;
              return [
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: safe < 1 ? 6 : 2,
                }).format(safe),
                "Price",
              ];
            }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={AREA}
            strokeWidth={2}
            fill="url(#assetAreaFill)"
            dot={false}
            activeDot={{ r: 4, fill: AREA, stroke: "#000" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
