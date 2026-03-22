"use client";

import type { PortfolioBalancePoint } from "@/lib/api";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface PortfolioChartProps {
  data: PortfolioBalancePoint[];
}

const CHART_GREEN = "#34d399";

function formatAxisDate(isoDate: string): string {
  const d = new Date(isoDate + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatTooltipDate(isoDate: string): string {
  const d = new Date(isoDate + "T12:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function PortfolioChart({ data }: PortfolioChartProps) {
  return (
    <div className="h-[320px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="portfolioAreaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CHART_GREEN} stopOpacity={0.45} />
              <stop offset="100%" stopColor={CHART_GREEN} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgb(51 65 85 / 0.5)"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tickFormatter={formatAxisDate}
            tick={{ fill: "rgb(148 163 184)", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            minTickGap={24}
          />
          <YAxis
            tickFormatter={(v: number) => usd.format(v)}
            tick={{ fill: "rgb(148 163 184)", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={72}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgb(15 23 42)",
              border: "1px solid rgb(51 65 85)",
              borderRadius: "8px",
              color: "rgb(241 245 249)",
            }}
            labelFormatter={(label) =>
              typeof label === "string" ? formatTooltipDate(label) : ""
            }
            formatter={(value) => {
              const n = typeof value === "number" ? value : Number(value);
              const safe = Number.isFinite(n) ? n : 0;
              return [usd.format(safe), "Balance"];
            }}
          />
          <Area
            type="monotone"
            dataKey="balance"
            stroke={CHART_GREEN}
            strokeWidth={2}
            fill="url(#portfolioAreaFill)"
            dot={false}
            activeDot={{ r: 4, fill: CHART_GREEN, stroke: "rgb(15 23 42)" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
