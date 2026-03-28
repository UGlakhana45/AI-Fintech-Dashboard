import {
  assetDetailPayloadSchema,
  type AssetDetailPayload,
} from "@/features/asset-detail/schemas/asset-detail.schema";
import { toCoinGeckoCoinId } from "@/lib/coingecko-resolve";

function displayNameAndSymbol(coinId: string): { name: string; symbol: string } {
  const id = toCoinGeckoCoinId(coinId);
  const map: Record<string, { name: string; symbol: string }> = {
    bitcoin: { name: "Bitcoin", symbol: "BTC" },
    ethereum: { name: "Ethereum", symbol: "ETH" },
    solana: { name: "Solana", symbol: "SOL" },
    cardano: { name: "Cardano", symbol: "ADA" },
    aave: { name: "Aave", symbol: "AAVE" },
  };
  return (
    map[id] ?? {
      name: id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      symbol: id.slice(0, 5).toUpperCase(),
    }
  );
}

export function buildMockAssetDetail(
  coinIdRequested: string,
  days: number,
): AssetDetailPayload {
  const id = toCoinGeckoCoinId(coinIdRequested);
  const { name, symbol } = displayNameAndSymbol(id);
  const now = Date.now();
  const msPerDay = 86_400_000;
  const chart: AssetDetailPayload["chart"] = [];
  let price = id === "bitcoin" ? 64_000 : 100;
  for (let i = days; i >= 0; i -= 1) {
    const t = now - i * msPerDay;
    price += Math.sin(i / 3) * (id === "bitcoin" ? 900 : 2) + (i % 7) * 50;
    chart.push({ t, price: Math.max(0.01, price) });
  }
  const last = chart[chart.length - 1]?.price ?? null;

  return assetDetailPayloadSchema.parse({
    id,
    name,
    symbol,
    imageUrl: undefined,
    priceUsd: last,
    marketCapUsd: null,
    volumeUsd: null,
    high24hUsd: null,
    low24hUsd: null,
    change24hPct: -1.2,
    change7dPct: -4.0,
    circulatingSupply: null,
    athUsd: null,
    athChangePct: null,
    chart,
    chartDays: days,
    fetchedAtIso: new Date().toISOString(),
    dataSource: "mock",
  });
}
