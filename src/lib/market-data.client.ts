import {
  marketDataPayloadSchema,
  type MarketDataPayload,
} from "@/features/pulse/schemas/market-data.schema";
import { fetchMarketDataMock } from "@/lib/market-data.mock";

export async function fetchMarketData(): Promise<MarketDataPayload> {
  try {
    const res = await fetch("/api/market", {
      credentials: "same-origin",
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Market API ${res.status}`);
    }
    const raw: unknown = await res.json();
    return marketDataPayloadSchema.parse(raw);
  } catch {
    return fetchMarketDataMock();
  }
}
