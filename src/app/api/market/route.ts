import {
  marketDataPayloadSchema,
  type MarketAssetRow,
  type MarketDataPayload,
} from "@/features/pulse/schemas/market-data.schema";
import { buildMockMarketPayload, getMockEquitiesAndIndices } from "@/lib/market-data.mock";
import { NextResponse } from "next/server";
import { z } from "zod";

export const revalidate = 30;

const coingeckoRowSchema = z.object({
  id: z.string(),
  symbol: z.string(),
  name: z.string(),
  current_price: z.number().nullable(),
  price_change_percentage_24h: z.number().nullable(),
  price_change_percentage_7d_in_currency: z.number().nullable().optional(),
});

const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h,7d";

function mapCoingeckoRows(
  rows: z.infer<typeof coingeckoRowSchema>[],
): MarketAssetRow[] {
  return rows.map((r, i) => ({
    id: r.id,
    symbol: r.symbol.toUpperCase(),
    name: r.name.toUpperCase(),
    class: "crypto" as const,
    priceUsd: r.current_price ?? 0,
    change24hPct: r.price_change_percentage_24h,
    change7dPct: r.price_change_percentage_7d_in_currency ?? null,
    trust: i < 6 ? ("high" as const) : ("medium" as const),
  }));
}

function buildBriefFromAssets(assets: MarketAssetRow[]): MarketDataPayload["weeklyBrief"] {
  const crypto = assets.filter((a) => a.class === "crypto");
  const by24 = [...crypto].sort(
    (a, b) => (a.change24hPct ?? 0) - (b.change24hPct ?? 0),
  );
  const worst = by24[0];
  const headline = worst
    ? `Crypto tape: ${worst.symbol} leads ${(worst.change24hPct ?? 0).toFixed(2)}% in 24h (CoinGecko).`
    : "Live crypto markets updating from CoinGecko.";

  const badges = by24.slice(0, 3).map((a) => ({
    symbol: a.symbol,
    changePct: a.change24hPct ?? 0,
  }));

  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  const weekLabel = `Week of ${weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;

  return {
    headline,
    body:
      "Tape aggregates global spot crypto from CoinGecko (server-side). Equities and indices remain illustrative until wired to a licensed equities feed. Use this view to demonstrate cached server state (30s) with graceful mock fallback.",
    badges,
    weekLabel,
    assetsTrackedLabel: `${assets.length} rows (crypto live + demo equities/indices)`,
  };
}

async function buildLivePayload(): Promise<MarketDataPayload> {
  const res = await fetch(COINGECKO_URL, {
    headers: { Accept: "application/json" },
    next: { revalidate: 30 },
  });

  if (!res.ok) {
    throw new Error(`CoinGecko HTTP ${res.status}`);
  }

  const raw: unknown = await res.json();
  const parsed = z.array(coingeckoRowSchema).safeParse(raw);
  if (!parsed.success) {
    throw new Error("CoinGecko shape mismatch");
  }

  const cryptoAssets = mapCoingeckoRows(parsed.data);
  const other = getMockEquitiesAndIndices();
  const assets = [...cryptoAssets, ...other];
  const payload: MarketDataPayload = {
    dataSource: "live",
    fetchedAtIso: new Date().toISOString(),
    weeklyBrief: buildBriefFromAssets(assets),
    assets,
  };
  return marketDataPayloadSchema.parse(payload);
}

export async function GET() {
  try {
    const payload = await buildLivePayload();
    return NextResponse.json(payload);
  } catch {
    const fallback = buildMockMarketPayload();
    return NextResponse.json(fallback);
  }
}
