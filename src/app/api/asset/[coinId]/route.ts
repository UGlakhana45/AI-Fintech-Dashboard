import {
  assetDetailPayloadSchema,
  type AssetDetailPayload,
} from "@/features/asset-detail/schemas/asset-detail.schema";
import { buildMockAssetDetail } from "@/lib/asset-detail.mock";
import { toCoinGeckoCoinId } from "@/lib/coingecko-resolve";
import { NextResponse } from "next/server";
import { z } from "zod";

export const revalidate = 60;

const geckoCoinSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    symbol: z.string(),
    image: z.object({ small: z.string().optional() }).optional(),
    market_data: z
      .object({
        current_price: z.record(z.string(), z.number().nullable()).optional(),
        market_cap: z.record(z.string(), z.number().nullable()).optional(),
        total_volume: z.record(z.string(), z.number().nullable()).optional(),
        high_24h: z.record(z.string(), z.number().nullable()).optional(),
        low_24h: z.record(z.string(), z.number().nullable()).optional(),
        price_change_percentage_24h: z.number().nullable().optional(),
        price_change_percentage_7d: z.number().nullable().optional(),
        price_change_percentage_7d_in_currency: z
          .record(z.string(), z.number().nullable())
          .optional(),
        circulating_supply: z.number().nullable().optional(),
        ath: z.record(z.string(), z.number().nullable()).optional(),
        ath_change_percentage: z.record(z.string(), z.number().nullable()).optional(),
      })
      .optional(),
  })
  .passthrough();

const marketChartSchema = z.object({
  prices: z.array(z.tuple([z.number(), z.number()])),
});

function pickUsd(
  rec: Record<string, number | null> | undefined,
): number | null {
  if (!rec) return null;
  const v = rec.usd;
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

function pickAthChange(rec: Record<string, number | null> | undefined): number | null {
  if (!rec) return null;
  const v = rec.usd;
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

async function buildLiveDetail(
  coinId: string,
  days: number,
): Promise<AssetDetailPayload> {
  const base = `https://api.coingecko.com/api/v3/coins/${coinId}`;
  const qs =
    "localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false";

  const [coinRes, chartRes] = await Promise.all([
    fetch(`${base}?${qs}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    }),
    fetch(
      `${base}/market_chart?vs_currency=usd&days=${days}`,
      {
        headers: { Accept: "application/json" },
        next: { revalidate: 60 },
      },
    ),
  ]);

  if (!coinRes.ok || !chartRes.ok) {
    throw new Error(`CoinGecko detail HTTP ${coinRes.status}/${chartRes.status}`);
  }

  const coinRaw: unknown = await coinRes.json();
  const chartRaw: unknown = await chartRes.json();

  const coinParsed = geckoCoinSchema.safeParse(coinRaw);
  const chartParsed = marketChartSchema.safeParse(chartRaw);

  if (!coinParsed.success || !chartParsed.success) {
    throw new Error("CoinGecko detail parse failed");
  }

  const md = coinParsed.data.market_data;
  const change7dVal =
    typeof md?.price_change_percentage_7d === "number"
      ? md.price_change_percentage_7d
      : pickUsd(md?.price_change_percentage_7d_in_currency);

  const chart = chartParsed.data.prices.map(([t, price]) => ({ t, price }));

  const payload: AssetDetailPayload = {
    id: coinParsed.data.id,
    name: coinParsed.data.name,
    symbol: coinParsed.data.symbol.toUpperCase(),
    imageUrl: coinParsed.data.image?.small,
    priceUsd: pickUsd(md?.current_price),
    marketCapUsd: pickUsd(md?.market_cap),
    volumeUsd: pickUsd(md?.total_volume),
    high24hUsd: pickUsd(md?.high_24h),
    low24hUsd: pickUsd(md?.low_24h),
    change24hPct: md?.price_change_percentage_24h ?? null,
    change7dPct: change7dVal,
    circulatingSupply: md?.circulating_supply ?? null,
    athUsd: pickUsd(md?.ath),
    athChangePct: pickAthChange(md?.ath_change_percentage),
    chart,
    chartDays: days,
    fetchedAtIso: new Date().toISOString(),
    dataSource: "live",
  };

  return assetDetailPayloadSchema.parse(payload);
}

export async function GET(
  request: Request,
  segment: { params: Promise<{ coinId: string }> },
) {
  const { coinId: raw } = await segment.params;
  const coinId = toCoinGeckoCoinId(decodeURIComponent(raw));

  const { searchParams } = new URL(request.url);
  const daysParam = Number(searchParams.get("days"));
  const days = Number.isFinite(daysParam)
    ? Math.min(90, Math.max(1, Math.floor(daysParam)))
    : 30;

  try {
    const payload = await buildLiveDetail(coinId, days);
    return NextResponse.json(payload);
  } catch {
    const fallback = buildMockAssetDetail(coinId, days);
    return NextResponse.json(fallback);
  }
}
