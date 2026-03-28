import { useQuery } from "@tanstack/react-query";
import type { MarketDataPayload } from "@/features/pulse/schemas/market-data.schema";
import { fetchMarketData } from "@/lib/market-data.client";

export const MARKET_DATA_QUERY_KEY = ["market-data", "v1"] as const;

export interface UseMarketDataResult {
  data: MarketDataPayload | undefined;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  isFetching: boolean;
  dataUpdatedAt: number;
}

export function useMarketData(): UseMarketDataResult {
  const { data, isPending, isError, error, isFetching, dataUpdatedAt } =
    useQuery({
      queryKey: MARKET_DATA_QUERY_KEY,
      queryFn: fetchMarketData,
      staleTime: 30_000,
    });

  return {
    data,
    isPending,
    isError,
    error: error instanceof Error ? error : error ? new Error(String(error)) : null,
    isFetching,
    dataUpdatedAt,
  };
}
