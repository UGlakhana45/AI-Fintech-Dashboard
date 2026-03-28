import { z } from "zod";

export const assetChartPointSchema = z.object({
  t: z.number(),
  price: z.number(),
});

export const assetDetailPayloadSchema = z.object({
  id: z.string(),
  name: z.string(),
  symbol: z.string(),
  imageUrl: z.string().optional(),
  priceUsd: z.number().nullable(),
  marketCapUsd: z.number().nullable(),
  volumeUsd: z.number().nullable(),
  high24hUsd: z.number().nullable(),
  low24hUsd: z.number().nullable(),
  change24hPct: z.number().nullable(),
  change7dPct: z.number().nullable(),
  circulatingSupply: z.number().nullable(),
  athUsd: z.number().nullable(),
  athChangePct: z.number().nullable(),
  chart: z.array(assetChartPointSchema),
  chartDays: z.number().int(),
  fetchedAtIso: z.string(),
  dataSource: z.enum(["live", "mock"]),
});

export type AssetDetailPayload = z.infer<typeof assetDetailPayloadSchema>;
