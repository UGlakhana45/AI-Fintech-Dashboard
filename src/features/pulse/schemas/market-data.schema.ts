import { z } from "zod";

export const assetClassSchema = z.enum(["crypto", "equities", "indices"]);
export type AssetClass = z.infer<typeof assetClassSchema>;

export const marketAssetRowSchema = z.object({
  id: z.string(),
  symbol: z.string(),
  name: z.string(),
  class: assetClassSchema,
  priceUsd: z.number(),
  change24hPct: z.number().nullable(),
  change7dPct: z.number().nullable(),
  trust: z.enum(["high", "medium", "low"]),
});

export type MarketAssetRow = z.infer<typeof marketAssetRowSchema>;

export const weeklyBriefBadgeSchema = z.object({
  symbol: z.string(),
  changePct: z.number(),
});

export const weeklyBriefSchema = z.object({
  headline: z.string(),
  body: z.string(),
  badges: z.array(weeklyBriefBadgeSchema),
  weekLabel: z.string(),
  assetsTrackedLabel: z.string(),
});

export const marketDataSourceSchema = z.enum(["live", "mock"]);

export const marketDataPayloadSchema = z.object({
  weeklyBrief: weeklyBriefSchema,
  assets: z.array(marketAssetRowSchema),
  fetchedAtIso: z.string(),
  dataSource: marketDataSourceSchema.optional(),
});

export type MarketDataPayload = z.infer<typeof marketDataPayloadSchema>;

export type WeeklyBrief = z.infer<typeof weeklyBriefSchema>;
