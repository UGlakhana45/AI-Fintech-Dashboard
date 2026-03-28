import {
  portfolioHoldingsPayloadSchema,
  type PortfolioHoldingsPayload,
} from "@/features/portfolio-intelligence/schemas/holding.schema";

export function getMockPortfolioHoldings(): PortfolioHoldingsPayload {
  return portfolioHoldingsPayloadSchema.parse({
    holdings: [
      {
        id: "1",
        symbol: "CME",
        entity: "CME GROUP",
        dateIn: "2026-02-13",
        valueUsd: 30_400,
      },
      {
        id: "2",
        symbol: "COIN",
        entity: "COINBASE GLOBAL",
        dateIn: "2026-03-16",
        valueUsd: 19_200,
      },
      {
        id: "3",
        symbol: "CRWV",
        entity: "CORE WEAVE",
        dateIn: "2026-03-01",
        valueUsd: 10_800,
      },
      {
        id: "4",
        symbol: "NVDA",
        entity: "NVIDIA CORP",
        dateIn: "2026-01-22",
        valueUsd: 48_900,
      },
      {
        id: "5",
        symbol: "AAPL",
        entity: "APPLE INC",
        dateIn: "2026-02-28",
        valueUsd: 22_100,
      },
    ],
  });
}
