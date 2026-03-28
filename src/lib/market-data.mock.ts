import {
  marketDataPayloadSchema,
  type MarketDataPayload,
} from "@/features/pulse/schemas/market-data.schema";

const MOCK_LATENCY_MS = 350;

export function buildMockMarketPayload(): MarketDataPayload {
  return marketDataPayloadSchema.parse({
    dataSource: "mock",
    fetchedAtIso: new Date().toISOString(),
    weeklyBrief: {
      headline:
        "Equity markets moving: COIN leads down 20.59% in 24h.",
      body:
        "Treasury yields held firm while broad equity beta softened. Coinbase, SoundHound, and large-cap tech dragged sentiment as the VIX ticked higher — institutions are reallocating into defensive quality factors while crypto beta mean-reverts.",
      badges: [
        { symbol: "COIN", changePct: -20.59 },
        { symbol: "SOUN", changePct: -14.18 },
        { symbol: "GOOGL", changePct: -10.68 },
      ],
      weekLabel: "Week of Mar 23",
      assetsTrackedLabel: "88 across 7 classes",
    },
    assets: [
      {
        id: "aave",
        symbol: "AAVE",
        name: "AAVE",
        class: "crypto",
        priceUsd: 96.69,
        change24hPct: -2.1,
        change7dPct: -10.75,
        trust: "high",
      },
      {
        id: "ada",
        symbol: "ADA",
        name: "CARDANO",
        class: "crypto",
        priceUsd: 0.2477,
        change24hPct: -0.9,
        change7dPct: -5.8,
        trust: "high",
      },
      {
        id: "btc",
        symbol: "BTC",
        name: "BITCOIN",
        class: "crypto",
        priceUsd: 66467,
        change24hPct: -1.2,
        change7dPct: -4.2,
        trust: "high",
      },
      {
        id: "aapl",
        symbol: "AAPL",
        name: "APPLE INC.",
        class: "equities",
        priceUsd: 248.8,
        change24hPct: -0.5,
        change7dPct: -8.11,
        trust: "high",
      },
      {
        id: "amd",
        symbol: "AMD",
        name: "ADVANCED MICRO DEVICES",
        class: "equities",
        priceUsd: 201.99,
        change24hPct: 0.2,
        change7dPct: -1.6,
        trust: "high",
      },
      {
        id: "coin",
        symbol: "COIN",
        name: "COINBASE GLOBAL",
        class: "equities",
        priceUsd: 212.4,
        change24hPct: -20.59,
        change7dPct: -18.2,
        trust: "medium",
      },
      {
        id: "dax",
        symbol: "DAX",
        name: "DAX",
        class: "indices",
        priceUsd: 22388.75,
        change24hPct: -0.2,
        change7dPct: -1.05,
        trust: "high",
      },
      {
        id: "dji",
        symbol: "DJI",
        name: "DOW JONES",
        class: "indices",
        priceUsd: 45166.64,
        change24hPct: -0.4,
        change7dPct: -1.9,
        trust: "high",
      },
    ],
  });
}

export async function fetchMarketDataMock(): Promise<MarketDataPayload> {
  await new Promise((r) => setTimeout(r, MOCK_LATENCY_MS));
  return buildMockMarketPayload();
}

export function getMockEquitiesAndIndices(): MarketDataPayload["assets"] {
  return buildMockMarketPayload().assets.filter((a) => a.class !== "crypto");
}
