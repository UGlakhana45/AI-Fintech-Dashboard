import { useQuery } from "@tanstack/react-query";
import {
  assetDetailPayloadSchema,
  type AssetDetailPayload,
} from "@/features/asset-detail/schemas/asset-detail.schema";
import { toCoinGeckoCoinId } from "@/lib/coingecko-resolve";

export const assetDetailQueryKey = (coinId: string, days: number) =>
  ["asset-detail", coinId, days] as const;

async function fetchAssetDetail(
  coinId: string,
  days: number,
): Promise<AssetDetailPayload> {
  const id = encodeURIComponent(toCoinGeckoCoinId(coinId));
  const res = await fetch(`/api/asset/${id}?days=${days}`, {
    credentials: "same-origin",
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Asset API ${res.status}`);
  }
  const raw: unknown = await res.json();
  return assetDetailPayloadSchema.parse(raw);
}

export interface UseAssetDetailResult {
  data: AssetDetailPayload | undefined;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  isFetching: boolean;
}

export function useAssetDetail(
  coinId: string,
  days: number,
): UseAssetDetailResult {
  const { data, isPending, isError, error, isFetching } = useQuery({
    queryKey: assetDetailQueryKey(coinId, days),
    queryFn: () => fetchAssetDetail(coinId, days),
    staleTime: 60_000,
    enabled: Boolean(coinId),
  });

  return {
    data,
    isPending,
    isError,
    error: error instanceof Error ? error : error ? new Error(String(error)) : null,
    isFetching,
  };
}
